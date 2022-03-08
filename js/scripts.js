const alphabet = "abcdefghijklmnopqrstuvwxyz".split('');

function handleSubmit(e) {
  e.preventDefault();
  
  let formElements = encryptForm.elements;
  let cypherDirection = formElements.cypherDirection.value;
  let dirtyCypherText = formElements.text.value;
  let dirtyCypherKey = formElements.key.value
  
  replaceNumbers(dirtyCypherText);
  
  let cypherResultObject = handleCypher(dirtyCypherText, dirtyCypherKey, cypherDirection);
  
  const encryptedResultsHeader = document.getElementById("cypher-header");
  const encryptedResultField = document.getElementById("cypher-text");
  
  encryptedResultsHeader.innerText =
    cypherDirection === "encrypt" ? "Encrypted text:" : "Decrypted text:";

  while (encryptedResultField.firstChild) {
    encryptedResultField.removeChild(encryptedResultField.firstChild);
  }
  
  const resultElement = document.createElement("p");
  const keyHeader = document.createElement('h4');
  const keyElement = document.createElement("p");
  
  resultElement.innerText = cypherResultObject.text;
  keyHeader.innerText = 'Key';
  keyElement.innerText = cypherResultObject.key;
  
  encryptedResultField.appendChild(resultElement);
  encryptedResultField.appendChild(keyHeader);
  encryptedResultField.appendChild(keyElement);
  // displayResults( cypherResultObject.text, cypherResultObject.key, cypherDirection)
  
}

function replaceNumbers(cypherText) {
  cypherText.replaceAll(/\d{1,2}:\d{2}/g, (match, offset) => {
    // console.log(match, offset);
    // let splitTime = match.split(':');
    
      
  });
  
  cypherText.replaceAll(/\d+/g, (match, offset) => {
    // console.log(match, offset)
    console.log(swapNumberForString(match))
  });
  
  /*
  * 
  * @params   numberString    number or string
  * @returns                  string              the word representation of the given number
  */
  function swapNumberForString(numberString) {
    console.log(numberString);
    let digits = numberString.toString().split('').map(Number);
    let fullNumber = parseInt(numberString)
    // console.log(digits.join(''))
    
    // One digit numbers
    if(digits.length === 1) {
      switch(fullNumber) {
        case 0:
          return 'zero';
        case 1:
          return 'one';
        case 2:
          return 'two';
        case 3:
          return 'three';
        case 4:
          return 'four';
        case 5:
          return 'five';
        case 6:
          return 'six';
        case 7:
          return 'seven';
        case 8:
          return 'eight';
        case 9:
          return 'nine';
      }
    }

    // Two digit numbers
    if(digits.length === 2) {

      // numbers in the teens
      if(digits[0] < 2) {

        // check for leading 0
        if(digits[0] === 0) {
          return swapNumberForString(digits[1]);
        }

        switch(fullNumber) {
          case 10:
            return 'ten';
          case 11:
            return 'eleven';
          case 12:
            return 'twelve';
          case 13:
            return 'thirteen';
          case 14:
            return 'fourteen';
          case 15:
            return 'fifteen';
          case 16:
            return 'sixteen';
          case 17:
            return 'seventeen';
          case 18:
            return 'eighteen';
          case 19:
            return 'nineteen';
        }
      }
      switch(digits[0]) {
          case 2:
            return digits[1] == 0 ? 'twenty' : 'twenty ' + swapNumberForString(digits[1]);
          case 3:
            return digits[1] == 0 ? 'thirty' : 'thirty ' + swapNumberForString(digits[1]);
          case 4:
            return digits[1] == 0 ? 'fourty' : 'fourty ' + swapNumberForString(digits[1]);
          case 5:
            return digits[1] == 0 ? 'fifty' : 'fifty ' + swapNumberForString(digits[1]);
          case 6:
            return digits[1] == 0 ? 'sixty' : 'sixty ' + swapNumberForString(digits[1]);
          case 7:
            return digits[1] == 0 ? 'seventy' : 'seventy ' + swapNumberForString(digits[1]);
          case 8:
            return digits[1] == 0 ? 'eighty' : 'eighty ' + swapNumberForString(digits[1]);
          case 9:
            return digits[1] == 0 ? 'ninety' : 'ninety ' + swapNumberForString(digits[1]);
      }
    }

    // Three digit numbers
    // TODO: Check for leading or only zeros. Happens when 4 or more digit number is passed in with nothing in the hundreds place.
    if(digits.length === 3) {
      if(digits[1] === 0 && digits[2] === 0) {
        return swapNumberForString(digits[0]) + ' hundred';
      }
      return swapNumberForString(digits[0]) + ' hundred ' + swapNumberForString(digits.slice(1).join(''));
    }

    // Four digit numbers
    if(digits.length < 7) {
      if(digits.slice(-3).join('') === '000') {
        return swapNumberForString(digits.slice(0, -3).join('')) + ' thousand';
      }
      return swapNumberForString(digits.slice(0, -3).join('')) + ' thousand ' + swapNumberForString(digits.slice(-3).join(''));
    }

    if(digits.length < 10) {
      if(digits.slice(-6).join('') === '000000') {
        return swapNumberForString(digits.slice(0, -6).join('')) + ' million';
      }
      return swapNumberForString(digits.slice(0, -6).join('')) + ' million ' + swapNumberForString(digits.slice(-6).join(''));
    }

    if(digits.length < 13) {
      if(digits.slice(-9).join('') === '000000000') {
        return swapNumberForString(digits.slice(0, -9).join('')) + ' billion';
      }
      return swapNumberForString(digits.slice(0, -9).join('')) + ' billion ' + swapNumberForString(digits.slice(-9).join(''));
    }
  }
}

