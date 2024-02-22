class ATM {
  selectedUserAccount = undefined;
  availableCash = 10000;
  depositAmount(depositMoney) {
    // if (!this.selectedUserAccount) {
    //   return;
    // }
    // // setting the appropriate UI
    // let depositAmount = getDepositAmount();
    // this.selectedUserAccount.depositAmount(depositAmount);
    this.availableCash += Number(depositMoney);
    console.log(this.availableCash);
  }

  withdrawAmount(withdrawMoney) {
    this.availableCash -= withdrawMoney;
    setTimeout(() => {
      atmMachine.showPanel(withdrawMsg);
      setTimeout(() => {
        this.showPanel(receipt);
      }, 1000);
    }, 3000);
    atmMachine.showPanel(waitMsg);
  }

  getBalance() {
    return this.availableCash;
  }

  submitfunc() {
    this.login();
    WelcomeMsg.textContent = `Hi, ${atmMachine.selectedUserAccount.accountName}, your account details:`;
    accName.textContent = `Account Name: ${atmMachine.selectedUserAccount.accountName}`;
    accNum.textContent = `Account Number: ${atmMachine.selectedUserAccount.accountNumber}`;
    accBal.textContent = `Account Balance: ${atmMachine.selectedUserAccount.balance}`;
  }

  login() {
    let accountNumber = getAccountNumber();
    let accountPin = getAccountPin();
    // after validation
    // setting the appropriate UI
    userAccounts.forEach((user) => {
      if (
        user.accountNumber == +accountNumber &&
        user.accountPin == +accountPin
      ) {
        this.selectedUserAccount = user;
        this.showPanel(accDetails);
      }
    });
  }
  logout() {
    this.selectedUserAccount = undefined;
    UI.style.opacity = "0";
  }

  showPanel(selectedpanel) {
    allPanels.forEach((element) => {
      element.style.display = "none";
    });
    selectedpanel.style.display = "flex";
  }
}

//-----------------------------------------
class UserAccount {
  balance = 0;
  accountNumber = "";
  accountName = "";
  accountPin = "";

  constructor(balance, accountName, accountNumber, accountPin) {
    this.balance = balance;
    this.accountName = accountName;
    this.accountNumber = accountNumber;
    this.accountPin = accountPin;
  }
  depositAmount() {
    const depositMoney = getDepositAmount();
    this.balance += Number(depositMoney);
    atmMachine.depositAmount(depositMoney);
    console.log(this.balance);
  }
  withdrawAmount() {
    const withdrawMoney = getWithdrawAmount();
    if (withdrawMoney <= this.balance) {
      this.balance -= withdrawMoney;
      atmMachine.withdrawAmount(withdrawMoney);
    } else {
      setTimeout(() => {
        atmMachine.showPanel(withdrawPanel);
        accDetails.classList.add("hidden");
      }, 1000);
      atmMachine.showPanel(errorMsg);
    }
  }
  getBalance() {
    return this.balance;
  }
}

// Functions to get Values

const getAccountNumber = function () {
  return document.querySelector(".account-number").value;
};

const getAccountPin = function () {
  return document.querySelector(".account-pin").value;
};
const getWithdrawAmount = function () {
  return document.querySelector(".withdraw-amount").value;
};

const getDepositAmount = function () {
  return document.querySelector(".deposit-amount").value;
};

// All selections

const UI = document.querySelector(".ui");

const allBtn = document.getElementById("buttons");
const submitBtn = document.querySelector(".btn-submit");
const withdrawBtn = document.querySelector(".withdraw-btn");
const mainWithdrawBtn = document.querySelector(".main-withdraw-btn");
const depositBtn = document.querySelector(".btn-deposit");
const logoutBtn = document.querySelector(".btn-logout");
const balanceBtn = document.querySelector(".btn-balance");
const continueBtn = document.querySelector(".continue-btn");

const signIn = document.querySelector(".sign-in");
const allPanels = document.querySelectorAll(".panel");
const atmLabel = document.querySelector(".atm-label");
const accDetails = document.querySelector(".account-details");

let accountNumber = document.querySelector(".account-number");
let accountPin = document.querySelector(".account-pin");

const accName = document.querySelector(".acc-name");
const accNum = document.querySelector(".acc-num");
const accBal = document.querySelector(".acc-bal");

let withdrawValue = document.querySelector(".withdraw-amount");
let depositValue = document.querySelector(".deposit-amount");

const withdrawPanel = document.querySelector(".withdraw-panel");

const withdrawMsg = document.querySelector(".withdraw-msg");
const waitMsg = document.querySelector(".wait-msg");
const errorMsg = document.querySelector(".error-msg");
const WelcomeMsg = document.querySelector(".welcome-msg");

const receipt = document.querySelector(".receipt");

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  atmMachine.submitfunc();
  accountNumber.value = "";
  accountPin.value = "";
});

withdrawBtn.addEventListener("click", function () {
  atmMachine.selectedUserAccount.withdrawAmount();
  withdrawValue.value = "";
});

mainWithdrawBtn.addEventListener("click", function () {
  atmMachine.showPanel(withdrawPanel);
});

continueBtn.addEventListener("click", function () {
  atmMachine.showPanel(allBtn);
});

// depositBtn.addEventListener("click", function () {
//   atmMachine.selectedUserAccount.depositAmount();
//   depositValue.value = "";
// });

// logoutBtn.addEventListener("click", function () {
//   atmMachine.logout();
// });

// balanceBtn.addEventListener("click", function () {
//   console.log(atmMachine.selectedUserAccount.getBalance());
// });

const atmMachine = new ATM();

atmMachine.showPanel(signIn);

const kepha = new UserAccount(1000, "Suriya", 1, 1);
const madav = new UserAccount(5000, "Madav", 2, 2);
const userAccounts = [kepha, madav];
