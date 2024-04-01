
const buttonBlock = document.querySelector('.buttonBlock');
const calcLine = document.querySelector('.calcLine');
const trouble = document.querySelector('.trouble');

let arrInput = [];
let operand = '';
let result = 0;
let variable = 0;
let sign = '';
const operations = {add: '+', subtract: '-', multiply: '*', divide: '/'};
const namberCase = '0123456789';

function counting(qualifier, resValue, varValue) {
  if(qualifier === 'add') return resValue + varValue;
  if(qualifier === 'subtract') return resValue - varValue;
  if(qualifier === 'multiply') return resValue * varValue;
  if(qualifier === 'divide') return resValue / varValue;
  if(qualifier === '') return resValue;
}

function calculate(inputValue) {

  const calcValue = parseFloat(arrInput.join(''));
  const inputValueNamber = inputValue.split('').filter((character) => namberCase.includes(character)).join('');
  if(inputValueNamber !== ''){
    if(inputValueNamber === '0'){
      if(!Number.isInteger(calcValue) || calcValue !== 0 || (arrInput.includes('.') && arrInput.length < 21)) arrInput.push(inputValueNamber);
    }else{
      if(calcValue === 0 && !arrInput.includes('.')){
        arrInput.pop();
        arrInput.push(inputValueNamber);
      }else if((arrInput.includes('.') && arrInput.length < 19) || !arrInput.includes('.')){
        arrInput.push(inputValueNamber);
      };
    };
  };

  if(inputValue === ('dot')) {
    if(!Number.isInteger(calcValue)){
      arrInput.push('0');
      arrInput.push('.');
    }else if(!arrInput.includes('.')){
      arrInput.push('.');
    };
  };

  if(inputValue === ('mark')){
    arrInput.join('').includes('-') ? arrInput.shift() : arrInput.unshift('-');
  };

  if(inputValue.toLowerCase() === 'backspace'){
    if(arrInput.length === 0){
      operand = '';
      sign = '';
      trouble.textContent = `${result} ${sign}`;
      calcLine.textContent = `${result} ${sign}`;
      trouble.removeAttribute('style');
    }else{
      arrInput.pop();
      calcLine.textContent = `${result}`;
    };
  };

  variable = parseFloat(arrInput.join(''));

  if(operand === 'divide' && (arrInput.length === 0 || variable === 0 || variable === -0)){
      trouble.textContent = 'You can\'t divide by "0"';
      trouble.style.color = '#8b0000';
    }else if(result && operand !== ''){
      trouble.removeAttribute('style');
      trouble.textContent = `${result} ${sign}`;
    };

  if(arrInput.length > 18 || (arrInput.includes('.') && arrInput.length === variable.length)){
    calcLine.textContent = variable;
  }else if(arrInput.length !== 0){
    calcLine.textContent = arrInput.join('');
  }else if(arrInput.length === 0 && result){
    calcLine.textContent = `${result}${sign}`;
  }else{
    calcLine.textContent = arrInput.join('');
  };

  if(Object.keys(operations).includes(inputValue.toLowerCase())){
    sign = operations[inputValue.toLowerCase()];
    if(operand === 'divide' && (variable === 0 || variable === -0)){
      trouble.textContent = 'Incorrect denominator.';
    }else{
      if(arrInput.length === 0) variable = result;
      if(operand){
        result = counting(operand, result, variable);
        calcLine.textContent = result;
        trouble.textContent = `${result} ${sign}`;
        operand = inputValue.toLowerCase();
        arrInput = [];
      }else{
        result = variable;
        trouble.textContent = `${result} ${sign}`;
        calcLine.textContent = `${result}`;
        operand = inputValue.toLowerCase();
        arrInput = [];
      };
    };
  };

  if(inputValue === 'equal'){
    if(operand === 'divide' && (variable === 0 || variable === -0)){
      trouble.textContent = 'Incorrect denominator.';
    }else{
      if(arrInput.length === 0) variable = result;
      result = counting(operand, result, variable);
      calcLine.textContent = `${result}`;
      trouble.textContent = '';
      sign = '';
      operand = '';
      arrInput = [];
    };
  };

  if(inputValue === 'clear'){
    arrInput = [];
    result = 0;
    variable = 0;
    operand = '';
    sign = '';
    calcLine.textContent = '';
    trouble.textContent = '';
  };
};

buttonBlock.addEventListener('click', (event) => {
  let oneClick = event.target.id;
  calculate(oneClick);
});

window.addEventListener('keyup', (event) => {
  let pressKey = event.key;
  let getKey = ''
  switch(pressKey){
    case '+':
      getKey = 'add';
      break;
    case '-':
      getKey = 'subtract';
      break;
    case '*':
      getKey = 'multiply';
      break;
    case '/':
      getKey = 'divide';
      break;
    case '=':
    case 'Enter':
      getKey = 'equal';
      break;
    case '.':
      getKey = 'dot';
      break;
    case '\\':
      getKey = 'mark';
      break;
    case 'Delete':
      getKey = 'clear';
      break;
    default:
      getKey = event.key;
  };
  calculate(getKey);
});


