'use strict'

import {Fighter} from "./classes/Fighter.js";
import {game} from "./donnees.js";
import {Transfo} from "./classes/Transfo.js";

// ### Get DOM elements ###

// Boutons
const btnAttack = document.getElementById('btn-attack');
const btnSpeAttack = document.getElementById('btn-special-attack');
const btnMana = document.getElementById('btn-mana');
const btnUltimate = document.getElementById('btn-ultimate');

// Barres de vie et de mana
const healthBarPlayer1 = document.getElementById('health-bar-player1');
const healthBarPlayer2 = document.getElementById('health-bar-player2');
const manaBarPlayer1 = document.getElementById('mana-bar-player1');
const manaBarPlayer2 = document.getElementById('mana-bar-player2');

// Nombre de tours
const nbTurnSpan = document.getElementById('nb-turn');

// Joueurs
const divPlayers = document.getElementsByClassName('player');
const spritePlayer1 = document.getElementById('player1');
const videoPlayer1 = document.getElementById('video1');
const spritePlayer2 = document.getElementById('player2');
const videoPlayer2 = document.getElementById('video2');

// Zone de texte
const gameInfo = document.getElementById('game-info');

// ### Fonctions ###

/**
 * Affiche un message dans la zone de texte
 * @param message {string} Message à afficher
 */
export function log(message) {
    let p = document.createElement('p');
    p.innerHTML = `[${game.turn}] ${message}`;
    gameInfo.insertBefore(p, gameInfo.firstChild);
}

/**
 * Initialise le jeu
 */
export function Init() {
    game.player1 = JSON.parse(localStorage.getItem('player1'));

    if (game.player1.transfoSprite != null) {
        game.player1 =
            new Transfo(
                game.player1.name,
                game.player1.health,
                game.player1.damage,
                game.player1.mana,
                game.player1.sprite,
                game.player1.animations,
                game.player1.transfoSprite);
    } else {
        game.player1 =
            new Fighter(
                game.player1.name,
                game.player1.health,
                game.player1.damage,
                game.player1.mana,
                game.player1.sprite,
                game.player1.animations);
    }

    game.player2 = JSON.parse(localStorage.getItem('player2'));

    if (game.player2.transfoSprite != null) {
        game.player2 =
            new Transfo(
                game.player2.name,
                game.player2.health,
                game.player2.damage,
                game.player2.mana,
                game.player2.sprite,
                game.player2.animations,
                game.player2.transfoSprite);
    } else {
        game.player2 =
            new Fighter(
                game.player2.name,
                game.player2.health,
                game.player2.damage,
                game.player2.mana,
                game.player2.sprite,
                game.player2.animations);
    }

    healthBarPlayer1.max = game.player1.maxHealth;
    healthBarPlayer2.max = game.player2.maxHealth;

    manaBarPlayer1.max = game.player1.maxMana;
    manaBarPlayer2.max = game.player2.maxMana;

    spritePlayer1.src = game.player1.sprite;
    spritePlayer2.src = game.player2.sprite;

    btnAttack.addEventListener('click', Attack);
    btnSpeAttack.addEventListener('click', SpecialAttack);
    btnMana.addEventListener('click', RestoreMana);
    btnUltimate.addEventListener('click', Ultimate);
    UpdateStats();
}

/**
 * Attaque un combattant
 */
function Attack() {
    if (game.isPlayer1Turn) {
        PlayAnimation(spritePlayer1, videoPlayer1, game.player1, game.player1.animations.attack);
        game.player1.Attack(game.player2);
        if (game.player2.isDead() && game.player2.animations.die != null) {
            PlayAnimation(spritePlayer2, videoPlayer2, game.player2, game.player2.animations.die);
        } else if (game.player2.isDead()) {
            window.location.href = "gameOver.html";
            localStorage.setItem("winner", "1");
        }
    }
    else {
        PlayAnimation(spritePlayer2, videoPlayer2, game.player2, game.player2.animations.attack);
        game.player2.Attack(game.player1);
        if (game.player1.isDead() && game.player1.animations.die != null) {
            PlayAnimation(spritePlayer1, videoPlayer1, game.player1, game.player1.animations.die);
        } else if (game.player1.isDead()) {
            window.location.href = "gameOver.html";
            localStorage.setItem("winner", "2");
        }
    }
}

/**
 * Attaque spéciale du combattant
 */