/*
* Takes in and cleans user inputed text, key, and cypher direction.
* Calls breakEncryption or doCypher functions depending on cypherDirection.
* @params   dirtyCypherText   string
* @params   dirtyCypherKey    string
* @params   cypherDirection   string
* @returns                    object    
*/
function handleCypher(dirtyCypherText, dirtyCypherKey, cypherDirection) {
  
  let regex = /[^A-Za-z]/g;
  // TODO: Convert numbers into words to keep meaning.
  let cypherTextArray = dirtyCypherText.toLowerCase().replaceAll(regex, '').split('');
  let cypherKeyArray = dirtyCypherKey.toLowerCase().replaceAll(regex, '').split('');

  if (cypherDirection === 'crack') {
    return breakEncryption(cypherTextArray);
  }
  
  let encypheredTextString = doCypher(cypherTextArray, cypherKeyArray, cypherDirection).join('');

  // displayResults(encypheredText, cypherKey.join(''), cypherDirection);
  
  return {text: encypheredTextString, key: cypherKeyArray.join('')}
};


/*
 * This will either encypher or decypher a given text with a given key based on the cypherDirection param.
 * @params    cypherText       string
 * @params    cypherKey        string
 * @params    cypherDirection  string
 * @returns                    array     encrypted or decrypted text
 */
function doCypher(textArray, keyArray, cypherDirection = "decrypt") {
  
  let keyLength = keyArray.length;
  let resultTextArray = [];

  for (let keyIndex = 0; keyIndex < keyLength; keyIndex++) {
    let alphabetShift =
      cypherDirection === "encrypt"
        ? alphabet.indexOf(keyArray[keyIndex])
        : alphabet.length - alphabet.indexOf(keyArray[keyIndex]);

    for (let textIndex = keyIndex; textIndex < textArray.length; textIndex += keyLength) {
      resultTextArray[textIndex] = alphabet[(alphabet.indexOf(textArray[textIndex]) + alphabetShift) % alphabet.length];
    }
  }
  return resultTextArray;
};

/*
 * Uses several other functions to attempt to crack the cypher.
 * function is not yet aware of the accuracy of the cypher key found so may provide inaccurate results.
 * @params    text    array
 * @returns           object  text and key as key value pairs.
 */
function breakEncryption(cypherTextArray) {
  let keyLength = getKeyLength(cypherTextArray);
  let splitCypherText = getNSubTexts(cypherTextArray, keyLength);

  let actualKey = getCypherKey(splitCypherText);
  let decryptedText = doCypher(cypherTextArray, actualKey, "decrypt").join("");

  // console.log(actualKey);
  // console.log("text length: " + decryptedText.length);
  // displayResults(decryptedText, actualKey, "decrypt");
  return {text: decryptedText, key: actualKey}
};

