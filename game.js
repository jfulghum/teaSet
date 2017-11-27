var cards = [{
  'color': 'red',
  'count': 1
  'shape': 'ballet'
  'background': 'purple'
}, {
  'color': 'red',
  'count': 2
  'shape': 'boot'
  'background': 'purple'
}, {
  'color': 'red',
  'count': 3
  'shape': 'heel'
  'background': 'purple'
}];

function checkSet(cards){
  var checkArr = []
  for (var key in cards[0]){
    checkArr.push(cards[0][key], cards[1][key], cards[2][key])
    if uniqueOrSame(checkArr){
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
  field = createBoard();
}

function generateBoard(gameState){
  for (var i = 0; i < gameState.field.length; i++){

  }
}

console.log(checkSet(cards))
