const buttonNumbers = document.querySelectorAll("[data-number]");
const buttonOperations = document.querySelectorAll("[data-operation]");
const allCleanButton = document.querySelector("[data-all-clean]")
const buttonIdem = document.querySelector("[data-idem]");

const oldContentDisplay = document.getElementById("old-content-display");
const newContentDisplay = document.getElementById("new-content-display")

console.log(allCleanButton);

class Calculator{
    constructor(oldContentDisplay, newContentDisplay){
        this.oldContentDisplay = oldContentDisplay;
        this.newContentDisplay = newContentDisplay
        this.clean();
    }
    calculate(){
        let result;

        let floatOldDigits = parseFloat(this.oldDigits);
        let floatNewDigits = parseFloat(this.newDigits);

        switch(this.operation){
            case "+":
                result = floatOldDigits +floatNewDigits;
                break;
            case "-":
                result = floatOldDigits -floatNewDigits;
                break;
            case "x":
                result = floatOldDigits *floatNewDigits;
                break;
            case "/":
                result = floatOldDigits /floatNewDigits;
                break;
            case "%":
                
                result = floatOldDigits*(floatNewDigits/100);
                break;
            case "^":
                result = Math.pow(floatOldDigits, floatNewDigits);
                break;
            case "x²":
                result = math.pow(floatOldDigits, 2);
                //this.operation = undefined;
                break;
            case "√":
                
                if(isNaN(floatOldDigits)){
                    alert("entrei")
                    floatOldDigits = 1;
            
                }
                result = floatOldDigits*Math.sqrt(floatNewDigits);
                break;
            default:
                return;
        }

        this.newDigits = result;
        this.operation = undefined;
        this.oldDigits = "";
    }
    deleteDigits(){
        this.newDigits = this.newDigits.substring(0, this.newDigits.length-1);
        console.log(this.newDigits)
    }
    addOperation(operation){
        if(this.oldDigits != ""){
            this.calculate();
        }
        this.operation = operation;
        this.oldDigits = this.newDigits;
        this.newDigits = ""
    }
    addNumber(number){
        number = number.replace(",", ".")
        if(this.newDigits.includes(".") && number == "." || this.newDigits == "" && number == ".") return;
        this.newDigits += number;
    }
    clean(){
        this.oldDigits = "";
        this.newDigits = "";
        this.operation = undefined;
    }
    update(){
        oldContentDisplay.innerText = `${this.oldDigits} ${this.operation || ""}`;
        newContentDisplay.innerText = this.newDigits;
    }
}
const calculadora = new Calculator(oldContentDisplay, newContentDisplay);
allCleanButton.addEventListener("dblclick", () =>{

    calculadora.clean();
    calculadora.update();
})
allCleanButton.addEventListener("click", () =>{
    calculadora.deleteDigits();
    calculadora.update();
})
for(const buttonNumber of buttonNumbers){
    buttonNumber.addEventListener("click", () =>{
        calculadora.addNumber(buttonNumber.innerText);
        calculadora.update();
    })
}
for(const buttonOperation of buttonOperations){
    buttonOperation.addEventListener("click", () =>{
        calculadora.addOperation(buttonOperation.innerText);
        calculadora.update();
    })
}
buttonIdem.addEventListener("click", () =>{
    calculadora.calculate();
    calculadora.update();
})


