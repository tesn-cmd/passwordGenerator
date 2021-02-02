const outPut = document.getElementById('output');
const passWordLength = document.getElementById('length');
const upperCase = document.getElementById('uppercase');
const lowerCase = document.getElementById('lowercase');
const symbolEl = document.getElementById('symbol');
const numberEl = document.getElementById('number');
const clipBoard = document.getElementById('clipBoard');
const genBtn = document.getElementById('genBtn');
const clipText = document.getElementById('clipText');
const clipContainer = document.getElementById('clipContainer');

genBtn.addEventListener('click', ()=> {
  const length = +passWordLength.value;
  const upper = upperCase.checked;
  const lower = lowerCase.checked;
  const symbols = symbolEl.checked;
  const numbers = numberEl.checked;

  outPut.value = generatePassword(upper, lower, symbols, numbers, length);
});

//clipBoard
clipBoard.addEventListener('click', ()=> {
  const textarea = document.createElement('textarea');
  if (!outPut.value) return '';

  textarea.value = outPut.value;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  clipText.innerText = 'copied to clipboard';
  clipContainer.style.display = 'block';
  remove();
})

function remove() {
  setTimeout(()=> {
    clipContainer.style.display = 'none';
  },
    2000);
}
//create arrays
const lowerAmount = randomValues(26, 97);
const upperAmount = randomValues(26, 65);
const numberAmount = randomValues(10, 48);
const symbolAmount = randomValues(14, 33)
.concat(randomValues(6, 58))
.concat(randomValues(5, 91))
.concat(randomValues(3, 123));

const mapFunc = {
  upper: upperAmount,
  lower: lowerAmount,
  symbols: symbolAmount,
  numbers: numberAmount
}

function generatePassword(upper, lower, symbols, numbers, length) {
  let checkedCount = upper+lower+symbols+numbers;
  if (checkedCount === 0) return '';
  //filter out unchecked elements
  let checkedArray = [{
    upper
  },
    {
      lower
    },
    {
      symbols
    },
    {
      numbers
    }].filter(item=>Object.values(item)[0]);

  let generatedPassword = "";
  let charactersArray = [];
  //create array of all checked el chars
  checkedArray.forEach(check=> {
    let key = Object.keys(check)[0];
    charactersArray = charactersArray.concat(mapFunc[key])
  });
  //get random characters
  for (let i = 0; i < length; i ++) {
    let character = charactersArray[Math.floor(Math.random()*charactersArray.length)];

    generatedPassword += character;
  }
  return generatedPassword;
}
//array of characters generator
function randomValues(amount, start) {
  const array = [];
  for (let i = start; i < amount+start; i++) {
    //https://bournetocode.com/projects/GCSE_Computing_Fundamentals/pages/3-3-5-ascii.html
    array.push(String.fromCharCode(i));
  }
  return array;
}