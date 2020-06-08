/* Une portion de ce code a été pris de https://github.com/carolinebarriere/carolinebarriere.github.io/tree/master/SEG3125-Module2-Grocery (Caroline Barriere) */

// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

var tabNumber = 1000;
var chosenProducts = [];

function openInfo(evt, tabAction) {

	//add tab Action to tab Number
	//1000 = Client, 1001 = products, 1002 = cart;

	if (tabAction >= 1000) {
		tabNumber = tabAction;
	} else {
		tabNumber += tabAction;
	}

	previousButton = document.getElementById("previous");
	nextButton = document.getElementById("next");


	if (tabNumber == 1000) {
		//block the Back button
		previousButton.disabled = true;
		previousButton.className += " noHover";

	} else if (tabNumber == 1001) {
		//unblock the back and next Button
		previousButton.disabled = false;
		previousButton.className = previousButton.className.replace(" noHover", "");

		nextButton.disabled = false;
		nextButton.className = nextButton.className.replace(" noHover", "");

	} else if (tabNumber == 1002) {
		//block the next Button
		nextButton.disabled = true;
		nextButton.className += " noHover";
		populateCartWithProducts(chosenProducts);

	} else {
		console.log("Error occured. Tab number is invalid.")
		tabNumber = 1000;
	}


	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabNumber).style.display = "block";
	tablinks[tabNumber-999].className += " active";
	// evt.currentTarget.className += " active";

}


	

// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function addToCart(event){
	
	//get the name of the button that triggered the event (the inputs have a matching name minus button which is why i remove it.)
	name = event.path[0].id.replace("button#", "");
	amount = parseInt(document.getElementById(`#${name}`).value);
	
	//if the number is bigger then the cap which they can supparse by typing i reset it to the max (or smaller then 0, set it to 0)
	if (amount > 999) {
		document.getElementById(`#${name}`).value = 999;
		amount = 999;
	} else if (amount < 1) {
		document.getElementById(`#${name}`).value = 0;
		amount = 0;
		return;
	}
	
	//if item is already in cart increase the amount by the new amount
	if (chosenProducts.includes(name)){
		var index = chosenProducts.indexOf(name) + 1;
		chosenProducts[index] += amount;
	} else {	//add the new items to the array
		chosenProducts.push(name.replace("#", ""));
		chosenProducts.push(amount);
	}

	//reset the input (indicates the item has been added)
	document.getElementById(`#${name}`).value = 0
}

