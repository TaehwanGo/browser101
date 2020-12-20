'use strict';

import PopUp from './popup.js';

const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

// js파일을 html에서 import할때 defer를 쓰지않으면 window.onload 안에 작성해야 됨
const field = document.querySelector('.game__field');
const fieldRect = field.getBoundingClientRect(); 
const gameBtn = document.querySelector('.game__button');
const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');

const carrotSound = new Audio("sound/carrot_pull.mp3");
const alertSound = new Audio("sound/alert.wav");
const bgSound = new Audio("sound/bg.mp3");
const bugSound = new Audio("sound/bug_pull.mp3");
const winSound = new Audio("sound/game_win.mp3");
let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp(); // 클래스가 쓰이는 곳에 맞는 변수명 설정
gameFinishBanner.setClickListener(()=>{ // 기존 popUpRefresh 대신 
    startGame();
});

field.addEventListener('click', onFieldClick);

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
    field.innerHTML = ''; // 새로 추가(시작버튼) 할때마다 리셋됨
    gameScore.innerHTML = CARROT_COUNT;
    // 벌레와 당근을 생선한 뒤 field에 추가해 줌
    // console.log(fieldRect);
    addItem('carrot', CARROT_COUNT, 'img/carrot.png');
    addItem('bug', BUG_COUNT, 'img/bug.png');
}

function onFieldClick(event) {
    // console.log(event);
    // 게임이 시작된 조건이 아니면 함수를 빨리 끝내는 게 중요
    if(!started){
        return;
    }
    const target = event.target;
    if(target.matches('.carrot')){ // matches() == classList.contain()
        // 당근
        playSound(carrotSound);
        target.remove();
        score++;
        updateScoreBoard();
        if(score === CARROT_COUNT) {
            finishGame(true);
        }
    } else if (target.matches('.bug')) {
        // 벌레
        finishGame(false);
    }
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

function addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    for(let i = 0; i<count; i++) {
        const item = document.createElement('img');
        item.setAttribute('class', className);
        item.setAttribute('src', imgPath);
        item.style.position = 'absolute';
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        field.appendChild(item);
    }
}

function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
