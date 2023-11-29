'use strict'

import {log, UpdateStats} from "../game.js";

/**
 * Classe Fighter <br>
 * Représente un combattant
 * @class Fighter
 * @property {string} name Nom du combattant
 * @property {number} health Points de vie du combattant
 * @property {number} maxHealth Points de vie maximum du combattant
 * @property {number} damage Dégâts du combattant
 * @property {number} mana Points de mana du combattant
 * @property {number} maxMana Points de mana maximum du combattant
 * @property {string} sprite Sprite du combattant
 * @property {Object} animations Animations du combattant
 * @property {boolean} isUltimateUsed Indique si l'attaque ultime du combattant a été utilisée
 */
export class Fighter {

    name;
    health;
    maxHealth;
    damage;
    mana;
    maxMana;
    sprite;
    animations = {
        die: null,
        attack: null,
        special: null,
        ultimate: null,
        mana: null
    };

    isUltimateUsed = false;

    /**
     * Constructeur de la classes Fighter
     * @param name {string} Nom du combattant
     * @param health {number} Points de vie du combattant
     * @param damage {number} Dégâts du combattant
     * @param mana {number} Points de mana du combattant
     * @param sprite {string} Sprite du combattant
     * @param animations {Object} Animations du combattant
     * @constructor
     */
    constructor(name, health, damage, mana, sprite, animations = {}) {
        this.name = name;
        this.health = health;
        this.maxHealth = health;
        this.damage = damage;
        this.mana = mana;
        this.maxMana = mana;
        this.sprite = sprite;
        this.animations = animations;
    }

    /**
     * Reçoit des dégâts
     * @param damage {number} Dégâts reçus
     */
    TakeDamage(damage) {
        this.health -= damage;
        if (this.health < 0)
            this.health = 0;
    }

    /**
     * Attaque un combattant
     * @param target {Fighter} Cible de l'attaque
     */
    Attack(target) {
        if (this.mana >= 10) {
            target.TakeDamage(this.damage);
            this.UseMana(10);
            log(`${this.name} attaque ${target.name} et lui inflige ${this.damage} dégâts.`);
            UpdateStats();
        } else
            log(`${this.name} n'a pas assez de mana pour attaquer.`);
    }

    /**
     * Attaque spéciale du combattant
     * @param target {Fighter} Cible de l'attaque
     */
    SpecialAttack(target) {
        if (this.mana >= 20) {
            target.TakeDamage(this.damage * 1.5);
            this.UseMana(20);
            log(`${this.name} attaque ${target.name} et lui inflige ${this.damage * 1.5} dégâts.`);
            UpdateStats();
        } else
            log(`${this.name} n'a pas assez de mana pour attaquer.`);
    }

    /**
     * Utilise de la mana
     * @param mana {number} Mana utilisée
     */
    UseMana(mana) {
        this.mana -= mana;
        if (this.mana < 0)
            this.mana = 0;
    }

    /**
     * Récupère des points de mana
     * @param mana {number} Mana récupérée
     */
    RestoreMana(mana) {
        if (this.mana === this.maxMana)
            log(`${this.name} a déjà toute sa mana`);
        else {
            this.mana += mana;
            log(`${this.name} a regen son mana`);
            UpdateStats();
            if (this.mana > this.maxMana)
                this.mana = this.maxMana;
        }
    }

    /**
     * Attaque ultime du combattant
     */
    Ultimate() {
        log(`${this.name} n'a pas d'ultime`);
    }

    /**
     * Indique si le combattant est mort
     * @returns {boolean} Vrai si le combattant est mort, faux sinon
     */
    isDead() {
        return this.health <= 0;
    }
}