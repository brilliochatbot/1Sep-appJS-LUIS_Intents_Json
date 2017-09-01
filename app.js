var restify = require('restify');
var YQL     = require('yql');
var builder = require('botbuilder');
var builder1 = require('botbuilder');
var express = require('express');
var app = express();
var querystring = require('querystring');
var request = require('request');
var counter;


var apiairecognizer = require('api-ai-recognizer'); 
var request = require('request');

var form = {
    username: 'usr',
    password: 'pwd',
    opaque: 'opaque',
    logintype: '1'
};

var formData = querystring.stringify(form);
var contentLength = formData.length;

var count1 = 0;
// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

app.listen(4000 , function(){
console.log("port 4000 is running");
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    //appId: process.env.MICROSOFT_APP_ID,
	appId: "37f09aa3-c891-4e47-a024-eb91207d54cf",
	appPassword: "BziRNqA4v218QhYmqkEZTKF"
    //appPassword: process.env.MICROSOFT_APP_PASSWORD
});




// Listen for messages from users 
server.post('/api/messages', connector.listen());


var bot = new builder.UniversalBot(connector, function (session) {
		request({
    headers: {
     
	  'Authorization': 'Bearer 5672dcdc85c547bfa08116c8926dd389',
      'Content-Type' : 'application/json; charset=utf-8'

    },
    uri: 'https://api.api.ai/v1/query?v=20150910',
    body: '{"query": '+session.message.text+',"timezone": "America/New_York","lang": "en","sessionId": "1234567890"	}',
    method: 'POST'
  }, function (err, res, body) {
    //it works!
	body = JSON.parse(body);
	temp = body.result.fulfillment.speech;
	tempp = body.result.metadata.intentName;
	//sleep.sleep(4);
	session.send(temp);
	
  });
		
		session.send('Sorry, I did not understand \'%s\'. Please check your input.', session.message.text);
});


var LUIS_MODEL_URL='https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/bd8ad2bc-a774-4fd9-8c10-c462a8190b97?subscription-key=1d9451278d7c49e3a9e5e08c13132c80&verbose=true&timezoneOffset=0&q='

var recognizer = new builder.LuisRecognizer(LUIS_MODEL_URL);

var recognizer_api = new apiairecognizer('5672dcdc85c547bfa08116c8926dd389'); 


bot.recognizer(recognizer);



var intents = new builder.IntentDialog({recognizers:[recognizer]});

var intents1 = new builder.IntentDialog({ recognizers: [recognizer_api] }); //api.ai


bot.dialog('*',intents); 




intents1.matches('whatIsWeather',[ function(session,args)
{ var city11 = builder.EntityRecognizer.findEntity(args.entities,'city'); 
if (city11)
{ 
var city_name = city11.entity; 
var url = 'http://api.apixu.com/v1/current.json?key=a3245afef9f940f3b68111100171108&q=' + city_name; 
request(url,function(error,response,body)
{ 
body = JSON.parse(body);

temp = body.current.temp_c; 
session.send("It's " + temp + " degrees celsius in " + city_name); 
}); 
}else
{ builder.Prompts.text(session, 'Which city do you want the weather for?');
 } }, function(session,results)
 { 
 var city_name = results.response; 
 var url = 'http://api.apixu.com/v1/current.json?key=a3245afef9f940f3b68111100171108&q=' + city_name; 
 request(url,function(error,response,body)
 { 
 body = JSON.parse(body);
 temp = body.current.temp_c; 
 session.send("It's " + temp + " degrees celsius in " + city_name); }); 
 } ]);


 
 
 
 
 function prioritizer(session,args){
if(counter==1)
	{
	 session.send("Hey we can discuss about everything in the world later.");
	 session.send("Before I forget, let me know what kind of service you wish to go for......");
	

	}
	else if(counter===2)
	{
		
	//session.send('I am not trained to answer \'%s\' \n\nPlease help me by giving questions related to Lexus car Service\n\nLet me know your car number ', session.message.text);
	session.send('Hey why dont you tell me whether you need Routine or Auxiallary service')
	session.send('How can I help you today?')
	}
	else if(counter=3)
	{
	
	//session.send('I am not trained to answer \'%s\' \n\nPlease help me by giving questions related to Lexus car Service\n\nHow can I help you today?', session.message.text);
	session.send('Let me know the date')
	
	}
	else if(counter=4)
	{
	session.send('Let me know the time')
	//session.send('I am not trained to answer \'%s\' \n\nPlease help me by giving questions related to Lexus car Service\n\nLet me know what kind of service you like to go with Routine Service / Auxiliary service ', session.message.text);
	//session.send('Let me know what kind of service you like to go with Routine Service / Auxiliary service')
	//session.send('When are you planning to go for this service?')
	}
	else if(counter=5)
	{
	session.send('Let me know the service detailing')
	//session.send('I am not trained to answer \'%s\' \n\nPlease help me by giving questions related to Lexus car Service\n\nWhen are you planning to go for this service?', session.message.text);
	//session.send('When are you planning to go for this service?');
	//session.send('Let me know which time do you prefer for the service?\n\n9 am / 11 am / 3 pm/ 5 pm')
	}
	else(counter=6)
	{
	session.send('Let me know the service alternative arrangement')
	//session.send('I am not trained to answer \'%s\' \n\nPlease help me by giving questions related to Lexus car Service\n\nLet me know which time do you prefer for the service?\n\n9 am / 11 am / 3 pm/ 5 pm', session.message.text);
	//session.send('Let me know which time do you prefer for the service?\n\n9 am / 11 am / 3 pm/ 5 pm')
	//session.send('Generally people go for oil change, battery check-up, general servicing during a routine service. What are your preferences?')
	}
	
	
	

}
 
 
 
 
 
 


