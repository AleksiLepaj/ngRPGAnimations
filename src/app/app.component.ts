import { Component } from '@angular/core';
import {transition, trigger, useAnimation} from "@angular/animations";
import {shakeX, pulse, jello, bounce, flip} from "ng-animate";
import { lastValueFrom, timer } from 'rxjs';

const SPAWN_DURATION_MS = 500;
const DEATH_DURATION_SECONDS = 0.5;
const PREATTACK_JELLO_DURATION_SECONDS = 0.5;
const ATTACK_PULSE_DURATION_SECONDS = 0.3;
const HIT_WOBBLE_DURATION_SECONDS = 0.3;

const BOUNCE_DURATION_SECONDS = 1.0;
const SHAKE_DURATION_SECONDS = 0.75;
const FLIP_DURATION_SECONDS = 0.5;
const ROTATE_CENTER_DURATION_SECONDS = 0.8;
const ROTATE_TOP_DURATION_SECONDS = 0.7;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('death', [transition(':increment', useAnimation(shakeX, {params: {timing: DEATH_DURATION_SECONDS}}))]),
    trigger('attack', [transition(':increment', useAnimation(pulse, {params: {timing: ATTACK_PULSE_DURATION_SECONDS, scale: 4.5}}))]),
    trigger('preAttack', [transition(':increment', useAnimation(jello, {params: {timing: PREATTACK_JELLO_DURATION_SECONDS}}))]),
    trigger('bounce', [transition(':increment', useAnimation(bounce, {params: {timing: BOUNCE_DURATION_SECONDS}}))]),
    trigger('shake', [transition(':increment', useAnimation(shakeX, {params: {timing: SHAKE_DURATION_SECONDS}}))]),
    trigger('flip', [transition(':increment', useAnimation(flip, {params: {timing: FLIP_DURATION_SECONDS}}))]),
]
})
export class AppComponent {
  slimeIsPresent = false;
  cantInteractWithSlime = false;

  ng_death = 0;
  ng_preAttack = 0;
  ng_attack = 0;

  ng_bounce = 0;
  ng_shake = 0;
  ng_flip = 0;

  css_hit = false;

  constructor() {
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

  async bounceShakeFlip() {
    this.ng_bounce++;
    await lastValueFrom(timer(BOUNCE_DURATION_SECONDS * 1000));
    this.ng_shake++;
    await lastValueFrom(timer(SHAKE_DURATION_SECONDS * 1000));
    this.ng_flip++;
  }


}
