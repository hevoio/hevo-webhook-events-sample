# Hevo Webhook Events Test Project with Express.js
Set up a server on your local machine to receive [Webhook Events](https://docs.hevodata.com/destinations/webhook-events)
​
## Setup
Configure a Express server combined with [ngrok](https://ngrok.com) on your local machine to test your Webhook Events.
​
### Prepare
Make sure you have [ngrok](https://ngrok.com/download) and [Node.JS version 14 or higher](https://nodejs.org/en/download) is installed locally.
  
Optionally, you can enable signature verification and provide a port number for your server. For this, create a `.env` file in the root directory of your project and add the following lines:
 
 ```
  WEBHOOKS_SECRET="YOUR_SECRET"
  PORT=PORT_NUMBER
 ```
​
### Getting Started
 Install dependencies and start your server by running the following commands in the root directory of your project.
 
```
  npm install
  npm run start
```
​
By default, your Express server runs on http://localhost:3000. The port number is different if you specified a PORT in the `.env` file.
​
### Hosting via ngrok
Run the following commands to expose your local server to internet. Change the port number as per your Express server URL.
​
```
ngrok http 3000
```
​
ngrok displays a forwarding URL that maps to your local Express server. Append /webhook-token to the end of the forwarding URL. For example, if the forwarding URL is https://abcd1234.ngrok.io, then your webhook URL is https://abcd1234.ngrok.io/webhook-token. You can use this URL to access your Express server over the internet. please make sure that you whitelist the hevo's IP address if you want to run it behind your infrastructure's firewall.
​
### Create Webhook Events in Hevo.
Follow the instructions [here](https://docs.hevodata.com/destinations/webhook-events/configuring-webhook-events/) to create a Webhook Event in Hevo using the URL obtained above and your secret.