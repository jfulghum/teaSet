var attributes = {
  color: [0,1,2],
  backgroundColor: [0,1,2],
  shape: [0,1,2],
  count: [0,1,2]
}

var colors = ["red", "green", "blue"];

var deck = function(){
  deck = [];
  card = "";
  for (var i = 0; i < 3; i++){
    for( var j =0 ; j < 3; j++){
      for( var k =0 ; k < 3; k++){
          for( var l =0 ; l < 3; l++){
          card = "" + i + j + k + l;
          deck.push(card)
        }
      }
    }
  }
  return deck;
}

 console.log(deck())