bot.dialog('greeting', [
  function(session,args,next){
 

 
 
 
  var greetingListEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'greetingList');
  
  if(greetingListEntity)
  
  
	{
	
	builder.Prompts.text(session, 'Hey Brillio ');
	builder.Prompts.text(session, 'I am your smart auto assistant powered by Hella.');
	builder.Prompts.text(session, 'Help me with your car number to book a service for you.');

	}
	else
	{
	  
	builder.Prompts.text(session, 'please enter valid input');
	}
  
  }
  ]).triggerAction({
    matches: 'greeting'
});





bot.dialog('carregistered', [
  function(session,args,next){
  
  var carnumberEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'carnumber');
  counter=1;
  if(carnumberEntity)
    
 
	{
    
	builder.Prompts.text(session, 'Give me a second..');
	builder.Prompts.text(session, 'Hey John.. Hope you are riding your Lexus RC F well. ');
	builder.Prompts.text(session, 'Now let me know, what kind of service you wish to go for?');
	}
	else
	{
	 prioritizer(session,args);
	}
	
  
  //session.send('Let me know your car number');
  }
  ]).triggerAction({
    matches: 'carregistered'

  });
  
  



  bot.dialog('carservice', [
  function(session,args,next){
  
  var typeofserviceEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'typeofservice');
  counter=2;
  if(typeofserviceEntity)
  

	{
	
		//session.send('model %s', results.response)
		builder.Prompts.text(session, "That's great!! When are you planning to go for this service?");
	}
	else
	{

	prioritizer(session,args);
	}
  

  }
  

  ]).triggerAction({
    matches: 'carservice'

  });
  
  bot.dialog('date', [
  function(session,args,next){
    
        counter=3;
		builder.Prompts.text(session, "Noted the date.");
        session.send("We have only four time slots available: 9 am / 11 am / 3 pm/ 5 pm");
		session.send("Let me know your choice of preference....");
   
  }
  ]).triggerAction({
    matches: 'date'

  });
  
  
  bot.dialog('time', [
  function(session,args,next){
        counter=4;
		builder.Prompts.text(session, "Perfect...");
		session.send("Generally people go for oil change, battery check-up, general servicing during a routine service. What do you want me to cover in this service?");
		
  }
  ]).triggerAction({
    matches: 'time'

  });
  
  
  bot.dialog('servicerequest', [
  function(session,args,next){
  
  var servicetypeEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'servicetype');
  counter=5;
  if(servicetypeEntity)
  

	{
	counter=5;
		builder.Prompts.text(session, 'While we service your car, how do you prefer to move around?\n\nLoaner Car/ Shuttle service');
	}
	else
	{

	prioritizer(session,args);
							
	}
  
  
  }

  ]).triggerAction({
    matches: 'servicerequest'
	
  });
  

 bot.dialog('movearount1', [
  function(session,args,next){
  
  var movearoundtypeEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'movearoundtype');
  counter=6;
  
  if(movearoundtypeEntity)

	{
	
	
		builder.Prompts.text(session, 'Your loaner car would be available by 9:05 am and needs to be returned while taking your car back./ Driver named John will pick you by 9:15 am. You can reach him at (541) 754-3010)');
	}
	else
	{

	prioritizer(session,args);
	}
  
  
  }

  ]).triggerAction({
    matches: 'movearount1'
	//onInterrupted: function (session) {
    //    session.send('Please provide a valid car number');
  });
   
   
  bot.dialog('movearount2', [
  function(session,args,next){
  
  var movearoundtypeEntity = builder.EntityRecognizer.findEntity(args.intent.entities, 'movearoundtype');
  counter=6;
  
  if(movearoundtypeEntity)

	{
		//session.send('model %s', results.response)
		builder.Prompts.text(session, 'Driver named John will pick you by 9:15 am. You can reach him at (541) 754-3010)');
	}
	else
	{

	prioritizer(session,args);
	}

  }

  ]).triggerAction({
    matches: 'movearount2'

  });
 
 
 
 
 
  bot.dialog('end', [
  function(session,args,next){
  //session.send('model %s', results.response)
		builder.Prompts.text(session, "Your Welcome");
  count1=0; 		
  }
  ]).triggerAction({
    matches: 'end'
	
  });
 
 bot.dialog('None', [
  function(session,args,next){


request({
    headers: {
  
	  'Authorization': 'Bearer 5672dcdc85c547bfa08116c8926dd389',
      'Content-Type' : 'application/json; charset=utf-8'

    },
    uri: 'https://api.api.ai/v1/query?v=20150910',
    body: '{"query": '+session.message.text+',"timezone": "America/New_York","lang": "en","sessionId": "1234567890"	}',
    method: 'POST'
  }, function (err, res, body) {
    //it works!
	body = JSON.parse(body);
	temp = body.result.fulfillment.speech;
	tempp = body.result.metadata.intentName;
	//sleep.sleep(4);
	session.send(temp);//
	
  });	


	
	
  }
  ])








 
 
function apiCall(args){
request({
    headers: {
      //'Content-Length': contentLength,
	  'Authorization': 'Bearer 5672dcdc85c547bfa08116c8926dd389',
      'Content-Type' : 'application/json; charset=utf-8'
	  //'Content-Type': 'application/json'
	  //'Content-Type': 'application/x-www-form-urlencoded'
    },
    uri: 'https://api.api.ai/v1/query?v=20150910',
    body: '{"query": session.message.text,"timezone": "America/New_York","lang": "en","sessionId": "1234567890"	}',
    method: 'POST'
  }, function (err, res, body) {
    //it works!
	body = JSON.parse(body);
	temp = body.result.fulfillment.speech;
	tempp = body.result.metadata.intentName;
	session.send(temp);
	console.log(temp);
	console.log(tempp);
  });

}
