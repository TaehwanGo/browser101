const imgTarget = document.querySelector(".target");
const textBox = document.querySelector(".text-box");
const lineX = document.querySelector(".lineX");
const lineY = document.querySelector(".lineY");

// 이미지의 중앙 위치를 현재 마우스 좌표로 이동
// 이미지의 크기를 구해서 중앙 좌표점 구하기
// const imgRect = imgTarget.getBoundingClientRect();
// console.log(imgRect);
// const center = (imgRect.left + imgRect.right)/2;

const moveTarget = (event) => {
    // 현재 마우스 위치를 콘솔로 찍어보자
    // console.log(`x : ${event.pageX}, y : ${event.pageY}`); // event.pageX, event.pageY로 현재 마우스 위치값 알 수 있음 
    // 마우스의 좌표위치로 이미지 태그위치를 옮겨보자
    const targetX = event.pageX-50;
    const targetY = event.pageY-50;

    imgTarget.style.left = `${targetX}px`;
    imgTarget.style.top = `${targetY}px`;

    textBox.style.left = `${event.pageX+18}px`;
    textBox.style.top = `${event.pageY+18}px`;
    textBox.innerHTML = `${event.pageX}px, ${event.pageY}px`;

    lineX.style.top = `${event.pageY-2}px`;
    lineY.style.left = `${event.pageX-2}px`;
}

window.addEventListener("mousemove", moveTarget);