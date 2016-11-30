"use strict";

// first we make sure annyang started succesfully
if (annyang) {

// define the functions our commands will run.
var hello = function() {
$("#hello").slideDown("slow");
scrollTo("#section_hello");
};



var feeling = function() {
console.log("feeling");
};

var scared = function() {
console.log("scared");
};
var happy = function() {
console.log("happy!!!!!!!!!!!!!!!!!!!!!!!");
};
var sad = function() {
console.log("sad");
};
var uncertain = function() {
console.log("uncertain");
};

// var getStarted = function() {
//   window.location.href = 'https://github.com/TalAter/annyang';
// }

// define our commands.
// * The key is the phrase you want your users to say.
// * The value is the action to do.
//   You can pass a function, a function name (as a string), or write your function as part of the commands object.
var commands = {
'*before happy *after': happy,
'i am *middle happy *after': happy,
'*before happy': happy,

'*before scared *after': scared,
'i am *middle scared *after': scared,
'*before scared': scared,

'*before feeling *after': feeling,
'*before feeling': feeling,
'feeling *after': feeling,




// 'let\'s get started':   getStarted,
};

// OPTIONAL: activate debug mode for detailed logging in the console
annyang.debug();

// Add voice commands to respond to
//annyang.addCommands(commands);

// OPTIONAL: Set a language for speech recognition (defaults to English)
// For a full list of language codes, see the documentation:
// https://github.com/TalAter/annyang/blob/master/docs/FAQ.md#what-languages-are-supported
annyang.setLanguage('en');

// Start listening. You can call this here, or attach this call to an event, button, etc.
annyang.start();



annyang.addCallback('result', function(phrases) {
  analizeTextInput(phrases[0]);
for(var i=0;i<phrases.length;i++){
phrases[i];
}
});




annyang.addCallback('soundstart', function() {
console.log('sound detected');
$('#section_hello').css('background-color', 'red');
});

annyang.addCallback('result', function() {
// lastSpeakReminder=Date.now();
// lastBreathReminder=Date.now();
console.log('sound stopped');
$('#section_hello').css('background-color', 'blue');
});


// annyang.addCallback('resultMatch', function(userSaid, commandText, phrases) {
//   console.log(userSaid); // sample output: 'hello'
//   console.log(commandText); // sample output: 'hello (there)'
//   console.log(phrases); // sample output: ['hello', 'halo', 'yellow', 'polo', 'hello kitty']
// });

// annyang.addCallback('resultNoMatch', function(phrases) {
//   console.log("I think the user said: ", phrases[0]);
//   console.log("But then again, it could be any of the following: ", phrases);
// });

} 
// else {
//   $(document).ready(function() {
//     $('#unsupported').fadeIn('fast');
//   });
// }

var scrollTo = function(identifier, speed) {
$('html, body').animate({
scrollTop: $(identifier).offset().top
}, speed || 1000);
}


// var lastSpeakReminder=Date.now();//last reminder or last time something was said
// var waitTimeSpeak=Math.random()*300000*.5 + 300000*.5;

// var lastBreathReminder=Date.now();
// var waitTimeBreath=Math.random()*100000*.5 + 100000*.5;

// var blockingAudio=false;
// var blockingAudioTimer;
// var blockingAudioTime;

function AudioBlock(_blockTime){
  this.isBlocking=false;
  this.blockTime=_blockTime;
  this.lastSetTime;

  this.setTime=function(){
    this.lastSetTime=Date.now();
  }
  this.setToBlock=function(){
    this.isBlocking=true;
  }
  this.tryRemoveBlock=function(){
    if((Date.now()-this.lastSetTime)>this.blockTime){
      this.isBlocking=false;
    }
  }
  this.setTime(10000);
}

var audioBlock=new AudioBlock(20000);

function Reminder(_avrageInterval, _myCue){
  this.lastTime;
  this.waitTime;
  this.avrageInterval=_avrageInterval;
  this.myCue=_myCue;

  



  this.setTime=function(){
    this.lastTime=Date.now();
    this.waitTime=this.avrageInterval + this.avrageInterval*(Math.random()-.5);
  }
  this.sendThisCue = function(){
    sendCue(this.myCue);
  }

  this.isTime=function(){
    return Date.now()-this.lastTime>this.waitTime;
  }
  this.delay=function(){
    this.waitTime+=(this.avrageInterval + this.avrageInterval*(Math.random()-.5))*.3;//delay if blocked because other audio
  }
  this.probability=function(_percent){
    var rand=Math.floor(Math.random()*100);
    if(rand<=_percent){
      console.log("prob was true");
      return true;
    }
    else{
      console.log("prob was false");
      return false;
    }
  }
  
  this.setTime();
}



var speakReminder=new Reminder(30000/10, 8.1);
var breathReminder=new Reminder(10000, 9.1);

var draw = function() {
  console.log(hist.myLog());

  if(audioBlock.isBlocking){
    audioBlock.tryRemoveBlock();//has enoph time passed to remove block?
  }
  console.log(audioBlock.isBlocking);

  if(speakReminder.isTime()){
    //console.log("remind the person to speak  " + Date.now());
    if(!audioBlock.isBlocking && speakReminder.probability(1)){
      speakReminder.sendThisCue();
      speakReminder.setTime();
    }else{
      speakReminder.delay();
    }
  }

  if(breathReminder.isTime()){
    if(!audioBlock.isBlocking && breathReminder.probability(50)){
      breathReminder.sendThisCue();
      breathReminder.setTime();
    }else{
      breathReminder.delay();
    }
  }
};



var timer =  setInterval(draw, 1000); // call every 1000 milliseconds
