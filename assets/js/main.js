
const buttonBlock = document.querySelector('.buttonBlock');
const calcLine = document.querySelector('.calcLine p');
const trouble = document.querySelector('.trouble');
const span = document.querySelector('.calcLine span');

let arrInput = [];
let operand = '';
let result = 0;
let variable = 0;
let sign = '';
const operations = {add: {operand: 'sum', sign: '+'},
                    subtract: {operand: 'diff', sign: '-'},
                    multiply: {operand: 'mult', sign: '*'},
                    divide: {operand: 'divd', sign: '/'}
                   };

function calculate(putValue) {
  if(Number.isInteger(+putValue)){
    span.setAttribute('style', 'color:#00000050;');
    if(operand === 'divd' && arrInput.length === 0 && putValue === '0') {
      trouble.textContent = 'You can\'t divide by "0" ';
    }else{
      trouble.textContent = '';
    };
    if(putValue === '0'){
      if((((arrInput.length === 0 && arrInput.join('') !== '0') || (arrInput.join('') === '-' && arrInput.join('') !== '-0')) || (arrInput.includes('.') && arrInput.length < 21) || arrInput[0] !== '0') && (arrInput.join('') !== '-0')) arrInput.push(putValue);
    }else{
      if((arrInput[0] === '0' && arrInput.length === 1) || (arrInput.length === 2 && arrInput.join('') === '-0')){
        arrInput.pop();
        arrInput.push(putValue);
      }else if((arrInput.includes('.') && arrInput.length < 19) || !arrInput.includes('.')){
        arrInput.push(putValue);
      };
    };
  };

  if(putValue === 'dot') {
    if(arrInput.length === 0 || arrInput.length === 1 && arrInput[0] === '-'){
      arrInput.push('0');
      arrInput.push('.');
    }else if(!arrInput.includes('.')){
      arrInput.push('.');
    };
  };

  if(putValue === 'mark'){
    if((arrInput[0] !== '-')){
      arrInput.unshift('-');
    }else if((arrInput[0] === '-')){
      arrInput.shift();
    };
  };

  if(putValue === 'Backspace') arrInput.pop();

  variable = parseFloat(arrInput.join(''));

  if(arrInput.length > 18 || (arrInput.includes('.') && arrInput.length === variable.length)){
    calcLine.textContent = variable;
  }else{
    calcLine.textContent = arrInput.join('');
  };

  if(Object.keys(operations).includes(putValue)){
    trouble.textContent = '';
    span.removeAttribute('style');
    sign = operations[putValue]['sign'];
    if(arrInput.length === 0) variable = result;
    if(operand){
      if(operand === 'sum') result = result + variable;
      if(operand === 'diff') result = result - variable;
      if(operand === 'mult') result = result * variable;
      if(operand === 'divd') result = result / variable;
      calcLine.textContent = result;
      span.textContent = sign;
      operand = operations[putValue]['operand'];
      arrInput = [];
    }else{
      result = variable;
      calcLine.textContent = result;
      span.textContent = sign;
      operand = operations[putValue]['operand'];
      arrInput = [];
    };
  };

  if(putValue === 'equals'){
    trouble.textContent = '';
    if(arrInput.length === 0) variable = result;
    if(operand === 'sum') result = result + variable;
    if(operand === 'diff') result = result - variable;
    if(operand === 'mult') result = result * variable;
    if(operand === 'divd') result = result / variable;
    calcLine.textContent = result;
    span.textContent = '';
    operand = '';
    arrInput = [];
  };

  if(putValue === 'clear'){
    arrInput = [];
    result = 0;
    variable = 0;
    operand = '';
    sign = '';
    calcLine.textContent = '';
    trouble.textContent = '';
    span.textContent = '';
  };
}

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
      getKey = 'equals';
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


