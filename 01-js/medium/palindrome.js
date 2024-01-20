/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  str = str.replace(/[^\w]/g, "");
  str = str.toLowerCase();
  console.log(str)

  for (let i = 0; i < Math.floor(str.length / 2); i++) {
    if (str[i] !== str[str.length - i - 1]) {
      console.log("Not a Palindrome!");
      return false;
    }
  }

  console.log("Palindrome");
  return true;
}


isPalindrome("A man a plan, a ? canal Panama")

module.exports = isPalindrome;
