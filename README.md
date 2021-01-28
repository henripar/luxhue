# Luxhue

![GitHub top language](https://img.shields.io/github/languages/top/henripar/hue-lite)  ![GitHub package.json version](https://img.shields.io/github/package-json/v/henripar/hue-lite)

Luxhue is an easy-to-use desktop application that allows you to control your Philips hue lights!

Features:  
- Changing color of the light
- Adjusting brightness of the light  
- Turning lights on / off

You will need to have Philips Hue Bridge device in order to make this application work. This app gets all the data from the API that is running on your local Hue Bridge.

## Getting started

1. Fork this repository and then clone your fork by running
`git clone https://github.com/<your_username>/luxhue.git`
2. Run `npm install` to install all the dependencies.
 
 You can now start the app by running `npm start` or create a build by running `npm run build`


## Images

![Image of single light view](public/frontpage2.png)

![Image of single light view](public/tv2.png)


## Supported devices

At the moment Luxhue only supports Philips Hue devices with following modelid's. 

### Light bulbs 

LWA001 LCT001 LCT007 LCT010 LCT014 LCT015 LCT016 LWB004 LWB006 LWB007 LWB010 LWB014 LTW001 LTW004 LTW010 LTW015

### Lightstrips

LCL001 LST002 LST001

### Smart plugs

LOM001

If you have other Philips hue devices connected to your Bridge, they may or may not work as intended. 

More devices will be supported in the future..
