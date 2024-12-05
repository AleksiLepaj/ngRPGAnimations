import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import {shakeX, pulse, jello} from "ng-animate";

const SPAWN_DURATION_MS = 500;

const DEATH_DURATION_SECONDS = 0.5;
const PREATTACK_JELLO_DURATION_SECONDS = 0.5;
const ATTACK_PULSE_DURATION_SECONDS = 0.3;
const HIT_WOBBLE_DURATION_SECONDS = 0.3;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('death', [transition(':increment', useAnimation(shakeX, {params: {timing: DEATH_DURATION_SECONDS}}))]),
    trigger('attack', [transition(':increment', useAnimation(pulse, {params: {timing: ATTACK_PULSE_DURATION_SECONDS, scale: 4.5}}))]),
    trigger('preAttack', [transition(':increment', useAnimation(jello, {params: {timing: PREATTACK_JELLO_DURATION_SECONDS}}))]),
]
})
export class AppComponent {
  slimeIsPresent = false;
  cantInteractWithSlime = false;

  ng_death = 0;
  ng_preAttack = 0;
  ng_attack = 0;



  css_hit = false;

  constructor() {
  }

  spawn() {
    this.slimeIsPresent = true;
    // TODO Animation angular avec forwards
    this.showSlime();
  }

  death(){
    this.slimeIsPresent = false;
    // TODO Animation angular avec forwards
    this.hideSlime();
    // TODO 2e animation angular en même temps
    this.ng_death++;
  }

  attack(){
    // TODO Jouer une animation et augmenter l'intensité du mouvement avec scale
    this.ng_preAttack++;
    setTimeout(() => {this.ng_attack++}, 200);
    // TODO Jouer une autre animation avant
  }

  hit(){
    // TODO Utilisé Animista pour faire une animation différente avec css (wobble)
    this.css_hit = true;
    setTimeout(() => {this.css_hit = false}, HIT_WOBBLE_DURATION_SECONDS * 1000);
  }

  showSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeOut");
    element?.classList.add("fadeIn");
  }

  hideSlime(){
    var element = document.getElementById("slimeyId");
    element?.classList.remove("fadeIn");
    element?.classList.add("fadeOut");
  }
}
