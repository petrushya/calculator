const buttonBlock = document.querySelector('.buttonBlock');
const calcLine = document.querySelector('.calcLine');
const trouble = document.querySelector('.trouble');

function getSum (resultArg, varArg) {return resultArg + varArg};
function getDiff (resultArg, varArg) {return resultArg - varArg};
function getMultipl (resultArg, varArg) {return resultArg * varArg};
function getQuot (resultArg, varArg) {return resultArg / varArg};

let arrInput = [];
let operand = '';
let resSum = null;
let variable;

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

  if(arrInput.length > 0){
    variable = parseFloat(arrInput.join(''));
    if(arrInput.length > 18 || (arrInput.includes('.') && arrInput.length === variable.length)){
      calcLine.textContent = variable;
      }else{
      calcLine.textContent = arrInput.join('');
    };
  }else{
    calcLine.textContent = arrInput.join('');
  };


  if(target.value === 'add'){
    if(arrInput.length === 0 || !variable){
      trouble.textContent = 'variable not inserted or invalid';
      calcLine.textContent = '';
    }else if(operand === 'sum'){
      trouble.textContent = '';
    	resSum = getSum(resSum, variable);
      calcLine.textContent = `${resSum} +`;
      arrInput = [];
      operand = 'sum';
    }else{
      trouble.textContent = '';
      resSum = variable;
      calcLine.textContent = `${resSum} +`;
      arrInput = [];
      operand = 'sum';
    };
  };
  
  if(target.value === 'equals'){
    if(arrInput.length === 0 || !variable){
      trouble.textContent = 'variable not inserted or invalid';
      calcLine.textContent = '';
    }else if(operand === 'sum'){
      trouble.textContent = '';
    	resSum = getSum(resSum, variable);
      sessionStorage.setItem('result', resSum);
      calcLine.textContent = `${resSum}`;
      arrInput = `${resSum}`.split('');
      variable = resSum;
      operand = '';
    };
  };

  console.log(`arrInput - ${arrInput}`);
  console.log(`variable - ${variable}`);
  console.log(`operand - ${operand}`);
  console.log(`resSum - ${resSum}`);
});










