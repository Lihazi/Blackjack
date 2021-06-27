let blackJackGame = {
    "you": { "scoreSpan": "#your-points", 'div': "#your-box", "score": 0 },
    "dealer": { "scoreSpan": "#dealer-points", 'div': "#dealer-box", "score": 0 },
    "cards": ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
    "cardsPoint": { '2': 2, '3': 3, '4': 4, '5': 5, "6": 6, '7': 7, "8": 8, "9": 9, "10": 10, "J": 10, "Q": 10, "K": 10, "A": [1, 11] },
    "wins": 0,
    "losses": 0,
    "draws": 0,
}

var YOU = blackJackGame.you;
var DEALER = blackJackGame.dealer;
const hitSound = new Audio("swish.m4a")
const winningSound = new Audio("cash.mp3")
const losingSound = new Audio("aww.mp3")


document.querySelector("#blackjack-hit-button").addEventListener("click", blackjackHit);

document.querySelector("#blackjack-stand-button").addEventListener("click", dealerLogic);


document.querySelector("#blackjack-deal-button").addEventListener("click", blackjackDeal);


document.querySelector("#blackjack-stand-button").disabled = true;

document.querySelector("#blackjack-deal-button").disabled = true;


function blackjackHit() {
    let card = randomCard();
    showCard(card, YOU);
    updateScore(YOU, card);
    showPoints(YOU)
    document.querySelector("#blackjack-stand-button").disabled = false;

}

function randomCard() {
    let randomIndex = Math.floor(Math.random() * 13);
    return blackJackGame['cards'][randomIndex]
}


function showCard(card, activePlayer) {
    if (activePlayer["score"] <= 21) {
        let cardImage = document.createElement("img");
        cardImage.style.width = "22%"

        cardImage.style.paddingLeft = "2%"
        cardImage.style.paddingBottom = "2%"
        cardImage.src = `${card}.png`
        document.querySelector(activePlayer['div']).appendChild(cardImage)
        hitSound.play();
    }
}





function updateScore(activePlayer, card) {
    if (card === "A") {
        if (activePlayer["score"] + blackJackGame["cardsPoint"][card][1] <= 21) {
            activePlayer["score"] += blackJackGame["cardsPoint"][card][1];
        }
        else {
            activePlayer["score"] += blackJackGame["cardsPoint"][card][0]
        }
    } else {
        activePlayer["score"] += blackJackGame["cardsPoint"][card]
    }


}

function showPoints(activePlayer) {
    if (activePlayer["score"] > 21) {
        document.querySelector(activePlayer["scoreSpan"]).textContent = "BUST"
        document.querySelector(activePlayer["scoreSpan"]).style.color = "red"
    }
    else {
        document.querySelector(activePlayer["scoreSpan"]).textContent = activePlayer["score"]
    }
}




function blackjackDeal() {
    //let winner = computeWinner()
    //showResult(winner)

    //another way to doing the same thing which is showing the winner is:
    //showresult(computewinner())  **this a great lesson what i learn from here 

    let yourImages = document.querySelector("#your-box").querySelectorAll("img");

    let dealerImages = document.querySelector("#dealer-box").querySelectorAll("img");


    for (var i = 0; i < yourImages.length; i++) {
        yourImages[i].remove();
    }

    for (var i = 0; i < dealerImages.length; i++) {
        dealerImages[i].remove();
    }

    YOU["score"] = 0;
    DEALER["score"] = 0;


    document.querySelector("#your-points").textContent = 0;
    document.querySelector("#your-points").style.color = "white";

    document.querySelector("#dealer-points").textContent = 0;
    document.querySelector("#dealer-points").style.color = "white";

    document.querySelector("#blackjack-stand-button").disabled = false;
    document.querySelector("#blackjack-hit-button").disabled = false;

    document.querySelector('#Blackjack-result').textContent = "Let's play"
    document.querySelector('#Blackjack-result').style.color = "black"

    document.querySelector("#blackjack-stand-button").disabled = true;

    document.querySelector("#blackjack-deal-button").disabled = true;

}


//here is the bug!
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

async function dealerLogic() {
    document.querySelector("#blackjack-stand-button").disabled = true
    document.querySelector("#blackjack-hit-button").disabled = true;
    if (YOU['score'] <= 21) {
        while ((DEALER["score"] < YOU["score"] && DEALER["score"] < 21)) {

            /**if ((DEALER["score"] === 16 && 16 === YOU["score"]) || (DEALER["score"] === 17 && 17 === YOU["score"]) || (DEALER["score"] === 18 && 18 === YOU["score"]) || (DEALER["score"] === 19 && 19 === YOU["score"]) || (DEALER["score"] === 20 && 20 === YOU["score"]) || (DEALER["score"] === 21 && 21 === YOU["score"])) {
                document.querySelector
            }**/

            let card = randomCard();
            showCard(card, DEALER);
            updateScore(DEALER, card);
            showPoints(DEALER)
            await sleep(1000)
        }
    } else {
        while (DEALER['score'] < 2) {
            let card = randomCard();
            showCard(card, DEALER);
            updateScore(DEALER, card);
            showPoints(DEALER)
        }
    }


    document.querySelector("#blackjack-deal-button").disabled = false;
    let winner = computeWinner()
    showResult(winner);



}

function computeWinner() {
    let winner;

    if (YOU["score"] <= 21) {
        if (YOU["score"] > DEALER["score"] || DEALER["score"] > 21) {
            winner = YOU;
            blackJackGame['wins']++

        } else if (DEALER['score'] > YOU["score"] && DEALER['score'] <= 21) {
            winner = DEALER;
            blackJackGame['losses']++

        } else if (DEALER['score'] = YOU["score"]) {
            console.log("we drewd!!");
            blackJackGame['draws']++
        }
    } else if (YOU["score"] > 21 && DEALER['score'] <= 21) {
        winner = DEALER;
        blackJackGame['losses']++

    } else if (YOU["score"] > 21 && DEALER['score'] > 21) {
        console.log("we drewd!!");
        blackJackGame['draws']++
    }
    console.log(winner);
    return winner
}


function showResult(winner) {
    var messege, messegeColor;

    if (winner === YOU) {
        messege = "You Won!"
        messegeColor = "green"
        winningSound.play()
        document.querySelector("#wins").textContent = blackJackGame["wins"]
    } else if (winner === DEALER) {
        messege = "You Lost!"
        messegeColor = "red"
        losingSound.play()
        document.querySelector("#losses").textContent = blackJackGame["losses"]
    } else {
        messege = "Draw"
        messegeColor = "black"
        document.querySelector("#draws").textContent = blackJackGame["draws"]
    }
    document.querySelector('#Blackjack-result').textContent = messege
    document.querySelector('#Blackjack-result').style.color = messegeColor
}

















/**document.querySelector("#blackjack-stand-button").onclick = function blackjackHit1() {

    showCard(YOU);
    function showCard(activePlayer) {
        let cardImage = document.createElement("img");
        cardImage.style.width = "22%"

        cardImage.style.paddingLeft = "2%"
        cardImage.style.paddingBottom = "2%"
        cardImage.src = "Q.png"
        document.querySelector(activePlayer['div']).appendChild(cardImage)
        hitSound.play();
    }


}**/