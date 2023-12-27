const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://pranavjha:v52T8EV9J6prw5bF@cluster0.tciw1xy.mongodb.net/UsersApp",
);

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  ratings: {
    type: Number,
    min: 0,
    max: 5,
  },
  review: String,
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const grapes = new Fruit({
  name: "Grapes",
  ratings: 5,
  review: "Awesome",
});
grapes.save();

// const cherry = new Fruit({
//   name: "Cherry",
//   ratings: 4,
//   review: "Sweet",
// });
// cherry.save();

// const apple = new Fruit({
//   name: "Apple",
//   ratings: 7,
//   review: "Good",
// });

// coconut.save()
// .then(() => {
//   // After saving, find and log all fruits
//   return findFruits();
// })
// .then(() => {
//   mongoose.connection.close();
// })
// .catch((error) => {
//   console.error("Error:", error);
//   mongoose.connection.close();
// });

// const coconut = new Fruit({
//   name: "Coconut",
//   ratings: 4,
//   review: "Tasty",
// });
// coconut.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: String,
  favouriteFruit: fruitSchema,
});

const Person = mongoose.model("Person", personSchema);

// const person1 = new Person({
//   name: "Amy",
//   age: "12",
//   favouriteFruit: cherry,
// });
// person1.save();

// const person2 = new Person({
//   name: "John",
//   age: "30",
//   favouriteFruit: papaya,
// });
// person2.save();

// const apple = new Fruit({
//   name: "Apple",
//   ratings: 7,
//   review: "Good",
// });

// Fruit.insertMany([kiwi, orange, apple]);

async function findFruits() {
  try {
    const fruits = await Fruit.find().exec();
    // mongoose.connection.close();
    console.log("All Fruits:", fruits);
    fruits.forEach((fruit) => {
      console.log(fruit.name);
    });
  } catch (error) {
    console.error("Error finding fruits:", error);
  }
}

//Call the function to find and log all fruits
findFruits();

// async function updateFruit() {
//   try {
//     const result = await Fruit.updateOne(
//       { _id: "658c966e56baf8f7377281c3" },
//       { name: "Peach" },
//     );

//     if (result.nModified > 0) {
//       console.log("Updated Peach");
//     } else {
//       console.log("No documents were updated");
//     }
//   } catch (error) {
//     console.error("Error updating Pear:", error);
//   }
// }

// async function deleteFruit() {
//   try {
//     const result = await Fruit.deleteOne({ _id: "658cb38ae4d9baa4cb2e376f" });

//     if (result.deletedCount > 0) {
//       console.log("Deleted");
//     } else {
//       console.log("No documents were deleted");
//     }
//   } catch (error) {
//     console.error("Error deleting:", error);
//   }
// }

// async function deleteFruits() {
//   try {
//     const result = await Fruit.deleteMany({ name: "Coconut" });

//     if (result.deletedCount > 0) {
//       console.log("Deleted all the fruits mentioned");
//     } else {
//       console.log("No documents were deleted");
//     }
//   } catch (error) {
//     console.error("Error deleting all the fruits mentioned:", error);
//   }
// }

// async function deletePerson() {
//   try {
//     const result = await Person.deleteOne({ name: "John" });

//     if (result.deletedCount > 0) {
//       console.log("Deleted Person");
//     } else {
//       console.log("No documents were deleted");
//     }
//   } catch (error) {
//     console.error("Error deleting Person:", error);
//   }
// }

async function updatePerson() {
  try {
    const result = await Person.updateOne(
      { name: "John" },
      { favouriteFruit: grapes },
    );

    if (result.nModified > 0) {
      console.log("Updated");
    } else {
      console.log("No documents were updated");
    }
  } catch (error) {
    console.error("Error updating :", error);
  }
}

// async function deletePeople() {
//   try {
//     const result = await Person.deleteMany({ name: "Amy" });

//     if (result.deletedCount > 0) {
//       console.log("Deleted Person");
//     } else {
//       console.log("No documents were deleted");
//     }
//   } catch (error) {
//     console.error("Error deleting Person:", error);
//   }
// }

// Call the functions
// updateFruit();
 // updatePerson();
// deleteFruit();
// deletePerson();
// deletePeople();
// deleteFruits();

// Close the MongoDB connection after all operations
// mongoose.connection.close();