/*
 * Returns the key length.
 * Key length is deteremined by finding the average Index of Coincidence of n sub texts where n is a key length between 2 and 20.
 * We are essentially brute forcing the cypher by splitting the text into 2 through 20 subtexts and seeing which results in the
 * closest frequency distribution to regular english.
 * 2-20 is an arbitrary range of key lengths assuming that a key longer then 20 would be unwieldy.
 * @params    cypherTextArray   array
 * @returns                     number  the key length with the 
 */
function getKeyLength(cypherTextArray) {
  let allIofCs = [];
  // test for all key lengths from 2 to 20
  for (let testKeyL = 2; testKeyL <= 20; testKeyL++) {
    let allSubStringsIofCs = [];
    // get each letter that is a multiple of the currently tested key length.
    // divide the text into n sub texts where n is the key length being tested
    // this loop is the start point of each sub text
    let splitCypherText = getNSubTexts(cypherTextArray, testKeyL);
    splitCypherText.forEach((subText) =>
      allSubStringsIofCs.push(getIndexOfCoincidence(subText))
    );

    // add key length and average IoC of each of those sub strings as object to allIofCs[]
    allIofCs.push({
      keyLength: testKeyL,
      IofC:
        allSubStringsIofCs.reduce((prev, curr) => (prev += curr)) /
        allSubStringsIofCs.length
    });
  }
  // Assumes that the lowest index of coincidence indicates the correct key length.
  return allIofCs.sort((a, b) => (a.IofC < b.IofC ? 1 : -1))[0].keyLength;

  //   let topThreeIofCs = allIofCs.sort((a, b) => a.IofC < b.IofC ? 1 : -1 ).slice(0, 3).sort((a, b) => a.keyLength > b.keyLength ? 1 : -1 );
  //   if(topThreeIofCs[1].keyLength % topThreeIofCs[0].keyLength === 0 && topThreeIofCs[2].keyLength % topThreeIofCs[0].keyLength === 0) {
  //     console.log(topThreeIofCs)
  //     return topThreeIofCs[0].keyLength
  //   } else {
  //     console.log('This didnt work. Couldn\'t get key length.')
  //     console.log(topThreeIofCs)
  //     return topThreeIofCs.sort((a, b) => a.IofC < b.IofC ? 1 : -1 )[0].keyLength
  //   }
};

/*
* Index of coincidence is the probability that any two characters pulled at random from the text are the same character.
* In simple terms, this is done by determining how likely pulling one letter, say "a", more then once out of the text.
* @params   textArray   array
* @returns              number    the index of coincidence of the given text
*/
function getIndexOfCoincidence(textArray) {
  let cypherLetterOccurances = [];
  alphabet.forEach((letter, index) => {
    cypherLetterOccurances[index] = 0;
    textArray.forEach((cypherLetter) => {
      if (cypherLetter === letter) {
        cypherLetterOccurances[index]++;
      }
    });
  });
  let indexOfCoincidence =
    (1 / (textArray.length * (textArray.length - 1))) *
    cypherLetterOccurances.reduce((prev, curr) => prev + curr * (curr - 1), 0);
  return indexOfCoincidence;
};

/*
* Breaks the cypher into n substrings of every nth character.
* @params   text    string    the text to be split
* @params   n       number    the number of substrings
* @returns          array     an array of arrays with each substring 
*/
function getNSubTexts(text, n) {
  let nSubTexts = [];
  // get each letter that is a multiple of the currently tested key length.
  // divide the text into n sub texts where n is the key length being tested
  // this loop is the start point of each sub text
  for (let x = 0; x < n; x++) {
    let shiftedSubText = [];
    // go through the text and push every nth letter to shiftedSubText array
    for (let y = x; y < text.length; y = y + n) {
      shiftedSubText.push(text[y]);
    }
    nSubTexts.push(shiftedSubText);
  }
  return nSubTexts;
};

