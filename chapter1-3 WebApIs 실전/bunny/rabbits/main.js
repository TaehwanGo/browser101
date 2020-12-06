const rabbit = document.querySelector('.rabbit');
const btnRabbit = document.querySelector('.btnRabbit');


const rabbitRect = rabbit.getBoundingClientRect();

console.log(rabbitRect);

const x = rabbitRect.x;
const y = rabbitRect.y;

console.log(x, y); // flex를 써서 값이 잘 안나오는 것 같다.


btnRabbit.addEventListener('click', () => {
    // window.scrollTo(x, y);
    rabbit.scrollIntoView({behavior: "smooth"});

});


