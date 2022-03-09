# Vigenere Cypher encryption, decryption and cracking tool

## Description

This tool was created as a fun side project and practice in more algorithmic programming.
Using the radio buttons a user can encrypt and decrypt a given text with a given key.
They can also decrypt a given cypher text without the key as long as the text sufficiently long.

## limitations

As of right now the program will convert numbers using commas, time in hh:mm format, and dollar signs into words before stripping all characters except the 26 english language characters and sets them all to lowercase. This is because the Vigenere cypher has traditionally only been used with letters and I wanted to make sure that a cypher text encoded somewhere else could be decrypted with this tool and vice versa.
The break feature is limited for now and will only work with cypher texts of roughly 200+ characters or more depending on the key length used. This is a limitations of the probability equations used to crack the cypher. 

## Future improvements

- [ ] Add a function that will replace all numbers and pertinent symbols with words.
  - [X] partially complete(numbers, hh:mm time, and $)
  - [ ] for $, move word to end of number(ie. seven dollars instead of current dollars seven)
  - [ ] parse numbers separated with periods
  - [ ] parse decimals
  - [ ] parse percent
  - [ ] use Array.every() for checking for all trailing zeros instead of .join('') === string.
  - [ ] remove spaces from string returned since they will be removed anyway.
- [ ] break encryption does not work well for smaller cypher texts
  - [ ] display multiple possible keys or display warning that cryptoanalysis may have failed.
  - [ ] find way to determine if chi-squared calculation is inconclusive. should be a wide spread between first and all other results.
