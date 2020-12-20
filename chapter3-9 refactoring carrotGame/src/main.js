'use strict';

import PopUp from './popup.js';
import Field from './field.js';

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

// js파일을 html에서 import할때 defer를 쓰지않으면 window.onload 안에 작성해야 됨
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const alertSound = new Audio("sound/alert.wav");
const bgSound = new Audio("sound/bg.mp3");
const carrotSound = new Audio("sound/carrot_pull.mp3");
const bugSound = new Audio("sound/bug_pull.mp3");
const winSound = new Audio("sound/game_win.mp3");
let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp(); // 클래스가 쓰이는 곳에 맞는 변수명 설정
gameFinishBanner.setClickListener(()=>{ // 기존 popUpRefresh 대신 
    startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT);
gameField.setClickListener(onItemClick);
function onItemClick(item) {
    // console.log(event);
    // 게임이 시작된 조건이 아니면 함수를 빨리 끝내는 게 중요
    if(!started){
        return;
    }
    
    if(item === 'carrot'){ 
        score++;
        updateScoreBoard();
        if(score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if (item === 'bug') {
        finishGame(false);
    }
}

gameBtn.addEventListener('click', () => {
    // console.log('log');
    if(started) {
        stopGame();
    } else {
        startGame();
    }
});


function finishGame(win) {
    started = false;
    hideGameButton();
    if(win){
        playSound(winSound);
    } else {
        playSound(bugSound);
    }
    stopGameTimer();
    stopSound(bgSound);
    gameFinishBanner.showWithText(win? 'YOU WON' : 'YOU LOST');
}

function stopGame() {
    started = false;
    stopGameTimer();
    hideGameButton(); // 기존에 놓쳤던 코드인 듯 - stopGameTimer()안에 있어서 정상작동 되고 있었음
    gameFinishBanner.showWithText('REPLAY ?'); // showPopUpWithText('REPLAY ?'); 대신  - stopGameTimer()안에 있어서 정상작동 되고 있었음
    playSound(alertSound);
    stopSound(bgSound);
}

function startGame() {
    // start버튼 누르면 게임 시작, 당근과 벌레 생성
    started = true;
    initGame();
    showStopButton();
    showTimerAndScore();
    startGameTimer();
    playSound(bgSound);
}

function startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    updateTimerText(remainingTimeSec);
    timer = setInterval(()=> {
        if(remainingTimeSec <= 0){
            clearInterval(timer);
            finishGame(CARROT_COUNT === score);
            return
        }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function stopGameTimer() {
    clearInterval(timer);
}

function updateTimerText(sec) {
    const minutes = Math.floor(sec / 60);
    const seconds = sec % 60;
    gameTimer.innerHTML = `${minutes}:${seconds}`;
}

function showStopButton() {
    const icon = gameBtn.querySelector(".fas");
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
    gameBtn.style.visibility = 'visible';
}

function hideGameButton() {
    gameBtn.style.visibility = 'hidden';
}

function showTimerAndScore() {
    gameTimer.style.visibility = 'visible';
    gameScore.style.visibility = 'visible';
}

function initGame(){
    score = 0;
    // field.innerHTML = ''; // 새로 추가(시작버튼) 할때마다 리셋됨
    gameScore.innerHTML = CARROT_COUNT;
    gameField.init();
}


function playSound(sound) {
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound) {
    sound.pause();
}

function updateScoreBoard() {
    // console.log(score);
    gameScore.innerHTML = CARROT_COUNT - score;
}

