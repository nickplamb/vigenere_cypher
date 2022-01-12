let lettersAndNumbers = ('abcdefghijklmnopqrstuvwxyz').split('')

const handleCypher = (e) => {
  e.preventDefault();
  
  let regex = /[^A-Za-z]/g;
  let formElements = encryptForm.elements;
  let cypherDirection = formElements.cypherDirection.value;
  let cypherText = formElements.text.value.replaceAll(regex, '').toLowerCase().split('');
  
  if(cypherDirection === 'crack') {
    breakEncryption(cypherText);
    return;
  }
  
  let cypherKey = formElements.key.value.replaceAll(regex, '').toLowerCase().split('');
  let keyLength = cypherKey.length;
  
  
  let cypherTextArray = [];
  
  for(let keyIndex = 0; keyIndex < keyLength; keyIndex++) {
    let alphabetShift = cypherDirection === 'encrypt' 
    ? lettersAndNumbers.indexOf(cypherKey[keyIndex]) 
    : lettersAndNumbers.length-lettersAndNumbers.indexOf(cypherKey[keyIndex]);
    
    for(let textIndex = keyIndex; textIndex < cypherText.length; textIndex += keyLength){
      cypherTextArray[textIndex] = lettersAndNumbers[(lettersAndNumbers.indexOf(cypherText[textIndex])+alphabetShift)%lettersAndNumbers.length];
    }
  }
  
  encryptedResultsHeader.innerText = cypherDirection === 'encrypt' ? 'Encrypted text:' : 'Decrypted text:';
  let resultText = cypherTextArray.join('');
  encryptedResultField.innerHTML = `<p>${resultText}</p>`;
}

const breakEncryption = (text) => {

  let digraphsIndexs = [];
  let distances = [];
  let trigraphs = [];
  
  for(let i = 0; i < text.length-1; i++) {
    // let regex = new RegExp(text.slice(i, i+2).join(''))
    for(let x = i+3; x < text.length-1; x++) {
      // if(text.slice(x, x+2).join('') === text.slice(i, i+2).join('')) {
      if(text[x] === text[i] && text[x+1] === text[i+1] && text[x+2] === text[i+2]) {
        let trigraph = text.slice(i, i+3).join('');
        // let secondTrigraph = text.slice(x, x+3).join('');
        trigraphs.push([trigraph, x-i, [...getFactors(x-i)]])
        // console.log(trigraph, i, x, x-i)
        // digraphsIndexs.push(x);
        // digraphsIndexs.push(i);
        // distances.push(x-i);
        
      }
    }
  }
  
  // let dupsRemoved = digraphsIndexs.filter((elm, index) => (digraphsIndexs.indexOf(elm) !== index)).sort((a,b)=>a-b)
  let dupsRemoved = [...new Set(distances)];
  
  let factors = dupsRemoved.map(number => getFactors(number)).flat();
  // console.log(trigraphs);
  // console.log(factors.sort((a,b)=>a-b))
  // console.log(factors.sort((a,b)=>a-b).length)
  // console.log(distances.sort((a,b)=>a-b), distances.length);
  // console.log(dupsRemoved.sort((a,b)=>a-b), dupsRemoved.length)

  let possibleFactors = [];
  // add all factors to the possible factors array
  distances.forEach(number => possibleFactors.push(getFactors(number)));
  console.log(possibleFactors)
  // filter out duplicats with a spread Set, filter out thos over 20, sort them.
  possibleFactors = [...new Set(possibleFactors)].filter(number => number <= 20).sort((a,b)=>a-b);

  let tableHeader = document.getElementById('factorsTHead');
  possibleFactors.forEach(number => {
    console.log('is it working?')
    let header = `<th>${number}</th>`;
    tableHeader.appendChild(header);
  });

  // let tableBody = document.getElementById('factorsTBody');
  // trigraphs.forEach(triArray => {
  //   let row = document.createElement('tr');
  //   let rowContent = `<td>${triArray[0]}</td><td>${triArray[1]}</td>`;
  //   for(let i=0; i < triArray[2].length; i++){
  //     triArray[2].forEach(number => {
  //       rowContent += triArray[2][i] === i+2 ? `<td>${triArray[2][i]}</td>` : '<td></td>'
  //     });
  //   }
  //   row.insertAdjacentHTML('beforeend', rowContent);
  //   console.log(row)
  //   tableBody.appendChild(row)
  // })
}


const getFactors = number => {
  // https://stackoverflow.com/questions/22130043/trying-to-find-factors-of-a-number-in-js
  return [...Array(number + 1).keys()].slice(2).filter(i=>number % i === 0);
}

const encryptForm = document.getElementById('encrypt-form');
const encryptedResultField = document.getElementById('cypher-text');
const encryptedResultsHeader = document.getElementById('cyphe-header')
encryptForm.addEventListener('submit', handleCypher);


// https://en.wikibooks.org/wiki/Cryptography/Breaking_Vigen%C3%A8re_cipher