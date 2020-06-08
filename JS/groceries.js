/* Une portion de ce code a été pris de https://github.com/carolinebarriere/carolinebarriere.github.io/tree/master/SEG3125-Module2-Grocery (Caroline Barriere) */

// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

//Note that i went on the metro grecery store web site for the prices on the items. https://www.metro.ca/en/online-grocery/
var products = [
	{
		name: "Brocoli",
		type: "fruitsAndVege",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		vegan: true,
		dairyF: true,
		price: 1.99
	},
	{
		name: "Bread",
		type: "bakery",
		vegetarian: true,
		glutenFree: false,
		organic: false,
		vegan: false,
		dairyF: false,
		price: 2.35
	},
	{
		name: "Salmon",
		type: "meat",
		vegetarian: false,
		glutenFree: true,
		organic: false,
		vegan: false,
		dairyF: true,
		price: 9.99
	},
	{
		name: "Bananas",
		type: "fruitsAndVege",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		vegan: true,
		dairyF: true,
		price: 2.46
	},
	{
		name: "Tomatoe",
		type: "fruitsAndVege",
		vegetarian: true,
		glutenFree: true,
		organic: true,
		vegan: true,
		dairyF: true,
		price: 1.32
	},
	{
		name: "Raspberries",
		type: "fruitsAndVege",
		vegetarian: true,
		glutenFree: true,
		organic: false,
		vegan: true,
		dairyF: true,
		price: 3.99
	},
	{
		name: "Onion",
		type: "fruitsAndVege",
		vegetarian: true,
		glutenFree: true,
		organic: false,
		vegan: true,
		dairyF: true,
		price: 1.65
	},
	{
		name: "Milk",
		type: "dairyAndEggs",
		vegetarian: false,
		glutenFree: true,
		organic: false,
		vegan: false,
		dairyF: false,
		price: 4.49
	},
	{
		name: "Eggs",
		type: "dairyAndEggs",
		vegetarian: true,
		glutenFree: true,
		organic: false,
		vegan: false,
		dairyF: true,
		price: 2.69
	},
	{
		name: "Butter",
		type: "dairyAndEggs",
		vegetarian: true,
		glutenFree: true,
		organic: false,
		vegan: false,
		dairyF: false,
		price: 4.49
	},
	{
		name: "Shredded Cheese",
		type: "dairyAndEggs",
		vegetarian: true,
		glutenFree: true,
		organic: false,
		vegan: false,
		dairyF: false,
		price: 5.99
	},
	{
		name: "Whole Chicken",
		type: "meat",
		vegetarian: false,
		glutenFree: true,
		organic: true,
		vegan: false,
		dairyF: true,
		price: 13.14
	},
	{
		name: "T-Bone Steak",
		type: "meat",
		vegetarian: false,
		glutenFree: true,
		organic: false,
		vegan: false,
		dairyF: true,
		price: 14.78
	},
	{
		name: "Bacon",
		type: "meat",
		vegetarian: false,
		glutenFree: true,
		organic: false,
		vegan: false,
		dairyF: true,
		price: 3.99
	}
];

// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price
// Restriction is an array of boolean values : [Vegetarian, GlutenFree, organic, Vegan, Dairy Free]

//Si une restriction est en place et l'item ne repond pas au exigence, on le skip (avec continue)
//s'il remplie toute les condition, on l'ajoute a la liste. 

function restrictListProducts(prods, restriction) {
	let restrictedProduct = [];
	for (let i=0; i<prods.length; i+=1) {
		//Vegetarian
		if ((restriction[0]) && (!prods[i].vegetarian)){
			continue;
		}
		//Gluten-Free
		if ((restriction[1]) && (!prods[i].glutenFree)){
			continue;
		}
		//organic
		if ((restriction[2]) && (!prods[i].organic)){
			continue;
		}
		//vegan 
		if ((restriction[3]) && (!prods[i].vegan)){
			continue;
		}
		//dairy Free
		if ((restriction[4]) && (!prods[i].dairyF)){
			continue;
		}
		restrictedProduct.push(prods[i]);
	}
	return restrictedProduct;
}

// Calculate the price of the queried items, with received parameter being a product name and a product amount.
function getItemPrice(productName, amount) {

	for (index = 0; index < products.length; index += 1) {
		if (products[index].name === (productName)){
			// I was getting a weird price bug here sometimes so this line is needed
			return Math.round(products[index].price * amount * 100) / 100
		}
	}
	console.log("did not find " + productName);
	return 0;
}

// The rest of this code is by https://www.w3schools.com/howto/howto_js_accordion.asp
//Edited to fit my needs
var acc = document.getElementsByClassName("accordion");

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "grid" || panel.style.display === "block") {
      panel.style.display = "none";
    } else if (panel.className.includes("empty")){
		panel.style.display = "block";
	} else {
		panel.style.display = "grid";
	}
  });
}