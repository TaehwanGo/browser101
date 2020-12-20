class Data {
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
}

class Print {
    constructor(data){
        this.data = data;
    }
    print() {
        this.data && console.log(this.data.name);
    }
}

const tony = new Data('tony', 30); 
// const tonyPrint = new Print(tony); 
const tonyPrint = new Print({name:'tony', age: 30}); 

tonyPrint.print();