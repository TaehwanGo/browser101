'use strict'
import { Field, ItemType } from './field.js';
import * as sound from './sound.js';

export const Reason = Object.freeze({
    win: 'win',
    lose: 'lose',
    cancel: 'cancel'
}); // 문자열을 쓰지 못하도록 여기에서만 선택하도록 만들기 위함

// Builder pattern
export class GameBuilder {
    gameDuration(duration) {
        this.gameDuration = duration;
        return this;
    }

    carrotCount(num){
        this.carrotCount = num;
        return this;
    }

    bugCount(num) {
        this.bugCount = num;
        return this;
    }

    build() {
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        );
    }
}

class Game { // export default Game을 외부로 노출 시키는 대신 builder pattern 을 사용
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn = document.querySelector('.game__button');
        this.gameBtn.addEventListener('click', () => {
            if(this.started) {
                this.stop(Reason.cancel); // 기존 stopGame()
            } else {
                this.start(); // 기존 startGame()
            }
        });

        this.gameField = new Field(carrotCount, bugCount);
        this.gameField.setClickListener(this.onItemClick);

        this.started = false;
        this.score = 0;
        this.timer = undefined;
    }
     
    start() {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackGround();
    }

    setGameStopListener(onGameStop) { // main.js에게 game이 멈췄다는 것을 알려줄 수 있는 것
        this.onGameStop = onGameStop; // 게임이 멈췄을때 main.js에서 실행할 callback 함수
    }

    stop(reason) { // 구 : stopGame + finishGame
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton(); 
        sound.stopBackGround();
        this.onGameStop && this.onGameStop(reason);
    }
    
    onItemClick = (item) => { // arrow function for this binding
        if(!this.started){
            return;
        }
        
        if(item === ItemType.carrot){ 
            this.score++;
            this.updateScoreBoard();
            if(this.score === this.carrotCount) {
                this.stop(Reason.win);
            }
        } else if (item === ItemType.bug) {
            this.stop(Reason.lose);
        }
    }

    showStopButton() {
        const icon = this.gameBtn.querySelector(".fas");
        icon.classList.add('fa-stop');
        icon.classList.remove('fa-play');
        this.gameBtn.style.visibility = 'visible';
    }
    
    hideGameButton() {
        this.gameBtn.style.visibility = 'hidden';
    }
        
    showTimerAndScore() {
        this.gameTimer.style.visibility = 'visible';
        this.gameScore.style.visibility = 'visible';
    }

    startGameTimer() {
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);
        this.timer = setInterval(()=> {
            if(remainingTimeSec <= 0){
                clearInterval(this.timer);
                // this.finish(this.carrotCount === this.score);
                this.stop(this.carrotCount === this.score ? Reason.win : Reason.lose);
                return
            }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }

    stopGameTimer() {
        clearInterval(this.timer);
    }

    updateTimerText(sec) {
        const minutes = Math.floor(sec / 60);
        const seconds = sec % 60;
        this.gameTimer.innerHTML = `${minutes}:${seconds}`;
    }

    initGame(){
        this.score = 0;
        this.gameScore.innerHTML = this.carrotCount;
        this.gameField.init();
    }

    updateScoreBoard() {
        this.gameScore.innerHTML = this.carrotCount - this.score;
    }

}