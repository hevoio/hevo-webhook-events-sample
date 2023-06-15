# Hevo Webhook Events Test Project in Flask
Set up a server on your local machine to receive [Webhook Events](https://docs.hevodata.com/destinations/webhook-events/)
​
## Setup
Configure a Flask server combined with [ngrok](https://ngrok.com) on your local machine to test your Webhook Events.
​
### Prepare
Make sure you have [ngrok](https://ngrok.com/download) and [Python 3](https://www.python.org/downloads/) installed locally.
 
Optionally, you can enable signature verification and provide a port number for your server. For this, create a `.env` file in the root directory of your project and add the following lines:
​
 ```
  WEBHOOKS_SECRET="YOUR_SECRET"
  PORT=PORT_NUMBER
 ```
​
### Getting Started
 Install dependencies and start your server by running the following commands in the root directory of your project.
​
```
  pip install -r requirements.txt
  python3 app.py
```
​
By default, your Flask server runs on http://localhost:3000. The port number is different if you specified a PORT in the `.env` file.
​
### Hosting via ngrok
Run the following command to expose your local server to internet. Change the port number as per your Flask server URL.
​
```
ngrok http 3000
```
​
ngrok displays a forwarding URL that maps to your local Flask server. Append /webhook-token to the end of the forwarding URL. For example, if the forwarding URL is https://abcd1234.ngrok.io, then your webhook URL is https://abcd1234.ngrok.io/webhook-token. You can use this URL to access your Flask server over the internet.
​
### Create Webhook Events in Hevo.
Follow the instructions [here](https://docs.hevodata.com/destinations/webhook-events/configuring-webhook-events/) to create a Webhook Event in Hevo using the URL obtained above and your secret.