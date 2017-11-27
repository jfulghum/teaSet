// var attributes = {
//   color: ['red', 'blue', 'yellow'],
//   backgroundColor: ['purple', 'turquoise', 'green'],
//   shape: ['square', 'circle', 'triangle'],
//   count: [1,2,3]
// }

var attributes = [['red', 'blue', 'yellow'], ['purple', 'turquoise', 'green'], ['square', 'circle', 'triangle'], [1,2,3] ]


function generateDeck(){
  var deck = []
  for (var i = 0; i < attributes.length; i++){
    debugger;
    var card = { color : "",
      backgroundColor: "",
      shape: "",
      count: 0
    }

    for (var j = 0; j < attributes[i].length; j++){
        card[color] = attributes[i][j];
      }

    }

  deck.push(card);
  }
  return deck;
}

var attributes = {
  color: ['red', 'blue', 'yellow'],
  backgroundColor: ['purple', 'turquoise', 'green'],
  shape: ['square', 'circle', 'triangle'],
  count: [1,2,3]
}

function generate(){
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

console.log(generate())


console.log(generateDeck())
