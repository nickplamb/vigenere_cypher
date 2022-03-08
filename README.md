# Vigenere Cypher encryption, decryption and cracking tool

## Description

This tool was created as a fun side project and practice in more algorithmic programming.
Using the radio buttons a user can encrypt and decrypt a given text with a given key.
They can also decrypt a given cypher text without the key as long as the text sufficiently long.

## limitations

As of right now the program strips everything but the 26 english language character and sets them all to lowercase. This is because the Vigenere cypher has traditionally only been used with letters and I wanted to make sure that a cypher text encoded somewhere else could be decrypted with this tool and vice versa.
The break feature is limited for now and will only work with cypher texts of roughly 200+ characters or more depending on the key length used. This is a limitations of the probability equations used to crack the cypher. 

## Future improvements

[ ] Add a function that will replace all numbers with words.
[ ] display multiple possible keys or display warning that cryptoanalysis may have failed.
