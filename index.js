const inquirer = require('inquirer');

function validateInput(userInput, answersHash) {
    const matchSequentialOperators = /[-+/*](?=[-+/*])/;
    const matchMissingOperand = /[-+/*](?!\d+)/;
    if (userInput.match(matchSequentialOperators)) {
        return "Invalid format: too many operators.";
    } else if (userInput.match(matchMissingOperand)) {
        return "Invalid format: missing operand."
    } else {
        return true;
    }
}

function doMultiplication(calculation) {
    let calc = calculation;
    const matchMult = /\d+\*\d+/;
    if (calc.match(matchMult)) {
        do {
            let operation = calc.match(matchMult)[0];
            let operand1 = operation.match(/(\d+)\*/)[1];
            let operand2 = operation.match(/\*(\d+)/)[1];
            let newOperand = (Number(operand1) * Number(operand2)).toString();
            calc = calc.replace(matchMult, newOperand);
        } while (calc.match(/\*/));
    }
    return calc;
}

function doDivision(calculation) {
    let calc = calculation;
    const matchDiv = /\d+\/\d+/;
    if (calc.match(matchDiv)) {
        do {
            let operation = calc.match(matchDiv)[0];
            let operand1 = operation.match(/(\d+)\//)[1];
            let operand2 = operation.match(/\/(\d+)/)[1];
            let newOperand = (Number(operand1) / Number(operand2)).toString();
            calc = calc.replace(matchDiv, newOperand);
        } while (calc.match(/\//));
    }
    return calc;
}

function doAddition(calculation) {
    let calc = calculation;
    const matchAdd = /\d+\+\d+/;
    if (calc.match(matchAdd)) {
        do {
            let operation = calc.match(matchAdd)[0];
            let operand1 = operation.match(/(\d+)\+/)[1];
            let operand2 = operation.match(/\+(\d+)/)[1];
            let newOperand = (Number(operand1) + Number(operand2)).toString();
            calc = calc.replace(matchAdd, newOperand);
        } while (calc.match(/\+/));
    }
    return calc;
}

function doSubtraction(calculation) {
    let calc = calculation;
    const matchSub = /\d+\-\d+/;
    if (calc.match(matchSub)) {
        do {
            let operation = calc.match(matchSub)[0];
            let operand1 = operation.match(/(\d+)\-/)[1];
            let operand2 = operation.match(/\-(\d+)/)[1];
            let newOperand = (Number(operand1) - Number(operand2)).toString();
            calc = calc.replace(matchSub, newOperand);
        } while (calc.match(/\-/));
    }
    return calc;
}

const promptUser = () => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'calculation',
        message: 'Enter a line of text to calculate: ',
        validate: validateInput
      }
    ]).then(answers => {
        let calc = answers.calculation;
        calc = doMultiplication(calc);
        calc = doDivision(calc);
        calc = doAddition(calc);
        calc = doSubtraction(calc);
        console.log(calc);
    });
}

promptUser();
