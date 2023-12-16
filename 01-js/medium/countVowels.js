/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

// function countVowels(str) {
//   str = str.replace(/[^\w]/g, "");
//   str = str.toLowerCase();
//   let count = 0;
//   for (let i = 0; i < str.length; i++) {
//     char = str[i];
//     console.log(char);

//     switch (char) {
//       case "a":
//         count++;
//         break;
//       case "e":
//         count++;
//         break;
//       case "i":
//         count++;
//         break;
//       case "o":
//         count++;
//         break;
//       case "u":
//         count++;
//         break;
//     }

//   }
//   console.log(count);
//   return count;
// }

// countVowels("pranav jha");

// module.exports = countVowels;

function countVowels(str) {
  str = str.replace(/[^\w]/g, "");
  str = str.toLowerCase();
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    char = str[i];
    console.log(char);

    if (
      char === "a" ||
      char === "e" ||
      char === "i" ||
      char === "o" ||
      char === "u"
    ) {
      count++;
    }
  }
  console.log(count);
  return count;
}

countVowels("EaSiEr");

module.exports = countVowels;
