// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

// I am using inspiration from BootStraps Cards to display the items (https://getbootstrap.com/docs/4.0/components/card/) 
// However all of the css is mine. only the html is form bootsrap (i didnt want to import bootstrap mid-project

// Here is my template
/* 

<div class="card">
	<img class="card" src="images/brocoli.png" alt="Brocoli">
	<div class="card-body">
		<h2>Brocoli</h2>
  		<label class="card">
			10.99 $
			<input type="number" id="quantity" name="quantity" min="1" max="5">
  		</label>
	</div>
</div> 

*/


function populateListProductChoices(slct1) {
    var booleanArray = slct1;
	
	// these represents the <div> in the Products tab, which shows the product list by types, so we first set them empty
	fruitsAndVege = document.getElementById("FruitsAndVeges");
	bakery = document.getElementById("Bakery");
	dairy = document.getElementById("Dairy");
	meat = document.getElementById("Meat");

	//delete all of the items inside
	fruitsAndVege.innerHTML = "";
	bakery.innerHTML = "";
	dairy.innerHTML = "";
	meat.innerHTML = "";

	//close all acordian menus
	fruitsAndVege.style.display = "none";
	bakery.style.display = "none";
	dairy.style.display = "none";
	meat.style.display = "none";

	//make sure the empty class is cleared
	fruitsAndVege.className = fruitsAndVege.className.replace(" empty", "");
	bakery.className = bakery.className.replace(" empty", "");
	dairy.className = dairy.className.replace(" empty", "");
	meat.className = meat.className.replace(" empty", "");

	//reset all active states of accordians
	var acc = document.getElementsByClassName("accordion");
	for (i = 0; i < acc.length; i++){
		acc[i].className = acc[i].className.replace(" active", "");
	}


	// Sort method by https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
	// Edited by Thierry Laprade #300067788
	products.sort(function(a, b) {
		var keyA = a.price;
		var keyB = b.price;
		// Compare the 2 prices
		if (keyA < keyB) return -1;
		if (keyA > keyB) return 1;
		return 0;
	});

	// obtain a reduced list of products based on restrictions
	var optionArray = restrictListProducts(products, booleanArray);
	//[Fruits and Vegetables, Bakery, Dairy and Eggs, Meat]
	var productTypesfilled = [false, false, false, false];
        
    //html DOM that will create all of the items
	for (i = 0; i < optionArray.length; i++) {
		var divCard = document.createElement("div");
		divCard.className  = "card";

		var image = document.createElement("img");
		image.className  = "card";
		image.src = `images/${optionArray[i].name}.png`;
		image.alt = optionArray[i].name;
		divCard.appendChild(image);

		var divCardBody = document.createElement("div");
		divCardBody.className  = "card-body";
		
		var labelCard = document.createElement("label");
		labelCard.className  = "card";
		labelCard.htmlFor = `#${optionArray[i].name}`;
		
		var h2Card = document.createElement("h2");
		h2Card.innerText = `${optionArray[i].name} ($${optionArray[i].price})`;
		labelCard.appendChild(h2Card);
		divCardBody.appendChild(labelCard);
		
		var inputCard = document.createElement("input");
		inputCard.className = "card";
		inputCard.type = "number";
		inputCard.name = "product";
		inputCard.value = "0";
		inputCard.id=`#${optionArray[i].name}`;
		inputCard.min="0";
		inputCard.max="999";
		divCardBody.appendChild(inputCard);

		var buttonCard = document.createElement("button");
		buttonCard.innerText = "Add to Cart";
		buttonCard.id=`button#${optionArray[i].name}`;
		buttonCard.onclick = addToCart;
		divCardBody.appendChild(buttonCard);

		divCard.appendChild(divCardBody);

        //add the created item to the proper accordian menu (and set the menus value to true)
		switch (optionArray[i].type) {
			case "fruitsAndVege" :
				fruitsAndVege.appendChild(divCard);
				productTypesfilled[0] = true;
				break;

			case "bakery" :
				bakery.appendChild(divCard);
				productTypesfilled[1] = true;
				break;

			case "dairyAndEggs" :
				dairy.appendChild(divCard);
				productTypesfilled[2] = true;
				break;

			case "meat" :
				meat.appendChild(divCard);
				productTypesfilled[3] = true;
				break;

		}
	}

	//if there are no items inside one of the accordian menus 
	for (j = 0; j < productTypesfilled.length; j++ ){
		if (!productTypesfilled[j]) {
            //create a p element with the following text and add it to the empty menus
			var pCard = document.createElement("p");
			pCard.innerText = "There are no items for this category that match your dietary needs.";
			switch (j) {
				case 0 :
					fruitsAndVege.className += " empty";
					fruitsAndVege.appendChild(pCard);
					break;
	
				case 1 :
					bakery.className += " empty";
					bakery.appendChild(pCard);
					break;
	
				case 2 :
					dairy.className += " empty";
					dairy.appendChild(pCard);
					break;
	
				case 3 :
					meat.className += " empty";
					meat.appendChild(pCard);
					break;		
			}
		}
	}
}




//the products are in groups of 2 (first is the name, then there is the price.)
function populateCartWithProducts(chosenProducts) {
    var totalprice = 0;
    
    //cart already on the page (And i clear the cart)
    var cart = document.getElementById("displayCart");
    cart.innerHTML = "";
    
    //html DOM that will create the products
    for (i = 0; i < chosenProducts.length; i += 2) {
        var product = chosenProducts[i];
        var amount = chosenProducts[i+1];

        var divCard = document.createElement("div");
        divCard.className  = "card";

        var image = document.createElement("img");
        
        image.className  = "card";
        image.src = `images/${product}.png`;
        image.alt = product.name;
        divCard.appendChild(image);
    
        var divCardBody = document.createElement("div");
        divCardBody.className  = "card-body";
        
        //name and how much of the item
        var h2Card = document.createElement("h2");
        h2Card.innerText = `${product} (${amount})`;
        divCardBody.appendChild(h2Card);
    
        //price of the item
        var labelCard = document.createElement("label");
        labelCard.className  = "card";
        labelCard.innerText = `$${getItemPrice(product, amount).toFixed(2)}`; //https://www.tutorialspoint.com/How-to-format-a-number-with-two-decimals-in-JavaScript#:~:text=Use%20the%20toFixed()%20method,the%20right%20of%20the%20decimal.
        divCardBody.appendChild(labelCard);
    
        //get the total price
        totalprice += getItemPrice(product, amount);
    
        divCard.appendChild(divCardBody);

        cart.appendChild(divCard);
    }

    var total = document.createElement("h4");
    total.innerText = `Your total is : $${totalprice.toFixed(2)}`;
    //reset the total section and add the new total
    document.getElementById("cartTotal").innerHTML = "";
    document.getElementById("cartTotal").appendChild(total);

}


