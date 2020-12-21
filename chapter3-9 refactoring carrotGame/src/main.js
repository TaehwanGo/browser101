'use strict';

import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as sound from './sound.js';

const CARROT_COUNT = 5;
const BUG_COUNT = 5;
const GAME_DURATION_SEC = 5;

const gameFinishBanner = new PopUp(); // 클래스가 쓰이는 곳에 맞는 변수명 설정
// const game = new Game(GAME_DURATION_SEC, CARROT_COUNT, BUG_COUNT);
const game = new GameBuilder()
.gameDuration(GAME_DURATION_SEC)
.carrotCount(CARROT_COUNT)
.bugCount(BUG_COUNT)
.build(); // builder pattern으로 생성하면 어떤 값을 설정하는지 한눈에 알아보기 좋음
game.setGameStopListener((reason) => {
    console.log(reason);
    let message;
    switch(reason) {
        case Reason.cancel:
            message = 'Replay?';
            sound.playAlert();
            break;
        case Reason.win:
            message = 'YOU WON';
            sound.playWin();
            break;
        case Reason.lose:
            message = 'YOU LOST';
            sound.playBug();
            break;
        default:
            throw new Error('not valid reason');
    }
    gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(()=>{ // 기존 popUpRefresh 대신 
    game.start();
});