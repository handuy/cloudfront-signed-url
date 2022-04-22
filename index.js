const express = require('express')
const app = express()
const AWS = require("aws-sdk");
const cfsign = require('aws-cloudfront-sign');
const port = 3000

var credentials = new AWS.SharedIniFileCredentials({profile: 'admin-general'});
AWS.config.credentials = credentials;

app.get('/', (req, res) => {
  var signingParams = {
    keypairId: "K2918NWY8IALEH",
    // Optional - this can be used as an alternative to privateKeyString
    privateKeyPath: '/Users/duy/.ssh/private_key.pem',
    expireTime: (new Date().getTime()) + 86400000
  }

  // Generating a signed URL
  var signedUrl = cfsign.getSignedUrl(
    'https://d249ziw5vdolb.cloudfront.net/img/cat_1.jpeg', 
    signingParams
  );

  res.send(signedUrl)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})