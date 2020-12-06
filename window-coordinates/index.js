const special = document.querySelector(".special");
const btnDown = document.querySelector(".btn-move100px");
const btnTop = document.querySelector(".btn-goToTop");
const btnSpecial = document.querySelector(".btn-goToSpecial");

const handleClick = (event) => {
    const clientX = event.clientX;
    const clientY = event.clientY;
    const pageX = event.pageX;
    const pageY = event.pageY;
    console.log("client: ", clientX, ", " + clientY);
    console.log("page: ", pageX, ", ", pageY);
}

function init() {
    window.addEventListener("click", handleClick);
    const getSpecial = special.getBoundingClientRect();
    btnDown.addEventListener("click", () => {
        scrollBy(0, 100);
    });
    btnTop.addEventListener("click", () => {
        scroll(0, 0);
    });
    btnSpecial.addEventListener("click", () => {
        scroll(getSpecial.x, getSpecial.y);
    });
}

init();

