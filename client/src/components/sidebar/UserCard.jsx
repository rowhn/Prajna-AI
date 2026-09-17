import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoLogOutOutline } from 'react-icons/io5';
import Avatar from '../common/Avatar';
import { logoutUser } from '../../store/auth/authSlice';
import toast from 'react-hot-toast';

const UserCard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    toast.success('Logged out successfully');
    navigate('/');
  };

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-4 backdrop-blur-md space-y-3">

      {/* User Details */}
      <div className="flex items-center gap-3">
        <div className="relative shrink-0">
          <div className="rounded-full ring-2 ring-indigo-500/30 ring-offset-2 ring-offset-[#0a0b10]">
            <Avatar name={user?.name} size="sm" />
          </div>
          {/* Online status dot */}
          <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#0a0b10]" />
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">
            {user?.name}
          </p>
          <p className="text-xs text-white/40 truncate mt-0.5">
            {user?.email}
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/5" />

      {/* Logout Button — full width, unmistakable */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/5 hover:bg-red-500/15 text-white/60 hover:text-red-400 border border-white/10 hover:border-red-500/30 transition-all duration-200 text-sm font-medium"
      >
        <IoLogOutOutline size={18} />
        Log Out
      </button>
    </div>
  );
};

export default UserCard;