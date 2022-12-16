import { AmazonCognitoIdentity } from 'amazon-cognito-identity-js';

const aws = require('aws-sdk');


const awsServerlessExpress = require('aws-serverless-express');

const app = require('./app');

exports.handler = async () => {
  const { Parameters } = await (new aws.SSM())
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
var authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
var poolData = { UserPoolId : process.env.AUTH_AMPLIFYCOMMERCEDEMOAC357CB1AC357CB1_USERPOOLID,
    ClientId : '1example23456789'
};
var userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
var userData = {
    Username : process.env.USERNAME,
    Pool : userPool
};
var cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: function (result) {
        var accessToken = result.getAccessToken().getJwtToken();

        /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
        var idToken = result.idToken.jwtToken;
    },

    onFailure: function(err) {
        alert(err);
    },

});

  return cognitoUser;
};
