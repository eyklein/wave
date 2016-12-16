
//feeling1






analizeTextInput = function(_text){
  
  var words=RiTa.tokenize(_text.toLowerCase());

  $('#mainDiv').innerHTML =_text;
  //var keyWordIndexContained=containsKeyWord(words);
  hist.resetLocal();
  hist.getMatchFirstCue(_text);
  


  // if(keyWordIndexContained){
    
  //   //println("play feeling");
  // }else{
  //   //println("didnt play feeling");
  // }
}
// containsKeyWord = function(_words){
  

//     if(findMatch(_words,keyWordsAngry,cueAngry)){}
//     else if(findMatch(_words,keyWordsHappy,cueHappy)){}
//     else if(findMatch(_words,keyWordsScared,cueScared)){}
//     else if(findMatch(_words,keyWordsSad,cueSad)){}  
//     else if(findMatch(_words,keyWordsFeel,cueFeel)){} 
    
  
//   return false;
// }  

// var findMatch = function(_words, _searchTerms, _cue){
//   //mainDiv.innerHTML =_words;
//   for(i=0; i<_words.length; i++){
//       console.log(_words[i]);
//       for(j=0;j<_searchTerms.length; j++){
//         if(_words[i] == _searchTerms[j]){
          
//           sendCue(_cue);
//           return true;
//         }
//       }
//     }
//     return false;
// }

var Histogram=function(arrayKeys){
  this.bins={};
  this.keys=arrayKeys;
  for(var i=0; i< arrayKeys.length; i++){
    // console.log(arrayKeys[i][0]);
    this.bins[arrayKeys[i][0]]=(new Bin(arrayKeys[i][0],arrayKeys[i][1],arrayKeys[i][2]));
  }
  this.resetLocal=function(){
    for(var key in this.bins){
      this.bins[key].resetLocal();
    }
  }
  this.resetLocal=function(){
    for(var key in this.bins){
      this.bins[key].resetLocal();
    }
  }
  
  this.getMatchFirstCue=function(_sentence){
    // console.log(_sentence+" &&&&");
    for(var key in this.bins){
      //console.log("?" + bin);
      //if(this.bins[key].keyWordInSentance(_sentence)){
      if(this.bins[key].keyPhraseInSentance(_sentence)){
          this.bins[key].addFrquency();
          speakReminder.setTime();
          if(!audioBlock.isBlocking){
            
            

            console.log("probobility fires at : " +this.bins[key].probability() +"%" )
            if(this.bins[key].sendToCueTrue()){
              sendCue(this.bins[key].cue, 300);
            }else if(Math.random()<.1){
              breathReminder.sendThisCue();
              breathReminder.setTime();
            }else{
              // sendCue(0.0, 300);
            }
          }else{

          }

          // console.log(this.bins[key].cue)
          return true;
      }
    }
  }
  this.myLog=function(){
    console.log(this.bins);
    for(var key in this.bins){
      console.log(this.bins[key].name +": "+this.bins[key].frequencyGlobal)
    }
  }


} 
var Bin=function(_name,_cue, _keyWords,_priority){
  this.name=_name;
  this.cue=_cue;
  this.keyWords=_keyWords;
  this.keyPhrases=_keyWords;
  this.frequencyGlobal=0;
  this.frequencyWeighted=0;//this could hold a wieghted value which gets smaller with time.
  this.frequencyLocal=0;
  this.priority=_priority;

  this.probability=function(){
    var prob =120/Math.sqrt(this.frequencyGlobal);
    console.log("Probabaility " + prob);
    return prob;
  }
  this.sendToCueTrue = function(){
    if(Math.random()*100<this.probability()){
      return true;
    }else{
      return false;
    }
  }

  this.addFrquency=function(){
    this.frequencyLocal++;
    this.frequencyGlobal++;
    buildBarChart(hist);
    //this.frequencyWeighted=this.frequencyWeighted/this.frequencyGlobal+1;
  }
  this.keyWordInSentance=function(_sentance){
    for(var i=0; i<this.keyWords.length;i++){
      if(_sentance.indexOf(this.keyWords[i])!=-1){
        return true;
      }
    }
    return false;
  }
  this.keyPhraseInSentance=function(_sentance){
    // console.log("Testing:")
    // console.log(this.keyPhrases)
    // console.log("with")
    // console.log(_sentance)
    
    for(var i=0; i<this.keyPhrases.length;i++){//number of phrases
      var wordsInPhrase=RiTa.tokenize(this.keyPhrases[i]);
      var indexLast=_sentance.indexOf(wordsInPhrase[0]);
      var trueForAllWordsInPhrase=true;
      if(indexLast!=-1){//test first word in phrase
        for(var j=1; j<wordsInPhrase.length;j++){//cicle through rest of words in phrase
          
          if(_sentance.indexOf(wordsInPhrase[j]) == _sentance.indexOf(" ",indexLast)+1){//check that they are the correct inedt
            indexLast=_sentance.indexOf(wordsInPhrase[j]);
          }else{
            trueForAllWordsInPhrase=false;
          }
        }
        if(trueForAllWordsInPhrase){//check after each phrase if it is still true if so its a match
          return true;
        }
        
      }else{
        trueForAllWordsInPhrase=false;
      }

      // if(i==this.keyPhrases.length-1){//check after each phrase if it is still true
      //   if(trueForAllWordsInPhrase){
      //     return true;
      //   }
      // }
    }
    // console.log(trueForAllWordsInPhrase)
    // console.log("******")
    return trueForAllWordsInPhrase;
  }
  // this.keyWordsInSentance=function(_sentance){
  //   for(var i=0; i<this.keyWords.length;i++){
  //     if(_sentance.indexOf(this.keyWords[i])!=-1){
  //       return true;
  //     }
  //   }
  //   return false;
  // }
  this.resetLocal=function(){
    this.frequencyLocal=0;
  }
}  



