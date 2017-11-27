var attributes = {
  color: ['red', 'blue', 'yellow'],
  backgroundColor: ['purple', 'turquoise', 'green'],
  shape: ['square', 'circle', 'triangle'],
  count: [1,2,3]
}

var deck = function(){
  myDeck = [];
  for (var i = 0; i < Object.keys(attributes).length - 1; i++){
    for( var j =0 ; j < Object.keys(attributes).length - 1; j++){
      for( var k =0 ; k < Object.keys(attributes).length - 1; k++){
          for( var l =0 ; l < Object.keys(attributes).length - 1; l++){
          card = {};
          card.color = attributes.color[i]
          card.backgroundColor = attributes.backgroundColor[j]
          card.shape = attributes.shape[k]
          card.count = attributes.count[l]
          myDeck.push(card)
        }
      }
    }
  }
  return myDeck;
}

var board = function(){
  var myboard = []
  myDeck = deck()
  for (var i = 0; i < 12; i++){
    currentCard = myDeck[Math.floor(Math.random() * ((81 - myboard.length) - 0) + 0)]
    myboard.push(myDeck.splice(currentCard, 1)[0])
    myDeck.push(currentCard)
  }
  return myboard
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

function generateBoard(){
  myBoard = board()
  allCombos = getCombinations(myBoard, 3)
  if (totalSets(allCombos) < 2){
    console.log('hi')
    return generateBoard();
  }
  return myBoard;
}

var gameState = {
  board: generateBoard(),
  gameOver: false,
  selectedCards: []
}

function init(state) {

  render(state);
}


function render(gameState){
  var wrapper = document.getElementsByClassName("wrapper");
  for (var i = 0; i < gameState.board.length; i++) {
      var card = document.createElement("div")
      card.className = "card"+ " number" +i
      var currentColor = gameState.board[i].backgroundColor;
      card.setAttribute('style', 'background-color:' + currentColor);
      wrapper[0].appendChild(card)
  }
  return wrapper
}

function createCards() {
  var card = document.createElement("div");
  // card.innerHTML =

}


init(gameState);
