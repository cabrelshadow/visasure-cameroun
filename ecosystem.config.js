module.exports = {
  apps: [{
    name: "visasure-api",
    script: "src/app.ts",
    interpreter: "node",
    interpreter_args: "-r ts-node/register",
    env: {
      NODE_ENV: "development",
    }
  }]
};