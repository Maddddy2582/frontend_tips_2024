// Selecting ALl Buttons
const createAccountBtn = document.querySelector(".btn-create-account");
const signInBtn = document.querySelector(".btn-signin");
const createNewAccountBtn = document.querySelector(".btn-create-new-account");
const backBtn = document.querySelector(".btn-back");
const cartBtn = document.querySelector(".btn-cart");
const homepageBtn = document.querySelector(".btn-homepage");
const logoutBtn = document.querySelector(".btn-logout")
const checkoutBtn = document.querySelector(".btn-checkout")
const buyerBackBtn = document.querySelector(".btn-buyer-back");
const addItemsBtn = document.querySelector(".btn-add-items")
const backSellerBtn = document.querySelector(".btn-seller-back")
const toAddPageBtn = document.querySelector(".btn-to-add-page")
const modifyBtn = document.querySelector(".btn-modify")
const modifyBackBtn = document.querySelector(".btn-modify-back")
const modifyItemsBtn = document.querySelector(".btn-modify-items")

// Selcting ALl inputs
const inputNameCreate = document.querySelector(".input-name-create");
const inputPasswordCreate = document.querySelector(".input-password-create");
const inputNameSignin = document.querySelector(".input-name-signin");
const inputPasswordSignin = document.querySelector(".input-password-signin");
const selectUserType = document.querySelector(".select-usertype");
const itemsInCart = document.querySelector(".items-in-cart");
const inputSellerItemName = document.querySelector(".input-seller-item-name")
const inputSellerItemCost = document.querySelector(".input-seller-item-cost")
const inputSellerItemQuantity = document.querySelector(".input-seller-item-quantity")
const sellerModifyItemName = document.querySelector(".seller-modify-item-name")
const sellerModifyItemCost = document.querySelector(".seller-modify-item-cost")
const sellerModifyItemQuantity = document.querySelector(".seller-modify-item-quantity")

// Selecting ALL pages
const allPanels = document.querySelectorAll(".hidden");
const logInPage = document.querySelector(".log-in-page");
const createAccountPage = document.querySelector(".create-account-page");
const buyerPage = document.querySelector(".buyer-page");
const itemsToDisplay = document.querySelector(".items-to-display");
const buyerCartPage = document.querySelector(".buyer-cart-page");
const totalAmount = document.querySelector(".total-amount");
const successPage = document.querySelector(".success-page")
const sellerPage = document.querySelector(".seller-page")
const sellerAddPage = document.querySelector(".seller-add-page")
const sellerAllItem= document.querySelector(".seller-all-item")
const sellerModifyPage = document.querySelector(".seller-modify-page")

//Selecting Logo
const logo = document.querySelector(".logo-img")

// Required Global variables
let settype;
let cartItem;
let quantityvalue;
usersList = [];
itemsList = [];

// Class to create new item
class Items {
  static itemidgenerator = 1;
  itemname = "";
  itemcost = "";
  itemquantity = "";
  itemlisterid = "";
  itemlistername = "";
  isAvailable = true;
  constructor(itemname, itemcost, itemquantity, itemlisterid, itemlistername) {
    this.itemid = Items.itemidgenerator;
    this.itemname = itemname;
    this.itemcost = itemcost;
    this.itemquantity = itemquantity;
    this.itemlisterid = itemlisterid;
    this.itemlistername = itemlistername;
    this.isAvailable = true;
    this.itemselected = 0;
    Items.itemidgenerator++;
  }
}

// Class to access the store
class Store {
  currentuser = undefined;

  // Method to select the current user
  signin(username, userpassword) {
    if (!usersList.length) {
      alert("User dosen't exist please create an account");
      return;
    }
    usersList.forEach((element) => {
      if (element.name == username && element.password == userpassword) {
        if(element.isBuyer == true)
        {
          shop.showPanel(buyerPage);
          this.currentuser = element;
          this.addItemstobuyerPage();
        }
        else
        {
          this.currentuser = element;
          addingItemstoSellerPage()
          shop.showPanel(sellerPage)
        }
      } 
    });
  }

  // Method to get the quantity of the required items
  getselectedidquantity(itemid) {
    let available;
    itemsList.forEach((element) => {
      if (element.itemid === itemid) {
        console.log(element.itemquantity);
        available = element.itemquantity;
      }
    });
    return available;
  }

  // Method to add items to buyers homepage
  addItemstobuyerPage() {
     addingItemsTobuyerPage(itemsList);
  }

  // Method to add items to buyers cart
  addItemstoCart() {
    cartItem = [...new Set(this.currentuser.cart)];
    addingItemstoCart(cartItem);
  }

