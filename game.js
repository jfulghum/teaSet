var attributes = {
  color: [0,1,2],
  backgroundColor: [0,1,2],
  shape: [0,1,2],
  count: [0,1,2]
}

var colors = ["red", "green", "blue"];
var bgcs = ["cyan", "yellow", "magenta"];

// var deck = function(){
//   myDeck = [];
//   for (var i = 0; i < Object.keys(attributes).length - 1; i++){
//     for( var j =0 ; j < Object.keys(attributes).length - 1; j++){
//       for( var k =0 ; k < Object.keys(attributes).length - 1; k++){
//           for( var l =0 ; l < Object.keys(attributes).length - 1; l++){
//           card = {};
//           card.color = attributes.color[i]
//           card.backgroundColor = attributes.backgroundColor[j]
//           card.shape = attributes.shape[k]
//           card.count = attributes.count[l]
//           myDeck.push(card)
//         }
//       }
//     }
//   }
//   return myDeck;
// }

// var board = function(){
//   var myboard = []
//   myDeck = deck()
//   for (var i = 0; i < 12; i++){
//     currentCard = myDeck[Math.floor(Math.random() * ((81 - myboard.length) - 0) + 0)]
//     myboard.push(myDeck.splice(currentCard, 1)[0])
//     myDeck.push(currentCard)
//   }
//   return myboard
// }
//

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

// function generateBoard(){
//   myBoard = board()
//   allCombos = getCombinations(myBoard, 3)
//   if (totalSets(allCombos) < 2){
//     console.log('hi')
//     return generateBoard();
//   }
//   return myBoard;
// }

function enoughCombosInHand(hand) {
  console.log(hand);
  var allCombos = getCombinations(hand, 3)
  console.log(allCombos);
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
      console.log("here");
    }
  } while (!enoughCombosInHand(hand));
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

function totalSets(allCombos){
  var count = 0
  for (var i = 0; i < allCombos.length; i++) {
    if (checkSet(allCombos[i])){
      count++
      console.log(count)
    }

  }
  return count
}

function checkSet(cards){
  for (var key in cards[0]){
    var checkArr = []
    checkArr.push(cards[0][key], cards[1][key], cards[2][key])
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



var gameState = {
  //board: generateBoard(),
  hand: deal(),
  gameOver: false,
  selectedCards: []
}

function init(state) {
  render(state);
}


function render(gameState){
  var wrapper = document.getElementsByClassName("wrapper");
  for (var i = 0; i < gameState.hand.length; i++) {
      var card = document.createElement("div");
      card.innerHTML = "BLA";
      card.className = "card"+ " number" +i
      card.style.backgroundColor = colors[+(gameState.hand[i][0])];
      card.style.color = bgcs[+(gameState.hand[i][1])];
      //card.setAttribute('style', 'background-color:' + currentColor);
      //card.setAttribute('style', 'color:' + bgcs[+(gameState.hand[i][1])]);
      wrapper[0].appendChild(card)
  }
  return wrapper
}

function createCards() {
  var card = document.createElement("div");
  // card.innerHTML =

}


init(gameState);
