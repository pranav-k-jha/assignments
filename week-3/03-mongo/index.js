const mongoose = require("mongoose");
mongoose.connect(
  "mongodb+srv://pranavjha:v52T8EV9J6prw5bF@cluster0.tciw1xy.mongodb.net/UsersApp"
);

const User = mongoose.model("User", {
  name: String,
  email: String,
  password: String,
});

const username = new User({
  name: "Pranav",
  email: "pranav@gmail.com",
  password: "7229",
});

const Person = mongoose.model("Person", {
  name: String,
  age: String,
});

const person = new Person({
  name: "John",
  age: "30",
});

//person.save().then(() => console.log("New Person named " + person + " saved"));

// Person.find().exec().then((people) => {
//   console.log("People:", people);
// }).catch((error) => {
//   console.error("Error finding people:", error);
// });

const Fruit = mongoose.model("Fruit", {
  name: String,
  ratings: String,
  review: String,
});

const kiwi = new Fruit({
  name: "Kiwi",
  ratings: 7,
  review: "Pretty solid as a fruit.",
});
const orange = new Fruit({
  name: "Orange",
  ratings: 7,
  review: "Smells great.",
});
const apple = new Fruit({
  name: "Apple",
  ratings: 7,
  review: "Good",
});

// Fruit.insertMany([kiwi, orange, apple]);

async function findKiwi() {
  try {
    const kiwiFruit = await Fruit.findOne({ name: 'Kiwi' }).exec();
    console.log(kiwiFruit);
  } catch (error) {
    console.error("Error finding Kiwi:", error);
  }
}

// Call the function to find the Kiwi fruit
findKiwi();