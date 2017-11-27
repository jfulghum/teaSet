var attributes = {
  color: ['red', 'blue', 'yellow'],
  backgroundColor: ['purple', 'turquoise', 'green'],
  shape: ['square', 'circle', 'triangle'],
  count: [1,2,3]
}

var deck = function(){
  deck = [];
  for (var i = 0; i < Object.keys(attributes).length - 1; i++){
    for( var j =0 ; j < Object.keys(attributes).length - 1; j++){
      for( var k =0 ; k < Object.keys(attributes).length - 1; k++){
          for( var l =0 ; l < Object.keys(attributes).length - 1; l++){
          card = {};
          card.color = attributes.color[i]
          card.backgroundColor = attributes.backgroundColor[j]
          card.shape = attributes.shape[k]
          card.count = attributes.count[l]
          deck.push(card)
        }
      }
    }
  }
  return deck;
}

var board = function(){
  var board = []
  for (var i = 0; i < 12; i++){
    currentCard = deck[Math.floor(Math.random() * ((81 - board.length) - 0) + 0)]
    board.push(deck.splice(currentCard, 1))
    deck.push(currentCard)
  }
  return board
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




deck()
console.log(board())
