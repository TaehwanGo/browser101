const target = document.querySelector(".target");
const tag = document.querySelector(".tag");
const horizontal = document.querySelector(".horizontal");
const vertical = document.querySelector(".vertical");

addEventListener('load', () =>{ // window가 load가 될때
    const targetRect = target.getBoundingClientRect();
    const targetHalfWidth = targetRect.width / 2;
    const targetHalfHeight = targetRect.height / 2;
    console.log(targetRect);

    const moveTarget = (event) => {
        const x = event.clientX;
        const y = event.clientY;

        // vertical.style.left = `${x}px`;
        vertical.style.transform = `translateX(${x}px)`;
        // horizontal.style.top = `${y}px`;
        horizontal.style.transform = `translateY(${y}px)`;

        // target.style.left = `${x}px`;
        // target.style.top = `${y}px`;
        target.style.transform = `translate(${x - targetHalfWidth}px, ${y - targetHalfHeight}px)`;
        
        // tag.style.left = `${x}px`;
        // tag.style.top = `${y}px`;
        tag.style.transform = `translate(${x}px, ${y}px)`;
        tag.innerHTML = `${x}px, ${y}px`;
    }

    window.addEventListener("mousemove", moveTarget);
})