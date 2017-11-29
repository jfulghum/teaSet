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

  var gameState = {
    hand: deal(),
    gameOver: false,
    selectedCards: [],
    setsFoundArray:[],
    totalFound: 0
  }



function enoughSets(hand) {
  var allCombos = getCombinations(hand, 3)
  if (totalSets(allCombos) < 2){
    return false;
  }
  return true;
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
  var count = 0
  for (var i = 0; i < combos.length; i++) {
    if (checkSet(combos[i])){
      count++
    }
  }
  return count
}

function checkSet(cards){
  var answers = []
  if (cards.length !== 3){
    return false;
  }
  for (var i in cards[0]){
    var checkArr = []
    checkArr.push(cards[0][i], cards[1][i], cards[2][i])
    if (!uniqueOrSame(checkArr)){
      return false;
    }
  }
  // answers.push(cards)
  return true;
}

function createAnswer(cards){
  var answers = []
  for (var i in cards[0]){
    var checkArr = []
    checkArr.push(cards[0][i], cards[1][i], cards[2][i])
    if (!uniqueOrSame(checkArr)){
      return false;
    }
  }
  answers.push(cards)
  return answers
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



function init(state) {
  render(state);
}

var colors = ["#9900ff", "#339999", "#45cea2"];
var bgcs = ["cyan", "#ff0066", "magenta"];
var shape = ["&", "%", "$"];

function render(gameState){
  var wrapper = document.getElementsByClassName("wrapper");
  for (var i = 0; i < gameState.hand.length; i++) {
      var card = document.createElement("div");
      card.className = "card"+ " number" + gameState.hand[i]
      card.style.backgroundColor = colors[+(gameState.hand[i][0])];
      card.style.color = bgcs[+(gameState.hand[i][1])];
      card.innerHTML = shape[+(gameState.hand[i][2])].repeat(+(gameState.hand[i][3]) + 1);
      card.setAttribute("onClick", "addToSet(this)")
      wrapper[0].appendChild(card)
  }
  renderTotal()
  return wrapper
}


function renderTotal(){
var total = document.getElementById("total")
//TODO never call totalSets on hand
total.innerHTML = "You found " + gameState.totalFound +" of " + totalSets(getCombinations(gameState.hand, 3)) + " sets"
}
var currentTotal = 0;
function addToSet(card){
  var currentCard = card.className.slice(card.className.length - 4);
  if (gameState.selectedCards.length < 3 && (!gameState.selectedCards.includes(currentCard))){
      gameState.selectedCards.push(currentCard);
  }
  if (gameState.selectedCards.length === 3){
    if (checkSet(gameState.selectedCards)){
      compareFoundSets(gameState.selectedCards)
    } else {
      console.log("not a set")
    }
  gameState.selectedCards =[]

  }
  console.log(gameState.selectedCards)
  console.log(createAnswer(gameState.hand))
}



function checkWin(){
  //TODO never call totalSets on hand
  if (totalSets(getCombinations(gameState.hand, 3)) === gameState.totalFound){
    console.log("You found all the sets!")
    gameState.gameOver = true
  }
}

function compareFoundSets(selectedCards){
  var ourCards = JSON.stringify(selectedCards.sort())
  if (gameState.setsFoundArray.includes(ourCards)){
      console.log("you found that set")

  } else {
      gameState.setsFoundArray.push(JSON.stringify(gameState.selectedCards.sort()))
      gameState.totalFound ++
      checkWin()
      renderTotal()
  }
}

function addToCount(hand) {
  gameState.totalFoundSets += totalSets(getCombinations(hand, 3 ));
  console.log(gameState)
}

//if someone clicks same card twice - don't add
// checks set when selectedCards.length equals 3
//set gets reset to 0 when selectedCards reaches 3

init(gameState);
