//Rushikesh
// This code is compatible to show response on Alexa Show device as well
'use strict';
var https = require('https')
const Alexa = require('alexa-sdk');
const makePlainText = Alexa.utils.TextUtils.makePlainText;
const makeImage = Alexa.utils.ImageUtils.makeImage;

//TODO : Relace this id with your skill ID
const APP_ID = 'amzn1.ask.skill.706aa9e8-0270-4426-8cba-612f550e2418'; 

const BACKGROUNDIMAGE = 'https://raw.githubusercontent.com/RushikeshBhapkar/QC/master/%20background.png'

const handlers = {

    'LaunchRequest': function () {
        var sessionAttributes = {};
        var speechOutput = "Welcome to the Home Safety skill. You can ask me 'Perform Safety Check' or 'Is my Home Safe'";
        // If the user either does not reply to the welcome message or says something that is not
        // understood, they will be prompted again with this text.
        var repromptText = "How may I help you?";
        var shouldEndSession = false;
        
        this.response.speak(speechOutput)
                     .cardRenderer("Home Safety Alexa", " - " +  speechOutput)
                     .shouldEndSession(shouldEndSession);
        this.response.listen(repromptText);
        this.emit(":responseReady");
    },

    'HomeSafetyIntent': function () {
            var endpoint = "https://api.thingspeak.com/channels/468442/feeds.json?api_key=CQI8QP4N0YR3CXRM&results=1"; // ENDPOINT GOES HERE
            var body = "";
            https.get(endpoint, (response) => {
              response.on('data', (chunk) => { body += chunk });
              response.on('end', () => {
                var data = JSON.parse(body);
                console.log(data);
                console.log("field 1 :" + data.feeds[0].field1);
                var cardTitle = 'HelloWorldIntent';
                var speechOutput = "";
                var repromptText = "";
                var shouldEndSession = false;
                var sessionAttributes = {};
                var isHomeSafe = data.feeds[0].field1;
                if(isHomeSafe == 1) {
                    speechOutput = "Home is safe, Thank you.";
                } else {
                    speechOutput = "Home is Not safe, please close the window";
                }
    
                    this.response.speak(speechOutput)
                     .cardRenderer("Home Safety Alexa", " - " +  speechOutput)
                     .shouldEndSession(shouldEndSession);
                    this.response.listen(repromptText);
                    this.emit(":responseReady");
              });
            });
    },

    'GreetMeIntent': function () {
        var cardTitle = 'HelloWorldIntent';
        var speechOutput = "";
        var repromptText = "";
        var shouldEndSession = false;
        var sessionAttributes = {};
        
        speechOutput = "You are in Home Safety.";
    
        this.response.speak(speechOutput)
                     .cardRenderer("Home Safety Alexa", " - " +  speechOutput)
                     .shouldEndSession(shouldEndSession);
        this.response.listen(repromptText);
        this.emit(":responseReady");
    },

    'HelpIntent': function () {
        var cardTitle = 'HelpIntent';
        var speechOutput = "";
        var repromptText = "";
        var shouldEndSession = false;
        var sessionAtt = {};
        
        speechOutput = "This is Home Safety Skill which helps you to check if your Home is safe or not. You can setup your windows, doors or Gas with our Hardware and this skill will check if your home is safe or not instantly. Contact me for Hardware setup. You can say 'Is my Home Safe' to check if your Home is safe or not.";
    
        this.response.speak(speechOutput)
                     .cardRenderer("Home Safety Alexa", " - " +  speechOutput)
                     .shouldEndSession(shouldEndSession);
        this.response.listen(repromptText);
        this.emit(":responseReady");
    },

    'AMAZON.HelpIntent': function () {
        var cardTitle = 'HelpIntent';
        var speechOutput = "";
        var repromptText = "";
        var shouldEndSession = false;
        var sessionAtt = {};
        
        speechOutput = "This is Home Safety Skill which helps you to check if your Home is safe or not. You can setup your windows, doors or Gas with our Hardware and this skill will check if your home is safe or not instantly. Contact me for Hardware setup. You can say 'Is my Home Safe' to check if your Home is safe or not.";
    
        this.response.speak(speechOutput)
                     .cardRenderer("Home Safety Alexa", " - " +  speechOutput)
                     .shouldEndSession(shouldEndSession);
        this.response.listen(repromptText);
        this.emit(":responseReady");
    },
    
    'AMAZON.StopIntent': function () {

        var cardTitle = 'Session Ended';
        var speechOutput = "";
        var repromptText = "";
        var shouldEndSession = true;
        var sessionAtt = {};
        
        speechOutput = "Thank you. Have a safe day!";
    
        this.response.speak(speechOutput)
                     .cardRenderer("Home Safety Alexa", " - " +  speechOutput)
                     .shouldEndSession(shouldEndSession);
        this.response.listen(repromptText);
        this.emit(":responseReady");
    },
    
    'AMAZON.CancelIntent': function () {
        var cardTitle = 'Session Ended';
        var speechOutput = "";
        var repromptText = "";
        var shouldEndSession = true;
        var sessionAtt = {};
        
        speechOutput = "Thank you. Have a safe day!";
    
        this.response.speak(speechOutput)
                     .cardRenderer("Home Safety Alexa", " - " +  speechOutput)
                     .shouldEndSession(shouldEndSession);
        this.response.listen(repromptText);
        this.emit(":responseReady");
    },
    
    'Unhandled': function() {
        var cardTitle = "Unhandled";
        var speechOutput = "Sorry! I didn't get that.";
        // Setting this to true ends the session and exits the skill.
        var shouldEndSession = false;
        this.response.speak(speechOutput)
                     .cardRenderer("Home Safety Alexa", " - " +  speechOutput)
                     .shouldEndSession(shouldEndSession);
        this.emit(":responseReady");
    }
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;

    alexa.registerHandlers(handlers);
    alexa.execute();
};


function SupportsDisplay(){
    var hasDisplay = 
    this.event.context &&
    this.event.context.System &&
    this.event.context.System.device &&
    this.event.context.System.device.supportedInterfaces &&
    this.event.context.System.device.supportedInterfaces.Display;
    
    return hasDisplay;
}
