function BracketCombinations(num) { 

  let memo = new Array(num+1)
  for (let i = 2; i < memo.length; i++){
    memo[i] = -1
  }
  memo[0] = 1;
  memo[1] = 1;
  
  return getCatalanNumber(num, memo);
  // return getNumBracketCombos(num);
}
   
// keep this function call here 
// @ts-ignore
console.log(BracketCombinations(readline()));

//solution after learning about Catalan numbers and dynamic programming
function getCatalanNumber(num: number, memo: Array<number>){

  if ( memo[num] != -1) {
    return memo[num];
  }

  let sumOfCNum = 0;
  for (let k = 0; k < num; k++){
    sumOfCNum += getCatalanNumber(k, memo) * getCatalanNumber(num-1-k, memo);
  }

  memo[num] = sumOfCNum;
  return memo[num];
}

//Solution before learning about Catalan numbers
function getNumBracketCombos(num: number): number {
  if (num === 0) { return 0;}
  if (num === 1) { return 1;}

  let parenVal = starterString(num);
  const innerParenLen = (num * 2) - 2;

  //loop though combinations and check for validity
  let combosList = []
  for (let i = 0; i < innerParenLen; i++) {
    combosList = [...combosList, ...oneIterCombos(parenVal)]
    parenVal = combosList[combosList.length-1]
  }
  
  const uniqueItems = removeDuplicates(combosList)
  return uniqueItems.length; 
}

function starterString(num: number): string {
  let startValue = '';
  for (let i = 0; i < num; i++ ) {
    startValue += '('
  } 
  for (let i = 0; i < num; i++ ) {
    startValue += ')'
  } 

  return startValue;
}

function isLegalCombo(parenVal: string): boolean {
  let parenList = [];
  let currVal = '';
  let prevVal = ''

  for (let pos = 0; pos < parenVal.length; pos++) {
    currVal = parenVal[pos];

    if (currVal == '(') {
      parenList.push(parenVal[pos])
      prevVal = currVal
    } else {
      if (parenList.length == 0) {
            return false;
      }

      if (prevVal == '(') {
        parenList.pop()
      }
    }
  }

  return true;
}

function oneIterCombos(parenVal: string): string[] {

  let newVal = '';
  let combos = [];

  if (isLegalCombo(parenVal)) {
    combos.push(parenVal);
  }
  for (let i = 1; i < parenVal.length - 2; i++) {
    newVal = parenVal.substring(0, i)+parenVal[i+1]+parenVal[i]+parenVal.substring(i+2);
    if (isLegalCombo(newVal)){
      combos.push(newVal)
    }
    parenVal = newVal;
  }
  return combos;
}


function removeDuplicates(valuesList: string[]): string[]{
  let unqiueList: string[] = [];

  if (valuesList.length == 1 || valuesList.length == 0) {
    return valuesList;
  }

  let currVal = valuesList[0];
  unqiueList.push(currVal);
  valuesList = valuesList.filter( val => val != currVal);
  unqiueList.push(...removeDuplicates(valuesList));
  
  return unqiueList;
}


// Bracket Combinations
// Have the function BracketCombinations(num) read num which will 
// be an integer greater than or equal to zero, and return the 
// number of valid combinations that can be formed with num pairs 
// of parentheses. For example, if the input is 3, then the 
// possible combinations of 3 pairs of parenthesis, namely: 
// ()()(), are ()()(), ()(()), (())(), ((())), and (()()). 
// There are 5 total combinations when the input is 3, 
// so your program should return 5.
// Examples
// Input: 3
// Output: 5
// Input: 2
// Output: 2