const express = require('express');
const app = express();
const { AppConfigurationClient } = require("@azure/app-configuration");

require('dotenv').config()
const port = process.env.PORT || 3000


async function start() {
  let retrievedSetting = await client.getConfigurationSetting({
    key: ".appconfig.featureflag/NEW-FEATURE"
  });

  const updatedText = retrievedSetting.value && retrievedSetting.value.enabled ? "NEW FEATURE ENABLED" : "NEW FEATURE DISABLED";

  app.get('/', (req,res)=>res.send("Hello World, "+ updatedText +" my web host name is " + process.env.APP_HOST_NAME || " not defined. "));
}

// Create an AppConfigurationClient that will authenticate through AAD in the China cloud
const client = new AppConfigurationClient(process.env.FEATURE_FLAG_CONNECTION_STRING);


// Call the method which fetches the data
start().catch((err) => console.log("ERROR:", err));
app.listen(port, ()=>console.log("server is running on port" + port))
