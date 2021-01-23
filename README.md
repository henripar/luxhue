# Hue Lite

![GitHub top language](https://img.shields.io/github/languages/top/henripar/hue-lite)  ![GitHub package.json version](https://img.shields.io/github/package-json/v/henripar/hue-lite)

Hue Lite is an easy-to-use desktop application that allows you to control your Philips hue lights!

Features:  
- Changing color of the light
- Adjusting brightness of the light  
- Turning lights on / off

You will need to have Philips Hue Bridge device in order to make this application work. This app gets all the data from the API that is running on your local Hue Bridge.

## Images

![Image of single light view](public/frontpage.png)

![Image of single light view](public/tv.png)

## Getting started

1. Clone this repository by running 
`git clone https://github.com/henripar/hue-lite.git`
2. Run `npm install` to install all the dependencies.
3. Create .env file in the project root folder and add variable called REACT_APP_BRIDGE_URL

 **You'll need 2 things for your bridge url**
 - Your local Philips hue bridge ip address (get it from the offical Philips Hue App)
 - Bridge generated username 
 
 You can get both of these by following the offical Philips Hue instructions on  
 https://developers.meethue.com/develop/get-started-2/ 
 
 - Once you have your ip address and username, set REACT_APP_BRIDGE_URL to `	http://<bridge_ip_address>/api/<user_name>`  
 
 
 You can now start the app by running `npm start`or create a build by running `npm run build`
