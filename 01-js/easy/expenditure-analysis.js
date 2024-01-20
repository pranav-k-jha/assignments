/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
  let output = [];
  let resultByCategory = {};

  for (let i = 0; i < transactions.length; i++) {
    let currentCategory = transactions[i].category;
    if (!resultByCategory[currentCategory]) {
      resultByCategory[currentCategory] = {
        category: currentCategory,
        price: 0,
      };
    }
    resultByCategory[currentCategory].price += transactions[i].price;
  }
  console.log(resultByCategory);
  output = Object.values(resultByCategory);
  output.forEach((categoryResult) => {
    console.log(
      `${categoryResult.category}: Total price ${categoryResult.price}`
    );
  });
  console.log(output);
  return output;
}

const transactions = [
  {
    id: 1,
    itemName: "MacBook Air",
    category: "Laptop",
    price: 1200,
    timeStamp: "13:24:22",
  },
  {
    id: 2,
    itemName: "Samsung Galaxy S21",
    category: "Smartphone",
    price: 899,
    timeStamp: "09:45:55",
  },
  {
    id: 3,
    itemName: "Sony 65-inch 4K TV",
    category: "Electronics",
    price: 1499,
    timeStamp: "16:30:18",
  },
  {
    id: 4,
    itemName: "Nike Air Zoom Pegasus 38",
    category: "Footwear",
    price: 120,
    timeStamp: "11:15:40",
  },
  {
    id: 5,
    itemName: "Instant Pot Duo Plus",
    category: "Kitchen_Appliances",
    price: 99.99,
    timeStamp: "20:05:12",
  },
  {
    id: 6,
    itemName: "Fiction Book Set",
    category: "Books",
    price: 45,
    timeStamp: "14:22:03",
  },
  {
    id: 7,
    itemName: "Dell XPS 13",
    category: "Laptop",
    price: 1399,
    timeStamp: "10:55:30",
  },
  {
    id: 8,
    itemName: "iPhone 13 Pro",
    category: "Smartphone",
    price: 1099,
    timeStamp: "15:18:47",
  },
  {
    id: 9,
    itemName: "LG 55-inch OLED TV",
    category: "Electronics",
    price: 1799,
    timeStamp: "18:40:22",
  },
  {
    id: 10,
    itemName: "Adidas Ultraboost 21",
    category: "Footwear",
    price: 180,
    timeStamp: "12:08:05",
  },
  {
    id: 11,
    itemName: "KitchenAid Stand Mixer",
    category: "Kitchen_Appliances",
    price: 299,
    timestamp: "22:30:50",
  },
];



calculateTotalSpentByCategory(transactions);

module.exports = calculateTotalSpentByCategory;

