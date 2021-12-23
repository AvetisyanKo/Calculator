
let numberFirst = "";
let numberSecond = "";
let sign = "";
let finish = false;
let fontSize = 4;
let firstDotCount = 0;
let secontDotCount = 0;

let digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
let mathAction = ["-", "+", "*", "/", "%"];

const screenOut = document.querySelector(".calc-screen p");
const numberStyle = document.querySelector(".number");

function fontSize1() {
    if ((numberFirst + "").length >= 8) {
        return fontSize = 2.1;
    }
    return fontSize = 4;
}

function clearAll() {
    numberFirst = "";
    numberSecond = "";
    sign = "";
    screenOut.textContent = 0;
    fontSize = 2;
}

function plusOrMinus(number) {
    if (number === "" || (number.length === 1 && number[0] === "0")) {
        return number;
    } else if (number[0] !== "-") {
        number = "-" + number;
        screenOut.textContent = number;
    } else {

        number = number.substring(1, number.length);
        screenOut.textContent = number;
    }
    return number;
}

document.querySelector(".as").onclick = clearAll;

document.querySelector(".buttons").onclick = (ev) => {
    if (!ev.target.classList.contains("btn")) return;
    if (ev.target.classList.contains("ac")) return;

    numberStyle.style.fontSize = fontSize1() + "rem";

    let key = ev.target.textContent;

    if (key === ".") {
        if (sign !== "" && secontDotCount < 1) {
            ++secontDotCount;
            numberSecond += key;
            screenOut.textContent = numberSecond;
            return;
        }
        if (sign === "" && firstDotCount < 1) {
            ++firstDotCount;
            numberFirst += key;
            screenOut.textContent = numberFirst;
            return;
        }
        return;
    }

    if (key === "+/-") {
        if (sign !== "") {
            numberSecond = plusOrMinus(numberSecond);
        } else {
            numberFirst = plusOrMinus(numberFirst);
        }
    }

    if (digits.includes(key)) {
        if (numberFirst.length === 1 && numberFirst[0] === "0" && key !== ".") return;
        if (numberSecond.length === 1 && numberSecond[0] === "0" && key !== ".") return;
        if (numberSecond.length >= 16) return;
        if (numberFirst.length >= 16 && sign !== "") {
            numberSecond += key;
            screenOut.textContent = numberSecond;
            return;
        } else if (numberFirst.length >= 16 && sign === "") {
            key = "";
        }

        if (numberSecond === "" && sign === "") {
            numberFirst += key;
            screenOut.textContent = numberFirst;
        } else if (numberSecond !== "" && sign !== "") {
            numberSecond += key;
            screenOut.textContent = numberSecond;
        } else {
            numberSecond = key;
            finish = false;
            screenOut.textContent = numberSecond;
        }
    }

    if (mathAction.includes(key)) {
        sign = key
        screenOut.textContent = numberFirst;
    }

    if (key === "=") {
        if (numberSecond === "") numberSecond = numberFirst;
        switch (sign) {
            case "%":
                numberFirst = ((+numberFirst) * (+numberSecond)) / 100;
                break;
            case "+":
                numberFirst = (+numberFirst) + (+numberSecond);
                break;
            case "-":
                numberFirst = (+numberFirst) - (+numberSecond);
                break;
            case "*":
                numberFirst = (+numberFirst) * (+numberSecond);
                break;
            case "/":
                if (numberSecond === "0") {
                    screenOut.textContent = "Error";
                    numberFirst = "";
                    numberSecond = "";
                    sign = "";
                    finish = true;
                    return;
                }
                numberFirst = (+numberFirst) / (+numberSecond);
                break;
        }
        if ((numberFirst + "").length <= 16) {
            finish = true;
            screenOut.textContent = numberFirst += "";
            numberSecond = "";
            sign = "";
            return;
        }
        screenOut.textContent = "Overloaded";
    }
}
