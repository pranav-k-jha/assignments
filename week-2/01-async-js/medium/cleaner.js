
const fs = require('fs');

// Reading the file
fs.readFile("message.txt", "utf-8", (err, data) => {
  if (err) throw err;
  
  // Modifying the data (e.g., removing whitespaces)
  const newString = data.replace(/\s+/g, ' '); // Fix: Added missing closing parenthesis

  // Writing the modified data back to the file
  fs.writeFile("message.txt", newString, "utf-8", (err) => { // Fix: Added missing opening parenthesis
    if (err) throw err;
    console.log("The file has been saved!");
  });
});
