
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

buttonBlock.addEventListener('click', (event) => {

  let target = event.target;
  if(Number.isInteger(+target.value)){
    span.setAttribute('style', 'color:#00000050;');
    if(operand === 'divd' && arrInput.length === 0 && target.value === '0') {
      trouble.textContent = 'You can\'t divide by "0" ';
    }else{
      trouble.textContent = '';
    };
    if(target.value === '0'){
      if((((arrInput.length === 0 && arrInput.join('') !== '0') || (arrInput.join('') === '-' && arrInput.join('') !== '-0')) || (arrInput.includes('.') && arrInput.length < 21) || arrInput[0] !== '0') && (arrInput.join('') !== '-0')) arrInput.push(target.value);
    }else{
      if((arrInput[0] === '0' && arrInput.length === 1) || (arrInput.length === 2 && arrInput.join('') === '-0')){
        arrInput.pop();
        arrInput.push(target.value);
      }else if((arrInput.includes('.') && arrInput.length < 19) || !arrInput.includes('.')){
        arrInput.push(target.value);
      };
    };
  };

  if(target.value === 'dot') {
    if(arrInput.length === 0 || arrInput.length === 1 && arrInput[0] === '-'){
      arrInput.push('0');
      arrInput.push('.');
    }else if(!arrInput.includes('.')){
      arrInput.push('.');
    };
  };

  if(target.value === 'mark'){
    if((arrInput[0] !== '-')){
      arrInput.unshift('-');
    }else if((arrInput[0] === '-')){
      arrInput.shift();
    };
  };

  if(target.value === 'backspase'){
    if(arrInput.length > 0) arrInput.pop();
  };

  variable = parseFloat(arrInput.join(''));

  if(arrInput.length > 18 || (arrInput.includes('.') && arrInput.length === variable.length)){
    calcLine.textContent = variable;
  }else{
    calcLine.textContent = arrInput.join('');
  };

  if(Object.keys(operations).includes(target.value)){
    trouble.textContent = '';
    span.setAttribute('style', 'color:#000000;');
    sign = operations[target.value]['sign'];
    if(arrInput.length === 0) variable = result;
    if(operand){
      if(operand === 'sum') result = result + variable;
      if(operand === 'diff') result = result - variable;
      if(operand === 'mult') result = result * variable;
      if(operand === 'divd') result = result / variable;
      calcLine.textContent = result;
      span.textContent = sign;
      operand = operations[target.value]['operand'];
      arrInput = [];
    }else{
      result = variable;
      calcLine.textContent = result;
      span.textContent = sign;
      operand = operations[target.value]['operand'];
      arrInput = [];
    };
  };

  if(target.value === 'equals'){
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

  if(target.value === 'clear'){
    arrInput = [];
    result = 0;
    variable = 0;
    operand = '';
    sign = '';
    calcLine.textContent = '';
    trouble.textContent = '';
    span.textContent = '';
  };
});
