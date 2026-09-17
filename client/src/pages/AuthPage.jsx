import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';
import { loginUser, registerUser, clearError } from '../store/auth/authSlice';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import toast from 'react-hot-toast';
import Logo from '../components/common/Logo';


const AuthPage = ({ mode: initialMode = 'login' }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [mode, setMode] = useState(initialMode);
  const isLogin = mode === 'login';

  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [errorPopup, setErrorPopup] = useState(null); // null | string

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setForm({ name: '', email: '', password: '' });
    dispatch(clearError());
    setErrorPopup(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const action = isLogin
      ? loginUser({ email: form.email, password: form.password })
      : registerUser(form);

    const result = await dispatch(action);

    if (result.meta.requestStatus === 'fulfilled') {
      toast.success(isLogin ? 'Welcome back!' : 'Account created successfully!');
      navigate('/chat');
    } else {
      setErrorPopup(result.payload || (isLogin ? 'Incorrect username or password' : 'Registration failed'));
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 select-none">

      {/* Error Popup */}
      <AnimatePresence>
        {errorPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setErrorPopup(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-md px-4"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.97 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-sm rounded-2xl border border-white/10 bg-[#0a0b10]/95 backdrop-blur-xl p-7 shadow-2xl overflow-hidden"
            >
              <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-3xl" />

              <button
                onClick={() => setErrorPopup(null)}
                className="absolute right-4 top-4 text-white/40 hover:text-white transition-colors z-10"
              >
                <X size={18} />
              </button>

              <div className="relative z-10 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-pink-500/20 border border-white/10 flex items-center justify-center">
                  <AlertCircle className="text-indigo-300" size={26} />
                </div>

                <h3 className="text-white font-bold text-lg tracking-tight">
                  {isLogin ? 'Login Failed' : "Couldn't Create Account"}
                </h3>

                <p className="text-white/50 text-sm leading-relaxed font-light max-w-xs">
                  {errorPopup}
                </p>

                <button
                  onClick={() => setErrorPopup(null)}
                  className="mt-3 w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/20 transition-all duration-300"
                >
                  Try Again
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">

        {/* Logo */}
        <div className="text-center mb-8">
          <Logo size={64} className="inline-block transform hover:rotate-12 transition-transform duration-300 cursor-pointer" />
          <AnimatePresence mode="wait">
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-3xl font-extrabold text-white mt-4 tracking-tight">
                {isLogin ? 'Welcome back' : 'Create account'}
              </h1>
              <p className="text-white/60 mt-1 font-light">
                {isLogin ? 'Sign in to Prajñā AI' : 'Join Prajñā AI today'}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mode Toggle Pill */}
        <div className="relative flex mb-6 bg-white/[0.03] border border-white/5 rounded-xl p-1 backdrop-blur-md">
          <motion.div
            className="absolute inset-y-1 w-1/2 rounded-lg bg-indigo-600 shadow-lg shadow-indigo-600/30"
            animate={{ x: isLogin ? 0 : '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
          <button
            type="button"
            onClick={() => switchMode('login')}
            className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              isLogin ? 'text-white' : 'text-white/50 hover:text-white/80'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => switchMode('register')}
            className={`relative z-10 flex-1 py-2 text-sm font-medium rounded-lg transition-colors ${
              !isLogin ? 'text-white' : 'text-white/50 hover:text-white/80'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-white/[0.02] border border-white/5 p-8 rounded-2xl space-y-5 backdrop-blur-md shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.form
              key={mode}
              onSubmit={handleSubmit}
              className="space-y-4"
              initial={{ opacity: 0, x: isLogin ? -12 : 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 12 : -12 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {!isLogin && (
                <Input
                  label="Full Name"
                  type="text"
                  name="name"
                  placeholder="your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder-white/20 focus:border-indigo-500/50"
                />
              )}

              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
                className="bg-white/5 border-white/10 text-white placeholder-white/20 focus:border-indigo-500/50"
              />

              <Input
                label="Password"
                type="password"
                name="password"
                placeholder={isLogin ? '••••••••' : 'Min 6 characters'}
                value={form.password}
                onChange={handleChange}
                required
                className="bg-white/5 border-white/10 text-white placeholder-white/20 focus:border-indigo-500/50"
              />

              <Button
                type="submit"
                loading={loading}
                className="w-full py-3 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-300"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
            </motion.form>
          </AnimatePresence>

          <p className="text-center text-white/40 text-sm">
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type="button"
              onClick={() => switchMode(isLogin ? 'register' : 'login')}
              className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;