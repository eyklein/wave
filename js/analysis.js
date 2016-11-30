var keyWordsFeel=["feel", "feeling"];
var cueFeel="10.0";
var keyWordsAngry=["angry", "anger"];
var cueAngry="11.0";
var keyWordsScared=["scared"];
var cueScared="12.0";
var keyWordsHappy=["happy"];
var cueHappy="13.0";
var keyWordsSad=["sad"];
var cueSad="14.0";
var keyWordsUncertainty=["not sure"];
var cueUncertainty="20.0";
var keyWordsFrustrated=["frustrated"];
var cueFrustrated="21.0";
//feeling1






analizeTextInput = function(_text){
  var words=RiTa.tokenize(_text);

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
  for(var i=0; i< arrayKeys.length; i++){
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
      if(this.bins[key].keyWordInSentance(_sentence)){
          speakReminder.setTime();
          this.bins[key].addFrquency();

          sendCue(this.bins[key].cue, 300);

          // console.log(this.bins[key].cue)
          return true;
      }
    }
  }
  this.myLog=function(){
    console.log(this.bins);
    for(var key in this.bins){
      console.log(this.bins[key].name +": "+this.bins[key].frequencyGlobal)
      //console.log(key.name )
    }
    // for(var key in this.bins){
    //   //console.log("?" + bin);
    //   console.log(key.frequencyGlobal +"\t")
    // }
  }


} 
var Bin=function(_name,_cue, _keyWords,_priority){
  this.name=_name;
  this.cue=_cue;
  this.keyWords=_keyWords;
  this.frequencyGlobal=0;
  this.frequencyWeighted=0;//this could hold a wieghted value which gets smaller with time.
  this.frequencyLocal=0;
  this.priority=_priority;

  this.addFrquency=function(){
    this.frequencyLocal++;
    this.frequencyGlobal++;
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
  this.resetLocal=function(){
    this.frequencyLocal=0;
  }
}  

var hist=new Histogram([//is the order here reliable?
    
    ["angry",11.1,keyWordsAngry,1],
    ["scared",12.1,keyWordsScared,2],
    ["happy",13.1,keyWordsHappy,3],
    ["sad",14.1,keyWordsSad,4],
    ["feeling",10.1,keyWordsFeel,10],
    ["uncertain",20.1,keyWordsUncertainty,20],
    ["frustrated",21.1,keyWordsFrustrated,21]
    ]);