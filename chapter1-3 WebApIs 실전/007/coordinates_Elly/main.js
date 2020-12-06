const target = document.querySelector(".target");
const tag = document.querySelector(".tag");
const horizontal = document.querySelector(".horizontal");
const vertical = document.querySelector(".vertical");

const moveTarget = (event) => {
    const x = event.clientX;
    const y = event.clientY;

    vertical.style.left = `${x}px`;
    horizontal.style.top = `${y}px`;

    target.style.left = `${x}px`;
    target.style.top = `${y}px`;
    
    tag.style.left = `${x}px`;
    tag.style.top = `${y}px`;
    tag.innerHTML = `${x}px, ${y}px`;
}

window.addEventListener("mousemove", moveTarget);