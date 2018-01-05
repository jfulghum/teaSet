

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
  card.style.backgroundImage = bgcs[+(cardData[attrs.BGC])];
  var icon = document.createElement("div");
  icon.className = colors[+(cardData[attrs.COLOR])] + "_" + shapes[+(cardData[attrs.SHAPE])] + " icon";
  for (var i = 0; i < +(cardData[attrs.COUNT]) + 1; i++){
    card.appendChild(icon.cloneNode());
  }
  card.setAttribute("onClick", "addToSet(this)")
}

var bgcs = ["url('./assets/yellowWatercolor.jpg')",
 "url('./assets/greenWatercolor.jpg')" ,
 "url('./assets/purpleWatercolor.jpg')" ]
var colors = ["green", "red" , "purple" ]
var shapes = ["cup", "kettle", "spoon"]


function renderTotal(){
  var total = document.getElementById("total")
  total.innerHTML = "You've found " + gameState.totalFound +" of "
  + totalSets(getCombinations(gameState.hand, 3)) + " sets"
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

function init(state) {
  gameState.hand = deal();
  render(state);
}

function addToSet(card){
  var currentCard = card.className.slice(card.className.length - 4);
  if (gameState.selectedCards.length < 3 && (!gameState.selectedCards.includes(currentCard))){
      var selectedCard = document.getElementsByClassName("card number " + currentCard);
      var cardClass = selectedCard[0].className;
      TweenMax.to(selectedCard, .3, {
        opacity: .5,
        y: '-=10'
      } )

      gameState.selectedCards.push(currentCard);
  }
  if (gameState.selectedCards.length === 3){
    if (checkSet(gameState.selectedCards)){
      for (var i = 0; i < gameState.selectedCards.length; i++) {
        var selectedCard = document.getElementsByClassName("card number " + gameState.selectedCards[i]);
        var cardClass = selectedCard[0].className;
        var timeline = new TimelineMax();

        timeline.to(selectedCard, 1, {
          rotation: -360,
          opacity: 1,
          scale: 1.25,
          ease: Back.easeOut
        })
        .to(selectedCard, 1, {
          rotation: 0,
          scale: 1,
          y: '+=10',
          delay: .2
        })
      }
      compareFoundSets(gameState.selectedCards)
    } else {
      // gameState.setStatus = "Not a set"
      // TODO sometimes when it IS a set, it says Not a Set. need to fix this. Commented out for now.
      for (var i = 0; i < gameState.selectedCards.length; i++) {
        var selectedCard = document.getElementsByClassName("card number " + gameState.selectedCards[i]);
        var cardClass = selectedCard[0].className;
        console.log("this card's class:", cardClass);
        var tl = new TimelineMax();
        console.log(tl)
        tl.to(selectedCard, .1, {
          x: "+=10",
          delay: .3
        })
        .to(selectedCard, .1, {
          x: "-=20"
        })
        tl.to(selectedCard, .1, {
          x: "+=20"
        })
        .to(selectedCard, .1, {
          x: "-=10",
          ease: Back.easeOut
        })
        .to(selectedCard, 2, {
          opacity: 1,
          y: "+=10",
          ease: Bounce.easeOut
        })
      }
    }
  gameState.selectedCards =[]
  }
}

function checkWin(){
  if (totalSets(getCombinations(gameState.hand, 3)) === gameState.totalFound){
    gameState.setStatus = "You found all the sets!"
    gameState.gameOver = true
  }
}

function compareFoundSets(selectedCards){
  var ourCards = JSON.stringify(selectedCards.sort())
  if (gameState.setsFoundArray.includes(ourCards)){
      var result = document.getElementById("result")
      result.innerHTML = "You've already found that set"
      setTimeout(function(){
        fade(document.querySelector("#result"))
      }, 1000);
  } else {
      gameState.setsFoundArray.push(JSON.stringify(gameState.selectedCards.sort()))
      gameState.totalFound ++
      checkWin()
      renderTotal()
  }
}

function fade(element) {
    var op = 1;
    var timer = setInterval(function () {
        if (op <= 0.1){
            clearInterval(timer);
            result.innerHTML = ""
        }
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.2;
    }, 50);
}

function addToCount(hand) {
  gameState.totalFoundSets += totalSets(getCombinations(hand, 3));
}

function getAnswers() {
  var answers = gameState.answers
  for (var i = 0; i < answers.length; i++){
    for (var j = 0; j < answers[i].length; j++){
      var card = document.getElementsByClassName(answers[i][j])
      console.log("Set " + (i+1) + ":", card[0])
    }
  }
}

function shake(element, shakes, speed){
	var tl = new TimelineLite();
	TweenLite.set(element, {x:"+=0"}); // this creates a full _gsTransform on element
	var transforms = element._gsTransform;
  console.log(transforms)

  //store the transform values that exist before the shake so we can return to them later
  var initProps = {
  	x:transforms.x,
    y:transforms.y,
    rotation:transforms.rotation
	}
  //shake a bunch of times
  for(var i = 0; i < shakes; i++){
		tl.to(element, speed ,{x:initProps.x + R(-4,4), y:initProps.y + R(-2,2), rotation:initProps.rotation + R(-5,5)})
  }
  //return to pre-shake values
  tl.to(element, speed ,{x:initProps.x, y:initProps.y, scale:initProps.scale, rotation:initProps.rotation})

  return tl;

};

// TODO
// Unclick - when someone clicks same card, unselect remove from selectedCards
// CSS cleanup - center the cards etc
// the BIG WIN! teacups everywhere!:)

//DONE
//if someone clicks same card twice - don't add - done!
// checks set when selectedCards.length equals 3 - done!
//set gets reset to 0 when selectedCards reaches 3 - done!
//

init(gameState);