var cueSounds="0.0";
var keyWordsUncertainty=["not sure","unclear","what am I","what is this","I don't know","uncertain"];
var keyWordsNot=["not", "don't", "never", "no"];
var keyWordsAngry=["angry", "anger", "mad"];
var keyWordsScared=["scared", "afraid"];
var keyWordsHappy=["happy","joy","joyful"];
var keyWordsSad=["sad"];
var keyWordsDepressed=["depressed","depression"];
var keyWordsFrustrated=["frustrated","frustrate","frustrating"];
var keyWordsPeaceful=["peaceful","peace"];
var keyWordsRelaxed=["relaxed"];
var keyWordsCalm=["calm"];
var keyWordsAnxiety=["anxiety", "anxious"];
var keyWordsBugging=["bugging out", "bugging the f**"];
var keyWordsFreaking=["freaking out"];
var keyWordsClaustrophobic=["claustrophobic", "claustrophobia"];
var keyWordsPanic=["panic","panicked"]
var keyWordsLeave=["I want to leave", "I need to leave", "I need to stop", "I want to stop", "this needs to stop","I have to leave"]
var keyWordsFeel=["feel", "feeling", "feels"];





var hist=new Histogram([//is the order here reliable?
    ["uncertain",15.1,keyWordsUncertainty],
    ["not",0.0,keyWordsNot],
    ['depressed',0.0,keyWordsDepressed],
    ["angry",11.1,keyWordsAngry],
    ["scared",12.1,keyWordsScared],
    ["happy",13.1,keyWordsHappy],
    ["sad",14.1,keyWordsSad],
    ["uncertain",15.1,keyWordsUncertainty],
    ["frustrated",16.1,keyWordsFrustrated],
    ["peaceful", 19.1,keyWordsPeaceful],
    ["relaxed", 20.1,keyWordsRelaxed],
    ["anxious", 33.1,keyWordsAnxiety],
    ["bugging out", 34.1,keyWordsBugging],
    ["calm", 37.1,keyWordsCalm],
    ["claustrophobic", 39.1,keyWordsClaustrophobic],
    ["freaking out", 40.1,keyWordsFreaking],
    ["panic", 41.1,keyWordsPanic],
    ["leave",42.1,keyWordsLeave],
    ["feeling",10.1,keyWordsFeel]
    //["", ,keyWords],
    ]);