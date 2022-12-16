const awsServerlessExpress = require('aws-serverless-express');
const app = require('./app');

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
  console.log(AUTH_AMPLIFYCOMMERCEDEMOAC357CB1AC357CB1_USERPOOLID);

  return awsServerlessExpress.proxy(server, event, context, 'PROMISE').promise;
};
