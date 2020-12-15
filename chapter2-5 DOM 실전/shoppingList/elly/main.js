const items = document.querySelector('.items');
const input = document.querySelector('.footer__input');
const addBtn = document.querySelector('.footer__button');
let text;
function onAdd() {
    // 1. 사용자가 입력한 텍스트를 받아옴
    text = input.value;
    if(text === ''){
        input.focus();
        return;
    }
    console.log(text);
    // 2. 새로운 아이콘을 만듦 (텍스트 + 삭제 버튼)
    const item = createItem();
    // 3. items 컨테이너 안에 새로 만든 아이템을 추가한다
    items.appendChild(item);
    // 3.5 새로 추가된 아이템으로 이동, 스크롤링(stress test 이후 추가 됨)
    item.scrollIntoView({block: 'center'});
    // 4. 인풋을 초기화 한다.
    input.value = '';
    input.focus(); // plus버튼을 클릭했을땐 자동으로 focus가 되지 않기때문에 추가해줌
}

function createItem() {
    const itemRow = document.createElement('li');
    itemRow.setAttribute('class', 'item__row');

    const item = document.createElement('div');
    item.setAttribute('class', 'item');

    const span = document.createElement('span');
    span.setAttribute('class', 'item__name');
    span.innerText = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'item__delete');
    deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteBtn.addEventListener('click', () => {
        items.removeChild(itemRow);
    });

    const itemDivider = document.createElement('div');
    itemDivider.setAttribute('class', 'item__divider');

    item.appendChild(span);
    item.appendChild(deleteBtn);

    itemRow.appendChild(item);
    itemRow.appendChild(itemDivider);

    return itemRow;
}

addBtn.addEventListener('click', () => {
    onAdd();
});

input.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        onAdd();
    }
});