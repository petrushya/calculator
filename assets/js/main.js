const buttonBlock = document.querySelector('.buttonBlock');
const calcLine = document.querySelector('.calcLine');
const trouble = document.querySelector('.trouble');

let arrInput = [];
let operand = '';
let result = null;
let variable = null;

const operators = ['add', 'subtract', 'multiply', 'divide'];
const operands = ['sum', 'diff', 'mult', 'divd'];

buttonBlock.addEventListener('click', (event) => {
  let target = event.target;
  trouble.textContent = '';

  if(Number.isInteger(+target.value)){
    if(target.value === '0'){
      if((arrInput.length === 0 || (arrInput.length === 1 && arrInput[0] === '-')) || (arrInput.includes('.') && arrInput.length < 21) || (!arrInput.includes('.') && arrInput[0] !== '0')) arrInput.push(target.value);
    }else if(target.value !== '0'){
      if((arrInput[0] === '0' && arrInput.length === 1) || (arrInput.length === 2 && arrInput.join('').includes('-0'))){
        arrInput.pop();
        arrInput.push(target.value);
      }else if((arrInput.includes('.') && arrInput.length < 19) || (!arrInput.includes('.'))){
        arrInput.push(target.value);
      };
    };
  };

  if(target.value === 'dot') {
    if(arrInput.length === 0 || arrInput.join('') === '-'){
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
  
  if(arrInput.length > 0){
    if(arrInput.length > 18 || (arrInput.includes('.') && arrInput.length === variable.length)){
      calcLine.textContent = variable;
      }else{
      calcLine.textContent = arrInput.join('');
    };
  }else{
    calcLine.textContent = arrInput.join('');
  };

  if(operators.includes(target.value)){
    if(arrInput.length === 0 || !variable){
      trouble.textContent = 'variable not inserted or invalid';
      calcLine.textContent = '';
    }else if(operand){
      if(operand === 'sum')	result = result + variable;
      if(operand === 'diff') result = result - variable;
      if(operand === 'mult') result = result * variable;
      if(operand === 'divd')	result = result / variable;
      switch(operands[operators.indexOf(target.value)]){
        case 'sum':
          operand = 'sum';
          calcLine.textContent = `${result} +`;
          break;
        case 'diff':
          operand = 'diff';
          calcLine.textContent = `${result} -`;
          break;
        case 'mult':
          operand = 'mult';
          calcLine.textContent = `${result} *`;
          break;
        default:
          calcLine.textContent = `${result} /`;
        	operand = 'divd';
    	};
      trouble.textContent = '';
      arrInput = [];
    }else{
      result = variable;
      switch(operands[operators.indexOf(target.value)]){
        case 'sum':
          operand = 'sum';
          calcLine.textContent = `${result} +`;
          break;
        case 'diff':
          operand = 'diff';
          calcLine.textContent = `${result} -`;
          break;
        case 'mult':
          operand = 'mult';
          calcLine.textContent = `${result} *`;
          break;
        default:
          operand = 'divd';
          calcLine.textContent = `${result} /`;
      };
      trouble.textContent = '';
      arrInput = [];
    };
  };
  
  if(target.value === 'equals'){
    if(arrInput.length === 0 || !variable){
      trouble.textContent = 'variable not inserted or invalid';
      calcLine.textContent = '';
    }else if(operand){
      if(operand === 'sum')	result = result + variable;
      if(operand === 'diff') result = result - variable;
      if(operand === 'mult') result = result * variable;
      if(operand === 'divd')	result = result / variable;
      trouble.textContent = '';
      calcLine.textContent = `${result}`;
      arrInput = `${result}`.split('');
      variable = result;
      operand = '';
    };
  };

  if(target.value === 'clear'){
    arrInput = [];
    result = null;
    variable = null;
    operand = '';
    calcLine.textContent = '';
    trouble.textContent = '';
  };
});










