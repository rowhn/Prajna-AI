import dns from 'dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

dns.resolveSrv('_mongodb._tcp.cluster0.2hvphau.mongodb.net', (err, addresses) => {
  if (err) {
    console.error('FAILED:', err);
  } else {
    console.log('SUCCESS:', addresses);
  }
});
