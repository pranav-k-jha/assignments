/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {
  let counterFreq1 = {};
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  for (let i = 0; i < str1.length; i++) {
    const char = str1[i];

    counterFreq1[char] = (counterFreq1[char] || 0) + 1;
  }
  console.log(counterFreq1);

  let counterFreq2 = {};
  for (let i = 0; i < str2.length; i++) {
    const char = str2[i];

    counterFreq2[char] = (counterFreq2[char] || 0) + 1;
  }
  console.log(counterFreq2);

  const keys1 = Object.keys(counterFreq1);
  console.log(keys1);
  const keys2 = Object.keys(counterFreq2);
  console.log(keys2);

  if (keys1.length != keys2.length) {
    console.log("Not an Anagram");
    return false;
  }

  for (let i = 0; i < keys1.length; i++) {
    const char = keys1[i];
    if (counterFreq1[char] !== counterFreq2[char]) {
      console.log("Not an Anagram!");
      return false;
    }
  }

  console.log("Anagram");
  return true;
}

str1 = "abcbc";
str2 = "bcabac";

isAnagram(str1, str2);

module.exports = isAnagram;
