module.exports = {
  apps: [
    {
      name: "api.tasks.agentsoncloud.com_Release_3", // change to your subdomain name
      script: "app.js",
      instances : "1",
      exec_mode : "cluster"
    },
  ],
};
