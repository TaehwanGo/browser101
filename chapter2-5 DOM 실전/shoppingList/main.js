const inputForm = document.querySelector("#jsInputForm");
const inputText = document.querySelector(".input_item");
const list = document.querySelector(".list");
const plusBtn = document.querySelector(".plusBtn");

function handlePlusBtn(){
    makeItem();
}

function removeItem() {
    // console.log(this);
    this.parentNode.remove();
}

function makeItem() {
    const textFromInput = inputText.value;
    if(textFromInput === ''){
        inputText.focus();
        return;
    }
    const textToSpan = document.createElement("span");
    textToSpan.textContent = textFromInput;
    // console.log(textToSpan);
    const icon = document.createElement("i");
    icon.setAttribute("class", "fas fa-trash-alt");
    icon.addEventListener("click", removeItem);

    const itemContainer = document.createElement("li");
    itemContainer.setAttribute("class", "list_item");
    // itemContainer.innerHTML = `
    //     ${textToSpan.outerHTML}
    //     <i class="fas fa-trash-alt"></i>
    // `;    
    itemContainer.appendChild(textToSpan);
    itemContainer.appendChild(icon);
    
    list.appendChild(itemContainer); 
    itemContainer.scrollIntoView({block: "center"}); // appendChild로 붙인 다음에 scrollIntoView를 붙여 줘야 됨
    inputText.value = "";
    inputText.focus();
}

function handleSubmit(event) {
    event.preventDefault();
    makeItem();
}


function init() {
    inputForm.addEventListener("submit", handleSubmit);
    plusBtn.addEventListener("click", handlePlusBtn);
}

init();