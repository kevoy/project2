var card1, card2 = null;
var pairsFound = 0;
var turns = 24;
var audioElement,audioElement2,audioElement3;
var name = null;
window.onload = function(){
  if(!savePresent()){
    loadEvents();
    start();
  }else{
    hideNameBox();
    alert('*************\nThe game will continue from last state\n ->Player Name: '+JSON.parse(localStorage.name)+'\n*************');
    loadEvents();
    loadSaveData();
  }
  
}
var createDeck = function() {
// based on code from http://www.brainjar.com/js/cards/default2.asp
  var ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9",
                        "10", "J", "Q", "K"];
  var suits = ["C", "D", "H", "S"];
  var j, k, index=0;
  var pack_size;

  // Set array of cards.
  // total number of cards
  pack_size = ranks.length * suits.length;
  var cards = [];
  

  // Fill the array with 'n' packs of cards.
  while (index < pack_size){
    for (j = 0; j < suits.length; j++){
       for (k = 0; k < ranks.length; k++){
          console.log("k:",k,"index:",index);
          cards[index] = {rank:ranks[k], suite:suits[j]};
          index++;
          }
       }
    }
  console.log(cards.length);
  return cards;
}
var showCards = function(cardJSON) {
txt = cardJSON.rank + cardJSON.suite;
cardHolder =  document.createElement("div");
cardHolder.className = "cardHolder";
cardBack =  document.createElement("div");   
cardBack.className = "cardBack";
cardBack.textContent="❁";
card = document.createElement("p");
card.textContent = txt;
card.className = "card";
console.log(card);
cardHolder.onclick = checkCards;
document.querySelector(".sideBox").appendChild(cardHolder);
cardHolder.appendChild(card);
cardHolder.appendChild(cardBack);
}

var showDeck = function(deck){
    var idx;
    for (idx = 0; idx < deck.length; ++idx) {
            console.log("so far, so good",deck[idx]);
            showCards(deck[idx]);
    }
}

function getPairs(){
    var deck = createDeck();
    var newDeck = [];
    for(var i=0; i<8; i++){
        newDeck[i] = deck[Math.floor((Math.random()*(deck.length-1))+0)];
        newDeck[8+i] = newDeck[i];
        
    }
    return newDeck;
}

