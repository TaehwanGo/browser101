class Counter {
    constructor(runEveryFiveTimes) {
        this.counter = 0;
        this.callback = runEveryFiveTimes;
    }

    increase() {
        this.counter++;
        console.log(this.counter);
        if(this.counter % 5 === 0) {
            this.callback && this.callback(this.counter);
        }
    }
}

function printSomething(num) {
    console.log(`Wow! ${num}`);
}
function alertNum(num) {
    alert(num);
}

const printIncrease = new Counter(printSomething);
const alertIncrease = new Counter(alertNum);

for(let i=0; i<5; i++){
    printIncrease.increase();
    alertIncrease.increase();
}