function SpecialAttack() {
    if (game.isPlayer1Turn) {
        PlayAnimation(spritePlayer1, videoPlayer1, game.player1, game.player1.animations.special);
        game.player1.SpecialAttack(game.player2);
        if (game.player2.isDead() && game.player2.animations.die != null) {
            PlayAnimation(spritePlayer2, videoPlayer2, game.player2, game.player2.animations.die);
        } else if (game.player2.isDead()) {
            window.location.href = "gameOver.html";
            localStorage.setItem("winner", "1");
        }
    }
    else {
        PlayAnimation(spritePlayer2, videoPlayer2, game.player2, game.player2.animations.special);
        game.player2.SpecialAttack(game.player1);
        if (game.player1.isDead() && game.player1.animations.die != null) {
            PlayAnimation(spritePlayer1, videoPlayer1, game.player1, game.player1.animations.die);
        } else if (game.player1.isDead()) {
            window.location.href = "gameOver.html";
            localStorage.setItem("winner", "2");
        }
    }
}

/**
 * Régénère le mana du combattant
 */
function RestoreMana() {
    if (game.isPlayer1Turn) {
        PlayAnimation(spritePlayer1, videoPlayer1, game.player1, game.player1.animations.mana);
        game.player1.RestoreMana(20);
    } else {
        PlayAnimation(spritePlayer2, videoPlayer2, game.player2, game.player2.animations.mana);
        game.player2.RestoreMana(20);
    }
}

/**
 * Utilise l'attaque ultime du combattant
 */
function Ultimate() {
    if (game.isPlayer1Turn) {
        PlayAnimation(spritePlayer1, videoPlayer1, game.player1, game.player1.animations.ultimate);
        game.player1.Ultimate(spritePlayer1);
    } else {
        PlayAnimation(spritePlayer2, videoPlayer2, game.player2, game.player2.animations.ultimate);
        game.player2.Ultimate(spritePlayer2);
    }
}

/**
 * Met à jour les barres de vie
 */
function UpdateHealthBars() {
    healthBarPlayer1.value = game.player1.health;
    healthBarPlayer2.value = game.player2.health;
}

/**
 * Met à jour les barres de mana
 */
function UpdateManaBars() {
    manaBarPlayer1.value = game.player1.mana;
    manaBarPlayer2.value = game.player2.mana;
}

/**
 * Met à jour le nombre de tours
 */
function UpdateNbTurn() {
    nbTurnSpan.innerHTML = game.turn.toString();
}

/**
 * Passe au tour suivant
 */
function NewTurn() {
    game.isPlayer1Turn = !game.isPlayer1Turn;
    game.turn++;
    UpdateNbTurn();
}

/**
 * Met à jour les statistiques
 */
export function UpdateStats() {
    divPlayers[0].classList.toggle('border');
    divPlayers[1].classList.toggle('border');
    UpdateHealthBars();
    UpdateManaBars();
    NewTurn();
}

/**
 * Change l'affichage des boutons
 * @param bool {boolean} Indique si les boutons doivent être activés ou non
 */
function ChangeDisplayBtn(bool) {
    btnAttack.disabled = bool;
    btnMana.disabled = bool;
    btnUltimate.disabled = bool;
    btnSpeAttack.disabled = bool;
}

/**
 * Joue une animation
 * @param image {HTMLImageElement} Image du combattant
 * @param video {HTMLVideoElement} Vidéo du combattant
 * @param currentPlayer {Fighter} Combattant actuel
 * @param animation {string} Animation à jouer
 */
function PlayAnimation(image, video, currentPlayer, animation) {
    if (currentPlayer.animations.die == null
        || currentPlayer.animations.ultimate == null
        || currentPlayer.animations.attack == null
        || currentPlayer.animations.mana == null
        || (currentPlayer.isUltimateUsed && animation === currentPlayer.animations.ultimate)
        || (currentPlayer.mana === currentPlayer.maxMana && animation === currentPlayer.animations.mana)) return;

    image.style.display = 'none';
    video.style.display = 'block';
    video.autoplay = true;
    video.loop = false;
    video.muted = false;
    video.controls = false;
    video.src = animation;
    video.width = image.width;
    video.height = image.height;

    ChangeDisplayBtn(true);

    video.addEventListener('ended', () => {
        if (animation === currentPlayer.animations.die) {
            window.location.href = "gameOver.html";
        }

        image.style.display = 'block';
        video.style.display = 'none';
        video.currentTime = 0;

        ChangeDisplayBtn(false);
    });
}