function checkCards(){
   
    if(card1 == null){
        card1 = this;
        setInvisible(this);
    }else if(card1 != null && card2==null){
        card2= this;   
        setInvisible(this);
        compareCards();
    }else if(card1 !=null && card2 !=null){
        setVisible();
        card1=this;
        setInvisible(this);
        card2=null;
    }
     audioElement2.load();
    audioElement2.play();
        
}
function compareCards(){
    var card1Txt = card1.querySelector(".card").innerHTML;
    var card2Txt = card2.querySelector(".card").innerHTML;    
    if(card1Txt == card2Txt){
        pairsFound += 1;
        card1 = null;
        card2 = null;
        audioElement.load();
        audioElement.play();

    }else{
        
        reduceTurns();
                
    }
    if(pairsFound>=8){
      audioElement3.load();
        audioElement3.play();
        //alert("I made u win :)");   
    }
   
}
function reduceTurns(){
    if(turns <= 1){
        alert('Sigh...You Lose');
        start();
    }else{
        turns -=1;
    }
}
function setVisible(){
    card1.querySelector(".cardBack").className ="cardBack visible";
    card2.querySelector(".cardBack").className ="cardBack visible";
    card1.querySelector(".card").className ="card";
    card2.querySelector(".card").className ="card";
}
function setInvisible(card){
    card.querySelector(".cardBack").className ="cardBack invisible";
    card.querySelector(".card").className ="card cardVisible";
}
function randomizePairs(){
    var deck = getPairs();
    var indx=0;
    var pair1, pair2=0;
    for(var i=0; i<8; i++){
        indx = Math.floor((Math.random()*(deck.length-1))+0);
        pair1 = deck[i];
        pair2 = deck[indx];
        deck[i]=pair2;
        deck[indx]=pair1;
        
    }
    return deck;
}
function loadEvents(){
    document.querySelector("#colorTab").onclick = showColors;
    document.querySelector("#symbolTab").onclick = showSymbols;
    
    //colors events and symbols events
    for(var i=1; i<=5; i++){
         document.querySelector('#c'+i).onclick = changeColor;
         document.querySelector('.s'+i).onclick = changeSymbol;
    }
    var nameBox = document.querySelector('#playerName');
    nameBox.addEventListener('keypress', addName);
    var saveBtn = document.querySelector('#saveBox');
    saveBtn.onclick = saveGame;
}
function addName(e){
  if(e.keyCode === 13){
    name = document.querySelector('#playerName').value;
    //alert(name);
    hideNameBox();
  }
}
function hideNameBox(){
  document.querySelector('#player').style.display = 'none';
}
function saveGame(){
  this.style.backgroundColor = 'green';
  localStorage.name = JSON.stringify(name);
  localStorage.turns = JSON.stringify(turns);
  localStorage.pairsFound = JSON.stringify(pairsFound);
  //var card1Default = card1;
  //var card2Default = card2;
  if(card1!=null){
    card1.querySelector(".cardBack").className ="cardBack visible";
    card1.querySelector(".card").className ="card";
  }
  if(card2!=null){
    card2.querySelector(".cardBack").className ="cardBack visible";
    card2.querySelector(".card").className ="card";
  }
  localStorage.cardData = JSON.stringify(document.getElementsByClassName('sideBox')[0].innerHTML);

  card1 = null;
  card2 = null;

}
function savePresent(){
  if(!localStorage.cardData){

    return false;
  }
  return true;
}
function loadSaveData(){
  card1, card2 = null;
  audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'http://soundcli.ps/download/1176.mp3');
    audioElement2 = document.createElement('audio');
    audioElement2.setAttribute('src', 'page-flip-01a.wav');
    audioElement3 = document.createElement('audio');
    audioElement3.setAttribute('src', 'Ta Da-SoundBible.com-1884170640.wav');
  name = JSON.parse(localStorage.name);
  turns = JSON.parse(localStorage.turns);
  pairsFound = JSON.parse(localStorage.pairsFound);
  var cardData =JSON.parse(localStorage.cardData);
  document.getElementsByClassName('sideBox')[0].innerHTML = cardData;
  //console.log(document.getElementsByClassName('sideBox')[0].getElementsByClassName('cardHolder')[0]);
  var cardHolders = document.getElementsByClassName('sideBox')[0].getElementsByClassName('cardHolder');
  for(var i=0; i<cardHolders.length; i++){
    cardHolders[i].onclick = checkCards;
  }

}
function changeSymbol(){
    var newSymbol = this.textContent;
    var cards = document.getElementsByClassName('cardBack');
    //alert(cards);
    for(var i=0; i<cards.length; i++){
        cards[i].textContent = newSymbol;
    }    
}
function changeColor(){
    var newColor = 
        window.getComputedStyle(this, null).backgroundColor;
    var cards = document.getElementsByClassName('cardBack');
    //alert(cards);
    for(var i=0; i<cards.length; i++){
        cards[i].style.backgroundColor = newColor;
    }
}
function showColors(){
    document.querySelector("#colors").style.display = 'inline-block';
    document.querySelector("#symbols").style.display = 'none';
}
function showSymbols(){
    document.querySelector("#symbols").style.display = 'inline-block';
    document.querySelector("#colors").style.display = 'none';
}
function start(){
    card1, card2 = null;
    pairsFound = 0;
    turns = 24;
    audioElement = document.createElement('audio');
    audioElement.setAttribute('src', 'static/short-drum-roll.mp3');
    audioElement2 = document.createElement('audio');
    audioElement2.setAttribute('src', 'static/page-flip-01a.wav');
    audioElement3 = document.createElement('audio');
    audioElement3.setAttribute('src', 'static/Ta Da-SoundBible.com-1884170640.wav');
  document.querySelector(".sideBox").innerHTML = "";
  var deck = randomizePairs();
  showDeck(deck);
}