  // Method to calculate total amount 
  calculateTotalAmount() {
    let total = 0;
    cartItem.forEach((element) => {
      total += element.itemcost*element.itemselected;
    });
    return total;
  }

  // Method to add items to seller homepage
  sellerAddItem() {
    addingItemstoSellerPage()
  }

  // Method to show the required page
  showPanel(selectedPanel) {
    allPanels.forEach((element) => {
      element.classList.add("hidden");
    });
    selectedPanel.classList.remove("hidden");
  }
}

// Class to create new user
class User {
  static useridgenerator = 1;
  name = "";
  password = "";
  isBuyer = true;
  cart = [];

  constructor(name, password, isBuyer) {
    this.name = name;
    this.id = User.useridgenerator;
    this.password = password;
    this.isBuyer = isBuyer;
    User.useridgenerator++;
  }
}

// Adding new user
const addUser = function (name, password, isBuyer) {
  usersList.push(new User(name, password, isBuyer));
};

// Adding new items to the shop
const addItem = function (itemname, itemcost, itemquantity, itemlisterid, itemlistername) {
  itemsList.push(new Items(itemname, itemcost, itemquantity, itemlisterid, itemlistername));
};

// Creating a new instance to access store
const shop = new Store();

// Displaying the initial log-in page
shop.showPanel(logInPage);

// Function when clicking logo
logo.addEventListener("click",function()
{
  shop.showPanel(logInPage);
});

// Creating new Account button
createNewAccountBtn.addEventListener("click", function () {
  shop.showPanel(createAccountPage);
});

// Creating new account button
createAccountBtn.addEventListener("click", function () {
  if (!inputNameCreate.value || !inputPasswordCreate.value) {
    alert("Text field can't be blank");
    return;
  }
  if (selectUserType.value === "Buyer") {
    settype = true;
  } else {
    settype = false;
  }
  addUser(inputNameCreate.value, inputPasswordCreate.value, settype);
  inputNameCreate.value = "";
  inputPasswordCreate.value = "";
  shop.showPanel(logInPage);
});

// Back button in create account page
backBtn.addEventListener("click", function () {
  shop.showPanel(logInPage);
  inputNameCreate.value = "";
  inputPasswordCreate.value = "";
});

// Sign-in button
signInBtn.addEventListener("click", function () {
  if (!inputNameSignin.value || !inputPasswordSignin.value) {
    alert("Text field can't be blank");
    return;
  }
  shop.signin(inputNameSignin.value, inputPasswordSignin.value);
  inputNameSignin.value = "";
  inputPasswordSignin.value = ""; 
});

// Function to add items to buyer homepage
const addingItemsTobuyerPage = function (element) {
  itemsToDisplay.innerHTML = "";
  itemsList.forEach((element)=>{
    if(element.itemquantity>0)
    {
      let HTML = `<div class="buyer-items">
      <div class="product-img"></div>
      <p class="product-name">${element.itemname}</p>
      <p class="product-cost">Price: $${element.itemcost}</p>
      <p class="product-quantity">Available Quantity: ${element.itemquantity}</p>
      <p class ="sold-by">Sold by: ${element.itemlistername} (Item id: ${element.itemid})</p>
      <input class="input-quantity ${element.itemid}" type="number" min="1" value="1" />
      <button class="btn-product-tocart" id="${element.itemid}">Add to cart</button>
      </div>`;
      itemsToDisplay.insertAdjacentHTML("beforeend", HTML);
      }
  });
};

// Function to add items to buyers cart
const addingItemstoCart = function (cartItem) {
  itemsInCart.innerHTML = "";
  cartItem.forEach((element) => {
    let HTML = `<div class="cart-item">
  <div class="product-img"></div>
  <p class="product-name">${element.itemname}</p>
  <p class="product-quantity">Selected Quantity: ${element.itemselected}</p>
  <p class="product-cost">Total Price: $${element.itemcost*element.itemselected}</p>
  </div>`;
    itemsInCart.insertAdjacentHTML("beforeend", HTML);
  });
};

// Function when add to cart button is clicked
itemsToDisplay.addEventListener("click", function (e) {
  itemsList.forEach((element) => {
    if (element.itemid == Number(e.target.getAttribute("id"))) {
      const quantityvalue = document.getElementsByClassName(
        `${element.itemid}`
      )[0].value;
      if(element.itemquantity < quantityvalue)
      {
        alert("Not enough stock")
      }
      else
      {

        shop.currentuser.cart.push(element);
        element.itemselected = quantityvalue
      }
    }
  });
});

