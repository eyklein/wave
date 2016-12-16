"use strict";

// first we make sure annyang started succesfully
if (annyang) {

// define the functions our commands will run.

annyang.addCallback('soundstart', function() {
  console.log("sount start")  
});
annyang.addCallback('result', function(phrases) {
  // annyang.pause();
  if(phrases){
    analizeTextInput(phrases[0]);
  }
  for(var i=0;i<phrases.length;i++){
    phrases[i];
  }

  resetAnnyang();
  console.log("abort annyang!!!!!!!!!!!!!!!!!!!"); // sample output: 'hello'
  speakReminder.setHalfTime();//could be full time
  breathReminder.setHalfTime();
  console.log("next speak in :" + (((Date.now()-speakReminder.lastTime)-speakReminder.waitTime)/1000));
  console.log("next breath in :" + (((Date.now()-breathReminder.lastTime)-breathReminder.waitTime)/1000));
});

annyang.addCallback('resultMatch',function(){
})

// var hello = function() {//?
//   $("#hello").slideDown("slow");
//   scrollTo("#section_hello");
// };



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
// var commands = {
// '*before happy *after': happy,
// 'i am *middle happy *after': happy,
// '*before happy': happy,

// '*before scared *after': scared,
// 'i am *middle scared *after': scared,
// '*before scared': scared,

// '*before feeling *after': feeling,
// '*before feeling': feeling,
// 'feeling *after': feeling,




// // 'let\'s get started':   getStarted,
// };

// OPTIONAL: activate debug mode for detailed logging in the console
annyang.debug();

// Add voice commands to respond to
//annyang.addCommands(commands);

// OPTIONAL: Set a language for speech recognition (defaults to English)
// For a full list of language codes, see the documentation:
// https://github.com/TalAter/annyang/blob/master/docs/FAQ.md#what-languages-are-supported
// annyang.setLanguage('en');
annyang.setLanguage('en-US');

// Start listening. You can call this here, or attach this call to an event, button, etc.
console.log("Start annyang")
// annyang.start();
annyang.start({ autoRestart: false });//not listening to autorestart ???









// annyang.addCallback('soundstart', function() {
// console.log('sound detected');

// });

// annyang.addCallback('result', function() {
// // lastSpeakReminder=Date.now();
// // lastBreathReminder=Date.now();
// console.log('sound stopped');

// });


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



// var scrollTo = function(identifier, speed) {
//   $('html, body').animate({
//     scrollTop: $(identifier).offset().top
//   }, speed || 1000);
// }


var startTime=Date.now();
var totalTime=19*60*1000;


var Music = function(_fileName){

  this.audio = new Audio(_fileName);

  this.play=function(){
    this.audio.volume = 0.3;
    this.audio.play();
  }
  this.pause=function(){
    this.audio.pause();
  }
}



var Breath = function(){
  this.inhale1=new Audio("/audio/recording/breathing_sounds/inhale_1.mp3");
  this.exhale1=new Audio("/audio/recording/breathing_sounds/exhale_1.mp3");
  this.volume=0.7;
  this.cycle;
  this.cycleTime;
  this._this;
  this.inhaleQue=101;
  this.exhaleQue=102;

  this.inhale=function(){
    // this.inhale1.volume = this.volume;
    // this.inhale1.play();
    sendCue(this.inhaleQue,0,false);
  }
  this.exhale=function(){
    // this.exhale1.volume = this.volume;
    // this.exhale1.play();
    sendCue(this.exhaleQue,0,false);
  }
  this.setVolume=function(_volume){
    this.volume=_volume;
  }
  this.setCycle=function(_cycleTime){
    this.cycleTime=_cycleTime;

    var that=this;
    
    this.cycle =  setInterval(function(){



      setTimeout(function(){ that.exhale(); }, that.cycleTime);

      setTimeout(function(){ that.inhale(); }, that.cycleTime/2);
      
      
    }, _cycleTime);
  }
  this.endCycle=function(){
    clearInterval(this.cycle);
  }
  // this.runCycle=function(){
  //   console.log(this._this.inhale)
  //   setTimeout(function(){ this._this.inhale(); }, this.cycleTime/2);
  //   setTimeout(function(){ this._this.exhale(); }, this.cycleTime/2);
  // }
}
var breath=new Breath();
breath.setCycle(7000);


//********************************************************
// var moby=new Music("/audio/music/Moby - LA7.mp3");
// setTimeout(function(){moby.play();}, 6*1000);
//********************************************************
var musicCue=100;
sendCue(musicCue,5*1000,false);




//remove this to shorten intro ***
var minutes=5//*.001;
setTimeout(function(){ audioBlock.removeIntroBlock(); }, minutes*60*1000);

var introCue=200;
sendCue(introCue,20*1000,false);
//*** undo this to 



var lastSpeakReminder=Date.now();//last reminder or last time something was said
var waitTimeSpeak=Math.random()*300000*.5 + 300000*.5;

var lastBreathReminder=Date.now();
var waitTimeBreath=Math.random()*100000*.5 + 100000*.5;

// var blockingAudio=false;
// var blockingAudioTimer;
// var blockingAudioTime;

function AudioBlock(_blockTime){
  this.isBlocking=true;
  this.blockTime=_blockTime;
  this.lastSetTime;
  this.introBlock=true;

  this.setTime=function(){
    this.lastSetTime=Date.now();
  }
  
  this.setToBlock=function(){
    this.isBlocking=true;
    this.setTime();
  }
  this.tryRemoveBlock=function(){
    if(!this.introBlock && (Date.now()-this.lastSetTime)>this.blockTime){
      this.isBlocking=false;
    }
  }
  this.removeIntroBlock=function(){
    console.log(" intron block removed *************************************")
    this.introBlock=false;
  }
  this.setTime();
}

var audioBlock=new AudioBlock(10000); // block other audio for 20 secons

function Reminder(_avrageInterval, _myCues){
  this.lastTime;
  this.waitTime;
  this.avrageInterval=_avrageInterval;
  this.myCues=[];
  for(var i=0;i<_myCues.length;i++){
    this.myCues[i]=_myCues[i];
  }
  this.numberOfFirings=0;

  this.setTime=function(){
    this.lastTime=Date.now();
    this.waitTime=this.avrageInterval + this.avrageInterval*(Math.random()-.5);
  }
  this.setHalfTime=function(){
    this.lastTime=Math.max(this.lastTime,((Date.now()-(Date.now()-this.lastTime))/2));
    // this.waitTime=Math.max(this.waitTime,(this.avrageInterval + this.avrageInterval*(Math.random()-.5)));
  }
  this.sendThisCue = function(){

    this.numberOfFirings++;
    var index=Math.floor(this.myCues.length*(Date.now()-startTime)/totalTime);

    console.log(this.myCues[index]);
    sendCue(this.myCues[index],800);
  }

  this.isTime=function(){
    return Date.now()-this.lastTime>this.waitTime;
  }
  this.delay=function(){
    this.waitTime+=(this.avrageInterval + this.avrageInterval*(Math.random()-.5))*.4;//delay if blocked because other audio
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



var speakReminder=new Reminder(1*60000, [9.2,9.1]);
var breathReminder=new Reminder(1*60000, [8.1]);
var startTime= Date.now();

var draw = function() {
  // console.log(hist.myLog());

  if(!annyang.isListening()){
    console.log("restarting annyang")
    annyang.start();

  }
  if(myBarChart==undefined || myBarChart==null){
    buildBarChart(hist);
  }

  var milliSecondsPassed= Date.now()-startTime;
  var secondsPassed=Math.floor(milliSecondsPassed/1000);
  var minutesPassed=Math.floor(secondsPassed/60);
  document.getElementById("time").innerHTML=minutesPassed +":" +secondsPassed%60;

  if(audioBlock.isBlocking){
    $('#section_hello').css('background-color', 'red');
    audioBlock.tryRemoveBlock();//has enoph time passed to remove block?

  }else{
    $('#section_hello').css('background-color', 'green');
  }
  // console.log(audioBlock.isBlocking);

  if(speakReminder.isTime()){
    //console.log("remind the person to speak  " + Date.now());
    if(!audioBlock.isBlocking && speakReminder.probability(50/(1+speakReminder.numberOfFirings))){
      // audioBlock.setToBlock();
      speakReminder.sendThisCue();
      speakReminder.setTime();

    }else{

      speakReminder.delay();
    }
  }

  if(breathReminder.isTime()){
    if(!audioBlock.isBlocking && breathReminder.probability(50/(1+breathReminder.numberOfFirings))){
      // audioBlock.setToBlock();
      breathReminder.sendThisCue();
      breathReminder.setTime();
    }else{
      breathReminder.delay();
    }
  }
};



var timer =  setInterval(draw, 1000); // call every 1000 milliseconds



var resetAnnyang=function(){
  console.log("Auto restrat of annyang")
  // annyang.pause();
  // annyang.resume();
  annyang.abort();
  // annyang.start();
}


var timer =  setInterval(resetAnnyang, 30*1000);

//mic feadabck
// navigator.getUserMedia = ( navigator.getUserMedia    || navigator.webkitGetUserMedia ||
//                            navigator.mozGetUserMedia ||navigator.msGetUserMedia);

// var aCtx;
// var analyser;
// var microphone;
// if (navigator.getUserMedia) {
//     navigator.getUserMedia({audio: true}, function(stream) {
//         aCtx = new webkitAudioContext();
//         analyser = aCtx.createAnalyser();
//         microphone = aCtx.createMediaStreamSource(stream);
//         microphone.connect(analyser);
//         analyser.connect(aCtx.destination);
//     });
// };
