var deck = [
  '0000',
  '0001',
  '0002',
  '0010',
  '0011',
  '0012',
  '0020',
  '0021',
  '0022',
  '0100',
  '0101',
  '0102',
  '0110',
  '0111',
  '0112',
  '0120',
  '0121',
  '0122',
  '0200',
  '0201',
  '0202',
  '0210',
  '0211',
  '0212',
  '0220',
  '0221',
  '0222',
  '1000',
  '1001',
  '1002',
  '1010',
  '1011',
  '1012',
  '1020',
  '1021',
  '1022',
  '1100',
  '1101',
  '1102',
  '1110',
  '1111',
  '1112',
  '1120',
  '1121',
  '1122',
  '1200',
  '1201',
  '1202',
  '1210',
  '1211',
  '1212',
  '1220',
  '1221',
  '1222',
  '2000',
  '2001',
  '2002',
  '2010',
  '2011',
  '2012',
  '2020',
  '2021',
  '2022',
  '2100',
  '2101',
  '2102',
  '2110',
  '2111',
  '2112',
  '2120',
  '2121',
  '2122',
  '2200',
  '2201',
  '2202',
  '2210',
  '2211',
  '2212',
  '2220',
  '2221',
  '2222' ]

var attrs = {
  BGC: 0,
  COLOR: 1,
  SHAPE: 2,
  COUNT: 3
}

var gameState = {
  hand: [],
  gameOver: false,
  selectedCards: [],
  setsFoundArray:[],
  totalFound: 0,
  setStatus: "",
  answers: []
}

function init(state) {
  gameState.hand = deal();
  render(state);
}

var bgcs = ["#C0B283", "#1A2930" , "#49274a"]
var colors = ["#ff2d55", "#fcd964", "ffcc00"]
var shapes = ["fa-circle", "fa-coffee", "fa-spoon"]

function render(gameState){
  for (var i = 0; i < gameState.hand.length; i++) {
    var wrapper = document.querySelector(".wrapper");

    var card = document.createElement("div");
    renderCard(card, gameState, i)
    wrapper.appendChild(card)
  }
  renderTotal()
  return wrapper
}

function renderCard(card, gameState, cardNumber){
  var cardData = gameState.hand[cardNumber];
  card.className = "card"+ " number " + cardData
  card.style.backgroundColor = bgcs[+(cardData[attrs.BGC])];
  card.style.color = colors[+(cardData[attrs.COLOR])];
  var icon = document.createElement(i);
  icon.className = "fa " + shapes[+(cardData[attrs.SHAPE])];
  for (var i = 0; i < +(cardData[attrs.COUNT]) + 1; i++){
    card.appendChild(icon.cloneNode());
  }
  card.setAttribute("onClick", "addToSet(this)")
}

function renderTotal(){
  var total = document.getElementById("total")
  total.innerHTML = "You've found " + gameState.totalFound +" of " + totalSets(getCombinations(gameState.hand, 3)) + " sets"
  var result = document.getElementById("result")
  result.innerHTML = gameState.setStatus // Not a set, You already found that set
}


function deal() {
  var hand = []
  do {
    hand = [];
    while (hand.length < 12){
      var nextCard = deck[Math.floor(Math.random() * deck.length)];
      if (hand.indexOf(nextCard) === -1){
        hand.push(nextCard)
      }
    }
  } while (!enoughSets(hand));
  return hand;
}

function enoughSets(hand) {
  var allCombos = getCombinations(hand, 3)
  if (totalSets(allCombos) < 2){
    return false;
  }
  return true;
}

function getCombinations(array, length) {
    function fork(i, t) {                   // recursive fn with index & temp array
        if (t.length === length) {          // check temp length
            result.push(t);                 // push collected values
            return;                         // exit function
        }
        if (i === array.length) {           // check if index is out of range
            return;                         // exit function
        }
        fork(i + 1, t.concat([array[i]]));  // call for with a new letter from index
        fork(i + 1, t);                     // call for without a new letter
    }
    var result = [];                        // for keeping the part results
    fork(0, []);                            // start with index zero and empty temp array
    return result;                          // return result
}

function totalSets(combos){
  var count = 0;
  console.log("gameState", gameState);
  gameState.answers.length = 0;
  for (var i = 0; i < combos.length; i++) {
    if (checkSet(combos[i])){
      gameState.answers.push(combos[i])

      count++
    }
  }
  return count
}

function checkSet(cards){
  var answers = []
  if (cards.length !== 3){
    throw new Error("You may only have a set of 3 cards");
  }
  for (var i in cards[0]){
    var checkArr = []
    checkArr.push(cards[0][i], cards[1][i], cards[2][i])
    if (!uniqueOrSame(checkArr)){
      return false;
    }
  }
  return true;
}

function uniqueOrSame(checkArr){
  var newArr = []
  for(var i =0; i <checkArr.length; i++){
    if (newArr.indexOf(checkArr[i]) < 0){
      newArr.push(checkArr[i]);
    }
  }
  if ((newArr.length === checkArr.length) || (newArr.length === 1)){
    return true;
  }
  return false;
}

function addToSet(card){
  var currentCard = card.className.slice(card.className.length - 4);
  if (gameState.selectedCards.length < 3 && (!gameState.selectedCards.includes(currentCard))){
      // var selectedCard = document.getElementsByClassName("card number " + currentCard);
      // console.log(selectedCard)
      // $(selectedCard)
      // .animate({'left':(-10)+'px'},200)
      // .animate({'left':(+20)+'px'},200)
      // .animate({'left':(-10)+'px'},200);
      gameState.selectedCards.push(currentCard);
  }
  if (gameState.selectedCards.length === 3){
    if (checkSet(gameState.selectedCards)){
      //This is where the correct Set animation should go
      var selectedCards
      compareFoundSets(gameState.selectedCards)
    } else {
      var result = document.getElementById("result")
      result.innerHTML = "Not a set"
    }
  gameState.selectedCards =[]

  }
  console.log(gameState.selectedCards)
}

function checkWin(){
  if (totalSets(getCombinations(gameState.hand, 3)) === gameState.totalFound){
    console.log("You found all the sets!")
    gameState.gameOver = true
  }
}

function compareFoundSets(selectedCards){
  var ourCards = JSON.stringify(selectedCards.sort())
  if (gameState.setsFoundArray.includes(ourCards)){
      console.log("you found that set")
      var result = document.getElementById("result")
      result.innerHTML = "You've already found that set"
  } else {
      gameState.setsFoundArray.push(JSON.stringify(gameState.selectedCards.sort()))
      gameState.totalFound ++
      checkWin()
      renderTotal()
  }
}

function addToCount(hand) {
  gameState.totalFoundSets += totalSets(getCombinations(hand, 3));
  console.log(gameState)
}

// TODO
// Unclick - when someone clicks same card, unselect remove from selectedCards
// Render Set Status - Not a set, You already found that set. That's a set!
// CSS cleanup - center the cards etc
// Instructions
// Build TBD # of cards with photoshop
// the BIG WIN! teacups everywhere!:)


//DONE
//if someone clicks same card twice - don't add - done!
// checks set when selectedCards.length equals 3 - done!
//set gets reset to 0 when selectedCards reaches 3 - done!
//

init(gameState);
