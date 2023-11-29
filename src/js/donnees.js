import {Transfo} from "./classes/Transfo.js";
import {Fighter} from "./classes/Fighter.js";

/**
 * Objet path <br>
 * Représente les chemins vers les ressources
 * @property {string} img Chemin vers les images
 * @property {string} video Chemin vers les vidéos
 * @type {{img: string, video: string}}
 */
const path = {
    img: '/assets/img/',
    video: '/assets/video/'
}

/**
 * Objet game <br>
 * Représente le jeu
 * @property {number} turn Nombre de tours
 * @property {boolean} isPlayer1Turn Indique si c'est au joueur 1 de jouer
 * @property {Fighter} player1 Joueur 1
 * @property {Fighter} player2 Joueur 2
 * @property {Object} fighters Liste des combattant
 */
export let game = {
    turn: 0,
    isPlayer1Turn: false,
    fighters: {
        Bob: new Transfo('Bob', 100, 50, 50, path.img + "bob.png", {},
            path.img + "bob_transfo.png"),
        Tyler1: new Transfo('Tyler1', 100, 10, 50, path.img + "tyler1.png",
            {'die': path.video + 'tyler1_die.mp4',
                'attack': path.video + 'tyler1_attack.mp4',
                'special': path.video + 'tyler1_spe.mp4',
                'ultimate': path.video + 'tyler1_ultimate.mp4',
                'mana': path.video + 'tyler1_mana.mp4'},
            path.img + "tyler1_transfo.png"),
        BobR: new Fighter('Bob R', 100, 10, 50, path.img + 'bob_r.png'),
        Pepe: new Fighter('Pepe', 100, 10, 50, path.img + 'pepe.png'),
        Sanic: new Fighter('Sanic', 100, 10, 50, path.img + 'sanic.png'),
        Ricardo: new Fighter('Ricardo', 100, 10, 50, path.img + 'ricardo.gif'),
    },
    player1: null,
    player2: null
};