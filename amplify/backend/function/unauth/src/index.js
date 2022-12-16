const AWS = require('aws-sdk')
const awsServerlessExpress = require('aws-serverless-express');

const app = require('./app');

exports.handler = async () => {
  const { Parameters } = await (new AWS.SSM())
    .getParameters({
      Names: ["USERNAME","PASSWORD"].map(secretName => process.env[secretName]),
      WithDecryption: true,
    })
    .promise();
  const USERNAME = Parameters.pop().Value;
  const PASSWORD = Parameters.pop().Value;

  const response = {
    statusCode: 200,
    body: `USERNAME: ${USERNAME}, PASSWORD: ${PASSWORD}`,
  };

  return response;
};

/**
 * @type {import('http').Server}
 */
const server = awsServerlessExpress.createServer(app);

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  


  
  console.log(process.env.AUTH_AMPLIFYCOMMERCEDEMOAC357CB1AC357CB1_USERPOOLID);
  console.log(process.env.USERNAME);
  console.log(process.env.PASSWORD);



  var authenticationData = {
    Username : process.env.USERNAME,
    Password : process.env.PASSWORD,
};

let response = {
  statusCode: 200,
  headers: {
      "x-custom-header" : "my custom header value"
  },
  body: JSON.stringify({"result": "ok"})
};
console.log("response: " + JSON.stringify(response))
return response;

};
