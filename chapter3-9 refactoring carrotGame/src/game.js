'use strict'
import Field from './field.js';
import * as sound from './sound.js';

export default class Game {
    constructor(gameDuration, carrotCount, bugCount) {
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.gameTimer = document.querySelector('.game__timer');
        this.gameScore = document.querySelector('.game__score');
        this.gameBtn = document.querySelector('.game__button');
        this.gameBtn.addEventListener('click', () => {
            if(this.started) {
                this.stop(); // 기존 stopGame()
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
        
    stop() {
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton(); 
        sound.playAlert();
        sound.stopBackGround();
        this.onGameStop && this.onGameStop('cancel'); // // gameFinishBanner.showWithText('REPLAY ?');
    }

    setGameStopListener(onGameStop) { // main.js에게 game이 멈췄다는 것을 알려줄 수 있는 것
        this.onGameStop = onGameStop; // 게임이 멈췄을때 main.js에서 실행할 callback 함수
    }

    start() {
        this.started = true;
        this.initGame();
        this.showStopButton();
        this.showTimerAndScore();
        this.startGameTimer();
        sound.playBackGround();
    }

    finish(win) { // 구) finishGame
        this.started = false;
        this.hideGameButton();
        if(win){
            sound.playWin();
        } else {
            sound.playBug();
        }
        this.stopGameTimer();
        sound.stopBackGround();
        this.onGameStop && this.onGameStop(win ? 'win' : 'lose'); //gameFinishBanner.showWithText(win? 'YOU WON' : 'YOU LOST');
    }
    
    onItemClick = (item) => { // arrow function for this binding
        if(!this.started){
            return;
        }
        
        if(item === 'carrot'){ 
            this.score++;
            this.updateScoreBoard();
            if(this.score === this.carrotCount) {
                this.finish(true);
            }
        } else if (item === 'bug') {
            this.finish(false);
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
                this.finish(this.carrotCount === this.score);
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