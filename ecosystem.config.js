module.exports = {
    apps: [{
      name: "visasure-api",
      script: "npm",
      args: "start",
      cwd: "/var/www/visasure-cameroun/",
      watch: true,
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }]
  };