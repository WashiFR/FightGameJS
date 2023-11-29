import {game} from "./donnees.js";

const btnContainer = document.getElementById("buttons-container");
const spritePlayer1 = document.getElementById("player1");
const namePlayer1 = document.getElementById("player1-name");
const spritePlayer2 = document.getElementById("player2");
const namePlayer2 = document.getElementById("player2-name");

const startBtn = document.getElementById("start-button");

let isPlayer1Valid = false;

function UpdateStartButton() {
    if (!isPlayer1Valid) {
        startBtn.addEventListener("click", function () {
            isPlayer1Valid = true;
        });
    } else {
        startBtn.addEventListener("click", function () {
            startBtn.innerHTML = "FIGHT";
            console.log(game);
            startBtn.addEventListener("click", function () {
                window.location.href = "game.html";
            });
        });
    }
}

for (let i = 0; i < Object.keys(game.fighters).length; i++) {
    let btn = document.createElement("button");
    
    btn.addEventListener("click", function () {
        if (!isPlayer1Valid) {
            localStorage.setItem("player1", JSON.stringify(game.fighters[Object.keys(game.fighters)[i]]));
            namePlayer1.innerHTML = Object.keys(game.fighters)[i];
            spritePlayer1.src = JSON.parse(localStorage.getItem("player1")).sprite;
        } else {
            localStorage.setItem("player2", JSON.stringify(game.fighters[Object.keys(game.fighters)[i]]));
            namePlayer2.innerHTML = Object.keys(game.fighters)[i];
            spritePlayer2.src = JSON.parse(localStorage.getItem("player2")).sprite;
        }
        UpdateStartButton();
    });
    
    btn.innerHTML = Object.keys(game.fighters)[i];
    btnContainer.appendChild(btn);
}