/*
* Finds and returns the probable cypher key using the chi-squared method
* Chi-squared method is essentially taking each sub text and attempts to decrypt it with each letter in the alphabet 
* then comparing the number of times each letter occurs in the text to what an average english text of the same length would have.
* It adds up this comparison for each letter. The lower this number is the closer the text matches the frequency distribution of an average english text.
* @params   splitText   array   two dimentional array containing the cypher text split into sub arrays.
* @returns              string  the key determined by the algorithm.
*/
// TODO: return 2 or 3 possible keys in case text is too small for equations to be accurate.
function getCypherKey(splitText) {
  // http://cs.wellesley.edu/~fturbak/codman/letterfreq.html
  // Frequency of each letter 
  let englishLetterFrequencies = [0.08167, 0.01492, 0.02782, 0.04253, 0.12702, 0.02228, 0.02015, 0.06094, 0.06966, 0.00153, 0.00772, 0.04025, 0.02406, 0.06749, 0.07507, 0.01929, 0.00095, 0.05987, 0.06327, 0.09056, 0.02758, 0.00978, 0.02360, 0.00150, 0.01974, 0.00074];
  
  let keyOffsets = [];
  splitText.forEach((subText) => {
    let possibleOffsets = [];
    let expectedLetterCount = englishLetterFrequencies.map(
      (frequency) => frequency * subText.length
    );
    
    alphabet.forEach((letter, index) => {
      let attemptedDecryption = doCypher(subText, letter, "decrypt");
      let cypherLetterCount = getLetterCount(attemptedDecryption);

      let chiSquaredSum = 0;
      for (let i = 0; i < cypherLetterCount.length; i++) {
        chiSquaredSum += Math.pow(cypherLetterCount[i] - expectedLetterCount[i], 2) / expectedLetterCount[i];
      }
      possibleOffsets[index] = {
        offset: index,
        letter: alphabet[index],
        chiSquared: chiSquaredSum
      };
    });
    
    let topThree = possibleOffsets
      .sort((a, b) => (a.chiSquared > b.chiSquared ? 1 : -1))
      .slice(0, 3);
    
    // console.log(
    //   possibleOffsets
    //     .sort((a, b) => (a.chiSquared > b.chiSquared ? 1 : -1))
    //     .slice(0, 3)
    // );
    keyOffsets.push(possibleOffsets.sort((a, b) => (a.chiSquared > b.chiSquared ? 1 : -1))[0].offset);
  });
  
  // console.log(keyOffsets)
  return keyOffsets.map((offset) => alphabet[offset]).join("");
};

/*
* Counts the occurances of each letter in the text and returns an array of numbers.
* @params   subText   array   array of letters
* @returns            array   26 numbers each indicating the count of the letter at that index within the passed in array
*/
function getLetterCount(subText) {
  let letterCount = [];
  alphabet.forEach((letter, index) => {
    letterCount[index] = 0;
    subText.forEach((cypherletter) => {
      if (cypherletter === letter) {
        letterCount[index]++;
      }
    });
  });
  return letterCount;
};

/*
* Clears the text and key input fields
* @params e   event
*/
function handleClear(e) {
  e.preventDefault();

  const inputTextArea = document.getElementById("text");
  const inputKeyArea = document.getElementById("key");
  inputTextArea.value = "";
  inputKeyArea.value = "";
};

const testDiv = document.getElementById("test");

const encryptForm = document.getElementById("encrypt-form");
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", handleClear);
encryptForm.addEventListener("submit", handleSubmit);

// if cant find key length, show the user possibilities?

//-----------------References--------------------
//https://www.dcode.fr/vigenere-cipher

// English letter frequencies
// http://cs.wellesley.edu/~fturbak/codman/letterfreq.html

// Freidman test for determining Index of Coincidence and key length
// https://pages.mtu.edu/~shene/NSF-4/Tutorial/VIG/Vig-IOC.html
// https://www.nku.edu/~christensen/1402%20Friedman%20test%202.pdf

// Chi-squared equation for determining ceaser shift offset
// http://practicalcryptography.com/cryptanalysis/text-characterisation/chi-squared-statistic/

// Not used but informative
// https://www.cs.purdue.edu/homes/ninghui/courses/Fall05/lectures/355_Fall05_lect04.pdf