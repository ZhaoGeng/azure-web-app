const express = require('express');
const app = express();
const { AppConfigurationClient } = require("@azure/app-configuration");

require('dotenv').config()
const port = process.env.PORT || 3000


async function getFeatureFlag() {
  let retrievedSetting = await client.getConfigurationSetting({
    key: ".appconfig.featureflag/NEW-FEATURE"
  });

  return retrievedSetting.value && retrievedSetting.value ? JSON.parse(retrievedSetting.value) : {}; 
}

// Create an AppConfigurationClient that will authenticate through AAD in the China cloud
const client = new AppConfigurationClient(process.env.FEATURE_FLAG_CONNECTION_STRING);


app.get('/', (req,res)=>{
    // Call the method which fetches the data
    getFeatureFlag()
    .then((config)=>{
       const updatedText = config.enabled ? "NEW FEATURE ENABLED" : "NEW FEATURE DISABLED";
       return res.send("Hello World, "+ updatedText +" my web host name is " + process.env.APP_HOST_NAME || " not defined. ");
     })
    .catch((err) => {
      console.log("ERROR:", err);
      return res.send("Feature Flag Error Happened");
    });
});




app.listen(port, ()=>console.log("server is running on port" + port))