// Function when cart icon is clicked
cartBtn.addEventListener("click", function () {
  shop.addItemstoCart();
  shop.showPanel(buyerCartPage);
  cartItem.forEach(element=>{
    itemsList.forEach(item => {
        if(item.itemid == element.itemid)
        {
          item.itemquantity -= element.itemselected;
        }
     });
  })
  console.log(cartItem)
   totalAmount.textContent = `$${shop.calculateTotalAmount()}`;
});

// Back button in checkout page
buyerBackBtn.addEventListener("click", function () {
  shop.showPanel(buyerPage);
});

// Function when checkout button is clicked
checkoutBtn.addEventListener("click",function()
{
  if(totalAmount.textContent == "$0"){
    alert("Your cart is Empty")
  }
  else{
    shop.showPanel(successPage)
  }
})

// Function to return to homepage after checking out
homepageBtn.addEventListener("click",function(){
  shop.currentuser.cart = [];
  shop.showPanel(buyerPage)
  shop.addItemstobuyerPage()
});

// Function to logout
logoutBtn.addEventListener("click",function()
{
  shop.showPanel(logInPage)
});

// Function to display seller add items page
toAddPageBtn.addEventListener("click",function(){
  shop.showPanel(sellerAddPage)
})

// Back button in seller add items page
backSellerBtn.addEventListener("click",function(){
  shop.showPanel(sellerPage)
  inputSellerItemName.value= "";
  inputSellerItemCost.value= "";
  inputSellerItemQuantity.value= "";
})

// Function to add items to sellers homepage
const addingItemstoSellerPage = function (){
  itemsList.forEach(element=>{
    if(element.itemlisterid == shop.currentuser.id)
    {
      shop.currentuser.cart.push(element)
    }
  });
  let sellerCartItem = [...new Set(shop.currentuser.cart)]
  sellerAllItem.innerHTML = "";
  sellerCartItem.forEach((element)=>{
    if(element.itemlisterid == shop.currentuser.id)
    {
      let HTML = `<div class="seller-items">
      <div class="seller-product-img"></div>
      <p class="seller-product-name">${element.itemname}</p>
      <p class="seller-product-cost">Price: $${element.itemcost}</p>
      <p class="seller-product-quantity">Available Quantity: ${element.itemquantity}</p><br />
      <button class="btn-modify" id="${element.itemid}">Modify</button>
    </div>`;
      sellerAllItem.insertAdjacentHTML("beforeend",HTML)
    }
  })    
}

// Function to add items to sellers homepage
addItemsBtn.addEventListener("click",function(){
  if(!inputSellerItemName.value || !inputSellerItemCost.value || !inputSellerItemQuantity.value)
  {
    alert("Text field can't be empty")
    return;
  }
   addItem(inputSellerItemName.value,
    Number(inputSellerItemCost.value),
    Number(inputSellerItemQuantity.value),
    shop.currentuser.id,
    shop.currentuser.name)
  shop.sellerAddItem()
  shop.showPanel(sellerPage)
  inputSellerItemName.value= "";
  inputSellerItemCost.value= "";
  inputSellerItemQuantity.value= "";

})

// Function to modify items
sellerAllItem.addEventListener("click",function(e){
  console.log(e.target.getAttribute("class"))
  if(e.target.getAttribute("class") == "btn-modify")
  {
    shop.showPanel(sellerModifyPage)
    modifyitemid = e.target.getAttribute("id")
  }
})

// Back button in seller modify page
modifyBackBtn.addEventListener("click",function(){
  shop.showPanel(sellerPage)    
  sellerModifyItemName.value = "";
  sellerModifyItemCost.value = "";
  sellerModifyItemQuantity.value = "";
})

// Function to modify items
modifyItemsBtn.addEventListener("click",function(){
  itemsList.forEach((element) =>{
    if(element.itemid == modifyitemid)
    {
      element.itemname = sellerModifyItemName.value
      element.itemcost = sellerModifyItemCost.value 
      element.itemquantity = sellerModifyItemQuantity.value
      shop.showPanel(sellerPage)
      addingItemstoSellerPage();
      sellerModifyItemName.value = "";
      sellerModifyItemCost.value = "";
      sellerModifyItemQuantity.value = "";
    }
  })
})

// Hard coded items to display initially ( more items can be addded by the seller )
// can be removed if needed
addItem("Laptop", 35000, 160 , "", "John");
addItem("Mouse", 500, 50 , "", "noella");
addItem("Microproccesor", 2000, 200, "", "Mitchelle");
addItem("Arduino", 1000, 70 , "", "Robert");
