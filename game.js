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
    totalFound: 0,
    setStatus: ""
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
  console.log(totalSets(hand))
  console.log(totalSets(allCombos))
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
// #1A2930 "#E9C893"
// "#3CC47C"
var bgcs = ["#C0B283", "#1A2930" , "#49274a" ];
// var bgcs = ["#FEDCD2", "#DF744A", "#DCB239"]
// var bgcs = ["#5856d6", "#ff3b30", "4cd964"]
var colors = ["#ff2d55", "#fcd964", "ffcc00"]
// var colors = ["#94618e", "#49274a", "#f4decb"]
// var colors = ["#9900ff", "#339999", "#45cea2"];
// var colors = ["red", "blue", "purple"]


function render(gameState){
  for (var i = 0; i < gameState.hand.length; i++) {
    var wrapper = document.getElementsByClassName("wrapper");
    var circle = document.createElement("i")
    circle.className = "fa fa-circle"
    circle.setAttribute("aria-hidden", "true")

    var cup = document.createElement("i")
    cup.className = "fa fa-coffee"
    cup.setAttribute("aria-hidden", "true")

    var spoon = document.createElement("i")
    spoon.className = "fa fa-spoon"
    spoon.setAttribute("aria-hidden", "true")

    var circle2 = document.createElement("i")
    circle2.className = "fa fa-circle"
    circle2.setAttribute("aria-hidden", "true")

    var cup2 = document.createElement("i")
    cup2.className = "fa fa-coffee"
    cup2.setAttribute("aria-hidden", "true")

    var spoon2 = document.createElement("i")
    spoon2.className = "fa fa-spoon"
    spoon2.setAttribute("aria-hidden", "true")

    var circle3 = document.createElement("i")
    circle3.className = "fa fa-circle"
    circle3.setAttribute("aria-hidden", "true")

    var cup3 = document.createElement("i")
    cup3.className = "fa fa-coffee"
    cup3.setAttribute("aria-hidden", "true")

    var spoon3 = document.createElement("i")
    spoon3.className = "fa fa-spoon"
    spoon3.setAttribute("aria-hidden", "true")

    var shape = [circle, cup, spoon]
    var shape2 = [circle2, cup2, spoon2]
    var shape3 = [circle3, cup3, spoon3]

    console.log(shape)
      var card = document.createElement("div");
      card.className = "card"+ " number" + gameState.hand[i]
      card.style.backgroundColor = bgcs[+(gameState.hand[i][0])];
      card.style.color = colors[+(gameState.hand[i][1])];
      if ( +(gameState.hand[i][3]) == 0){
          card.appendChild(shape[+(gameState.hand[i][2])])
      } else if ( +(gameState.hand[i][3]) == 1) {
        card.appendChild(shape[+(gameState.hand[i][2])])
        card.appendChild(shape2[+(gameState.hand[i][2])]) //.repeat(+(gameState.hand[i][3]) + 1);
      } else {
        card.appendChild(shape[+(gameState.hand[i][2])])
        card.appendChild(shape2[+(gameState.hand[i][2])])
        card.appendChild(shape3[+(gameState.hand[i][2])])
      }
      card.setAttribute("onClick", "addToSet(this)")

      wrapper[0].appendChild(card)
  }
  renderTotal()
  return wrapper
}


function renderTotal(){
  var total = document.getElementById("total")
  total.innerHTML = "You've found " + gameState.totalFound +" of " + totalSets(getCombinations(gameState.hand, 3)) + " sets"
  // var result = document.getElementById("result")
  // result.innerHTML = setStatus // Not a set, You already found that set
}

function addToSet(card){
  var currentCard = card.className.slice(card.className.length - 4);
  if (gameState.selectedCards.length < 3 && (!gameState.selectedCards.includes(currentCard))){
      gameState.selectedCards.push(currentCard);
  }
  if (gameState.selectedCards.length === 3){
    if (checkSet(gameState.selectedCards)){
      compareFoundSets(gameState.selectedCards)
    } else {
      setStatus = "Not a set"
      console.log("not a set")
    }
  gameState.selectedCards =[]

  }
  console.log(gameState.selectedCards)
  // console.log(createAnswer(gameState.hand))
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

  } else {
      gameState.setsFoundArray.push(JSON.stringify(gameState.selectedCards.sort()))
      gameState.totalFound ++
      checkWin()
      renderTotal()
  }
}
//Q's for Mike
//We were trying to build totalFound inside of deal()...
//but whenever we were trying to run a function inside of gamestate that wasn't deal
//..it was saying the name was was undefined
//We want to be able to console.log the answers. All true set combos of hand.
//Calling totalSet(hand) vs. totalSet(getCombinations(hand)) ??
// Creating Cards?

function addToCount(hand) {
  gameState.totalFoundSets += totalSets(getCombinations(hand, 3));
  console.log(gameState)
}

// TODO
// Unclick - when someone clicks same card, unselect remove from selectedCards
// Render Set Status - Not a set, You already found that set. That's a set!
// CSS cleanup - center the cards etc
// Instructions
// Teacups, spoons, kettle?
// SVG? SVG image element research
// Build TBD # of cards with photoshop
// the BIG WIN! teacups everywhere!:)



//DONE
//if someone clicks same card twice - don't add - done!
// checks set when selectedCards.length equals 3 - done!
//set gets reset to 0 when selectedCards reaches 3 - done!
//

init(gameState);
