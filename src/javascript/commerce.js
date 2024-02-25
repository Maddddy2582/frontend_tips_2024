const btnCreateAccount = document.querySelector(".btn-create-account");
const inputNameCreate = document.querySelector(".input-name-create");
const inputPasswordCreate = document.querySelector(".input-password-create");
const inputNameSignin = document.querySelector(".input-name-signin");
const inputPasswordSignin = document.querySelector(".input-password-signin");
const selectUserType = document.querySelector(".select-usertype");
const btnSignin = document.querySelector(".btn-signin");
const allPanels = document.querySelectorAll(".hidden");
const logInPage = document.querySelector(".log-in-page");
const createNewAccountBtn = document.querySelector(".btn-create-new-account");
const createAccountPage = document.querySelector(".create-account-page");
const backBtn = document.querySelector(".btn-back");
const buyerPage = document.querySelector(".buyer-page");
const itemsToDisplay = document.querySelector(".items-to-display");
const cartBtn = document.querySelector(".btn-cart");
const buyerCartPage = document.querySelector(".buyer-cart-page");
const itemsInCart = document.querySelector(".items-in-cart");
const totalAmount = document.querySelector(".total-amount");
const buyerBackBtn = document.querySelector(".btn-buyer-back");
const homepageBtn = document.querySelector(".btn-homepage");
const logoutBtn = document.querySelector(".btn-logout")
const checkoutBtn = document.querySelector(".btn-checkout")
const successPage = document.querySelector(".success-page")
const sellerPage = document.querySelector(".seller-page")
const logo = document.querySelector(".logo-img")
const toAddPageBtn = document.querySelector(".btn-to-add-page")
const sellerAddPage = document.querySelector(".seller-add-page")
const backSellerBtn = document.querySelector(".btn-seller-back")
const addItemsBtn = document.querySelector(".btn-add-items")
const inputSellerItemName = document.querySelector(".input-seller-item-name")
const inputSellerItemCost = document.querySelector(".input-seller-item-cost")
const inputSellerItemQuantity = document.querySelector(".input-seller-item-quantity")
const sellerAllItem= document.querySelector(".seller-all-item")


// const productToCartBtn = document.querySelectorAll(".btn-product-tocart");
console.log(btnCreateAccount);
let settype;
let cartItem;
let quantityvalue;


class Items {
  static itemidgenerator = 1;
  itemname = "";
  itemcost = "";
  itemquantity = "";
  itemaddedby = "";
  isAvailable = true;
  constructor(itemname, itemcost, itemquantity, itemaddedby) {
    this.itemid = Items.itemidgenerator;
    this.itemname = itemname;
    this.itemcost = itemcost;
    this.itemquantity = itemquantity;
    this.itemaddedby = itemaddedby
    this.isAvailable = true;
    this.itemselected = 0;
    Items.itemidgenerator++;
  }
}

class Store {
  currentuser = undefined;

  constructor() {}

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
      else {
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


  addItemstobuyerPage() {
     addingItemsTobuyerPage(itemsList);
  }

  addItemstoCart() {
    cartItem = [...new Set(this.currentuser.cart)];
    addingItemstoCart(cartItem);
  }

  calculateTotalAmount() {
    let total = 0;
    cartItem.forEach((element) => {
      total += element.itemcost*element.itemselected;
    });
    return total;
  }

  sellerAddItem(){
    addingItemstoSellerPage()
  }

  // addItemstoSellerCart() {
  //   sellerCartItem = [...new Set(this.currentuser.cart)];
  //   addingItemstoCart(cartItem);
  // }

  // Method to show the required
  showPanel(selectedPanel) {
    allPanels.forEach((element) => {
      element.classList.add("hidden");
    });
    selectedPanel.classList.remove("hidden");
  }
}

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

usersList = [];
itemsList = [];

//Adding new user
const addUser = function (name, password, isBuyer) {
  usersList.push(new User(name, password, isBuyer));
};

//Adding new items to the shop
const addItem = function (itemname, itemcost, itemquantity, itemaddedby) {
  itemsList.push(new Items(itemname, itemcost, itemquantity, itemaddedby));
};

const shop = new Store();
shop.showPanel(logInPage);


// Logo
logo.addEventListener("click",function()
{
  shop.showPanel(logInPage);
});

// Creating new Account button
createNewAccountBtn.addEventListener("click", function () {
  shop.showPanel(createAccountPage);
});

backBtn.addEventListener("click", function () {
  shop.showPanel(logInPage);
  inputNameCreate.value = "";
  inputPasswordCreate.value = "";
});

btnCreateAccount.addEventListener("click", function () {
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

btnSignin.addEventListener("click", function () {
  if (!inputNameSignin.value || !inputPasswordSignin.value) {
    alert("Text field can't be blank");
    return;
  }
  shop.signin(inputNameSignin.value, inputPasswordSignin.value);
  inputNameSignin.value = "";
  inputPasswordSignin.value = ""; 
});

// addUser(1,1,true)
addUser(2,2,false)
addItem("Laptop", 35000, 160);
addItem("Mouse", 500, 50);
addItem("Microproccesor", 2000, 200);
addItem("Arduino", 1000, 70);
addItem("Node mcu", 700, 500);
addItem("Speakers", 3000, 50);
addItem("Mobile", 20000, 20);

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
      <input class="input-quantity ${element.itemid}" type="number" min="1" value="1" />
      <button class="btn-product-tocart" id="${element.itemid}">Add to cart</button>
      </div>`;
      itemsToDisplay.insertAdjacentHTML("beforeend", HTML);
      }
  });
};

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

const addingItemstoSellerPage = function (){
  itemsList.forEach(element=>{
    if(element.itemaddedby == shop.currentuser.id)
    {
      shop.currentuser.cart.push(element)
    }
  });
  let sellerCartItem = [...new Set(shop.currentuser.cart)]
  sellerAllItem.innerHTML = "";
  sellerCartItem.forEach((element)=>{

    if(element.itemaddedby == shop.currentuser.id)
    {

      let HTML = `<div class="seller-items">
      <div class="seller-product-img"></div>
      <p class="seller-product-name">${element.itemname}</p>
      <p class="seller-product-cost">Price: $${element.itemcost}</p>
      <p class="seller-product-quantity">Available Quantity: ${element.itemquantity}</p>
    </div>`;
      sellerAllItem.insertAdjacentHTML("beforeend",HTML)
    }

  })    
}

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

buyerBackBtn.addEventListener("click", function () {
  shop.showPanel(buyerPage);
});

checkoutBtn.addEventListener("click",function()
{
  if(totalAmount.textContent == "$0"){
    alert("Your cart is Empty")
  }
  else{
    shop.showPanel(successPage)
  }
})

homepageBtn.addEventListener("click",function(){
  shop.currentuser.cart = [];
  shop.showPanel(buyerPage)
  shop.addItemstobuyerPage()
});

logoutBtn.addEventListener("click",function()
{
  shop.showPanel(logInPage)
});

toAddPageBtn.addEventListener("click",function(){
  shop.showPanel(sellerAddPage)
})

backSellerBtn.addEventListener("click",function(){
  shop.showPanel(sellerPage)
})

addItemsBtn.addEventListener("click",function(){
  if(!inputSellerItemName.value || !inputSellerItemCost.value || !inputSellerItemQuantity.value)
  {
    alert("Text field can't be empty")
    return;
  }
   addItem(inputSellerItemName.value,
    Number(inputSellerItemCost.value),
    Number(inputSellerItemQuantity.value),
    shop.currentuser.id)
  shop.sellerAddItem()
})