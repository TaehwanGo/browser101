const playBtn = document.querySelector(".button__header");
const timeNum = document.querySelector(".timerNum");
const resumeBtn = document.querySelector(".button__resume");
const stopBtn = document.querySelector(".button__stop");
const optionScreenLayer = document.querySelector(".optionScreenLayer");
const main = document.querySelector("main");
const countNum = document.querySelector(".countNum");
const retryBtn = document.querySelector(".button__retry");
const endingMessage = document.querySelector(".message__ending");
const endingBox = document.querySelector(".endingBox");
const resumeBox = document.querySelector(".resumeBox");
const stopBox = document.querySelector(".stopBox");

const totalTime = 10;
let time = totalTime; // 남은 시간
const carrotResetNumber = 10;
let count = carrotResetNumber; // 남은 당근 개수
const bugNumber = 10;
let timer; 
let carrotArray;
let bugArray;

class Target { // create carrots or bugs and append them into screen
    constructor(genContainer) {
        this.genContainer = genContainer;
    }

    createTarget(genNumber, targetName, leftCarrotCount, gameEnd) {
        if(targetName != 'carrot' && targetName != 'bug') {
            throw Error('Please targetName is carrot or bug');
        }
        const getArea = this.genContainer.getBoundingClientRect();
        // console.log("mainRect:", getArea);
        let targetArray = [];
        for(let i=0; i<genNumber; i++){
            const target = document.createElement("img");
            this.genContainer.appendChild(target);
            const randomX = Math.floor(Math.random()*getArea.width);
            const randomY = Math.floor(Math.random()*getArea.height);
            // console.log("randomX, Y:", randomX, randomY);
            target.style.top = `${randomY}px`;
            target.style.left = `${randomX}px`;
            target.setAttribute("class", targetName);
            target.classList.add("target");

            target.addEventListener("click", (event) => { // click event
                event.target.remove();
                if(targetName == 'carrot') { // if carrot is clicked
                    leftCarrotCount--;
                    countNum.innerHTML = leftCarrotCount;
                    if(leftCarrotCount <= 0) {
                        gameEnd('win');
                    }
                } else if(targetName == 'bug'){ // else if carrot is clicked
                    gameEnd('lose');
                }
            })
            targetArray.push(target);
        }
        return targetArray;
    }
}


function popUpMessage (message) {
    endingBox.style.display = "flex";
    resumeBox.style.display = "none";
    stopBox.style.display = "none";
    endingMessage.innerHTML = message;
    optionScreenLayer.style.zIndex = "9";
}

function gameEnd(result) {
    let message;
    if(result == 'win'){
        message = "You won !";
    } else if (result == 'lose') {
        message = "You lost !";
    } else {
        throw Error('result must be win or lost');
    }
    clearInterval(timer);
    playBtn.classList.remove("started");
    changeButtonIcon("fa-pause", "fa-play");
    // popup
    popUpMessage(message);
    console.log(message);
}

/**
 * @param {String} before icon class before
 * @param {string} after icon class after
 */
function changeButtonIcon (before, after) {
    const icon = playBtn.querySelector("i");
    if(icon.classList.contains(before)){
        // change
        icon.classList.remove(before);
        icon.classList.add(after);
    } else {
        throw Error("The icon doesn't have the class, before");
    }
}

function setTime () { // button click 시 들어갈 코드 
    if(time <=0){
        gameEnd('lose');
    } else {
        time--;
        timeNum.innerHTML = `0:${time}`;
    }
}

function screenReset() {
    time = totalTime; // 남은 시간
    timeNum.innerHTML = `0:${time}`;
    count = carrotResetNumber; // 남은 당근 개수
    countNum.innerHTML = count;
}

function genTargets() {
    count = carrotResetNumber;
    const carrotClass = new Target(main);
    carrotArray = carrotClass.createTarget(carrotResetNumber, 'carrot', count, gameEnd);
    // console.log(carrotArray);

    const bugClass = new Target(main);
    bugArray = bugClass.createTarget(bugNumber, 'bug', count, gameEnd);
    // console.log(bugArray);
}

function start() {
    genTargets();
    screenReset();
    timer = setInterval(setTime, 1000);
    changeButtonIcon("fa-play", "fa-pause");
    playBtn.classList.add("started");
    
    console.log("Game started !");
}

function handleResume(){
    optionScreenLayer.style.zIndex = "-1";
    timer = setInterval(setTime, 1000);

    console.log("resumed");
}

function removeTargets () {
    for(let i=0; i<carrotArray.length; i++){
        // console.log(carrotArray[i]);
        if(carrotArray[i]){
            carrotArray[i].remove();
        }
    }
    for(let i=0; i<bugArray.length; i++){
        // console.log(bugArray[i]);
        if(bugArray[i]){
            bugArray[i].remove();
        }
    }
}

function handleStop() {
    removeTargets();
    gameEnd('lose');
    optionScreenLayer.style.zIndex = "-1";
    screenReset();
}

function handleRetry() {
    removeTargets();
    endingBox.style.display = "none";
    resumeBox.style.display = "flex";
    stopBox.style.display = "flex";
    optionScreenLayer.style.zIndex = "-1";
    screenReset();
}

function init() {
    countNum.innerHTML = count;
    playBtn.addEventListener("click", () => {
        if(playBtn.classList.contains("started")){ // pause clicked 
            clearInterval(timer);
            // 창 띄우기 : resume or stop(끝내기) 선택하는 창
            optionScreenLayer.style.zIndex = "9"; // 선택창 popup
            console.log("it's paused !");
        } else { // 처음 시작할때 
            start();
        }
    });
    resumeBtn.addEventListener("click", handleResume);
    stopBtn.addEventListener("click", handleStop);
    retryBtn.addEventListener("click", handleRetry);
}

init();

