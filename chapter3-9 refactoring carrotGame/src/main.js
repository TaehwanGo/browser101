'use strict';

import PopUp from './popup.js';
import Game from './game.js';

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameFinishBanner = new PopUp(); // 클래스가 쓰이는 곳에 맞는 변수명 설정
const game = new Game(GAME_DURATION_SEC, CARROT_COUNT, BUG_COUNT);
game.setGameStopListener((reason) => {
    console.log(reason);
    let message;
    switch(reason) {
        case 'cancel':
            message = 'Replay?';
            break;
        case 'win':
            message = 'YOU WON';
            break;
        case 'lose':
            message = 'YOU LOST';
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(()=>{ // 기존 popUpRefresh 대신 
    game.start();
});