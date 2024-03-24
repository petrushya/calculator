const buttonBlock = document.querySelector('.buttonBlock');
const calcLine = document.querySelector('.calcLine');

function getSum (resultArg, varArg) {return resultArg + varArg};
function getDiff (resultArg, varArg) {return resultArg - varArg};
function getMultipl (resultArg, varArg) {return resultArg * varArg};
function getQuot (resultArg, varArg) {return resultArg / varArg};

let arrInput = [];
buttonBlock.addEventListener('click', (event) => {
  let variable;
  let target = event.target;
  if(Number.isInteger(+target.value)){
    if(target.value === '0'){
      if((arrInput.length === 0 || (arrInput.length === 1 && arrInput[0] === '-')) || (arrInput.includes('.') && arrInput.length < 21) || (!arrInput.includes('.') && arrInput[0] !== '0')) arrInput.push(target.value);
    }else if(target.value !== '0'){
      if((arrInput[0] === '0' && !arrInput.includes('.')) || (arrInput.includes('.') && arrInput.length < 19) || (!arrInput.includes('.'))) arrInput.push(target.value);
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
  console.log(arrInput);
  console.log(variable);
});

