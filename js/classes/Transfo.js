'use strict'

import {Fighter} from "./Fighter.js";
import {UpdateStats, log} from "../game.js";

/**
 * Classe Transfo <br>
 * Représente un combattant qui peut se transformer
 * @class Transfo
 * @extends Fighter
 * @property {string} transfoSprite Sprite de la transformation du combattant
 * @see Fighter
 */
export class Transfo extends Fighter {

    transfoSprite;

    /**
     * Constructeur de la classe Transfo
     * @param name {string} Nom du combattant
     * @param health {number} Points de vie du combattant
     * @param damage {number} Dégâts du combattant
     * @param mana {number} Points de mana du combattant
     * @param sprite {string} Sprite du combattant
     * @param animations {Object} Animations du combattant
     * @param transfoSprite {string} Sprite de la transformation du combattant
     */
    constructor(name, health, damage, mana, sprite, animations, transfoSprite) {
        super(name, health, damage, mana, sprite, animations);
        this.transfoSprite = transfoSprite;
    }

    Ultimate(sprite) {
        if (this.mana < 20) {
            log(`${this.name} n'a pas assez de mana pour utiliser son attaque ultime`);
        } else if (this.isUltimateUsed) {
            log(`${this.name} est déjà transformé`);
        } else if (this.mana >= 20 && !this.isUltimateUsed) {
            this.mana -= 20;
            sprite.src = this.transfoSprite;
            UpdateStats();
            this.isUltimateUsed = true;
        }
    }
}