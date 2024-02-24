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
// const productToCartBtn = document.querySelectorAll(".btn-product-tocart");
console.log(btnCreateAccount);
let settype;
let cartItem;

class Items {
  static itemidgenerator = 1;
  itemcost = "";
  itemname = "";
  itemquantity = "";
  isAvailable = true;
  constructor(itemname, itemcost, itemquantity) {
    this.itemid = Items.itemidgenerator;
    this.itemname = itemname;
    this.itemcost = itemcost;
    this.itemquantity = itemquantity;
    this.isAvailable = true;
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
        shop.showPanel(buyerPage);
        this.currentuser = element;
        this.addItemstobuyerPage();
      } else {
        alert("User dosen't exist please create an account");
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

  // Method to add items to cart
  // addtocart(selectedItemId, selectedQuantity) {
  //   itemsList.forEach((element) => {
  //     if (
  //       element.itemid === selectedItemId &&
  //       element.itemquantity > selectedQuantity
  //     ) {
  //       usersList.forEach((user) => {
  //         if (user.id === this.currentuser.id) {
  //           this.currentuser.cart.push(element);
  //         }
  //       });
  //       element.itemquantity -= selectedQuantity;
  //     }
  //   });
  // }

  addItemstobuyerPage() {
    itemsList.forEach((element) => {
      addingItemsTobuyerPage(element);
    });
  }

  addItemstoCart() {
    cartItem = [...new Set(this.currentuser.cart)];
    addingItemstoCart(cartItem);
  }

  calculateTotalAmount() {
    let total = 0;
    cartItem.forEach((element) => {
      total += element.itemcost;
    });
    return total;
  }

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
    User.generator++;
  }
}

usersList = [];
itemsList = [];

//Adding new user
const addUser = function (name, password, isBuyer) {
  usersList.push(new User(name, password, isBuyer));
};

//Adding new items to the shop
const addItem = function (itemname, itemcost, itemquantity) {
  itemsList.push(new Items(itemname, itemcost, itemquantity));
};

const shop = new Store();
shop.showPanel(logInPage);

// Creating new Account button
createNewAccountBtn.addEventListener("click", function () {
  shop.showPanel(createAccountPage);
});

backBtn.addEventListener("click", function () {
  shop.showPanel(logInPage);
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
  shop.showPanel(logInPage);
  console.log(usersList);
});

btnSignin.addEventListener("click", function () {
  if (!inputNameSignin.value || !inputPasswordSignin.value) {
    alert("Text field can't be blank");
    return;
  }
  shop.signin(inputNameSignin.value, inputPasswordSignin.value);
});

addItem("Laptop", 35000, 160);
addItem("Mouse", 500, 50);
addItem("Microproccesor", 2000, 200);
addItem("Arduino", 1000, 70);
addItem("Node mcu", 700, 500);
addItem("Speakers", 3000, 50);
addItem("Mobile", 20000, 20);
console.log(itemsList);

const addingItemsTobuyerPage = function (element) {
  let HTML = `<div class="buyer-items">
  <div class="product-img"></div>
  <p class="product-name">${element.itemname}</p>
  <p class="product-cost">Price: $${element.itemcost}</p>
  <p class="product-quantity">Available Quantity: ${element.itemquantity}</p>
  <input class="input-quantity ${element.itemid}" type="number" min="1" value="1" />
  <button class="btn-product-tocart" id="${element.itemid}">Add to cart</button>
  </div>`;
  itemsToDisplay.insertAdjacentHTML("beforeend", HTML);
};

const addingItemstoCart = function (cartItem) {
  itemsInCart.innerHTML = "";
  cartItem.forEach((element) => {
    let HTML = `<div class="cart-item">
  <div class="product-img"></div>
  <p class="product-name">${element.itemname}</p>
  <p class="product-quantity">Quantity:${element.itemquantity}</p>
  <p class="product-cost">Price: $${element.itemcost}</p>
  </div>`;
    itemsInCart.insertAdjacentHTML("beforeend", HTML);
  });
};

itemsToDisplay.addEventListener("click", function (e) {
  itemsList.forEach((element) => {
    if (element.itemid == Number(e.target.getAttribute("id"))) {
      shop.currentuser.cart.push(element);
      const quantityvalue = document.getElementsByClassName(
        `${element.itemid}`
      )[0].value;
      console.log(quantityvalue);
    }
  });
});

cartBtn.addEventListener("click", function () {
  shop.addItemstoCart();
  shop.showPanel(buyerCartPage);
  totalAmount.textContent = `$${shop.calculateTotalAmount()}`;
});

buyerBackBtn.addEventListener("click", function () {
  shop.showPanel(buyerPage);
});
