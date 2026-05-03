module.exports = {
  apps: [{
    name: 'hexmy-next',
    script: 'node_modules/next/dist/bin/next',
    args: 'start',
    instances: 'max',           // Use all CPU cores like freshprn
    exec_mode: 'cluster',       // Cluster mode for better performance
    max_memory_restart: '500M',  // Restart if memory > 500MB
    env: {
      NODE_ENV: 'production',
      PORT: 3001                 // Different port than freshprn
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 3001
    },
    min_uptime: '10s',
    max_restarts: 5,
    restart_delay: 3000,
    // Auto restart on failure
    autorestart: true,
    // Don't restart if crashing too fast
    exp_backoff_restart_delay: 100,
    // Merge logs
    merge_logs: true,
    // Log file paths
    log_file: '/root/.pm2/logs/hexmy-next-out.log',
    out_file: '/root/.pm2/logs/hexmy-next-out.log',
    error_file: '/root/.pm2/logs/hexmy-next-error.log'
  }]
}
