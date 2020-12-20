'use strict';

export default class PopUp {
    constructor() {
        this.popUp = document.querySelector('.pop-up'); // main.js의 const popUp = document.querySelector('.pop-up');
        this.popUpText = document.querySelector('.pop-up__message');
        this.popUpRefresh = document.querySelector('.pop-up__refresh');
        this.popUpRefresh.addEventListener('click', ()=>{
            this.onClick && this.onClick(); // setClickListener로 등록된 onClick이 있으면 onClick을 실행
            this.hide(); // 여기 있는데 왜 안될까
        });
    }

    setClickListener(onClick) { // 사용자가 PopUp에 setClickListener를 등록하면 등록된 onClick을 호출
        this.onClick = onClick; // 여기서 클래스 내 onClick을 선언하는 구나
    }

    showWithText(text) {
        this.popUpText.innerHTML = text;
        this.popUp.classList.remove('pop-up--hide');
    }

    hide() {
        this.popUp.classList.add('pop-up--hide');
    }
}