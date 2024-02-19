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
    console.log(this.availableCash);
  }
  getBalance() {
    return this.availableCash;
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
        UI.style.opacity = "100";
      }
    });
  }
  logout() {
    this.selectedUserAccount = undefined;
    UI.style.opacity = "0";
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
    this.balance -= withdrawMoney;
    atmMachine.withdrawAmount(withdrawMoney);
    console.log(this.balance);
  }
  getBalance() {
    return this.balance;
  }
}

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

const UI = document.querySelector(".ui");

const submitBtn = document.querySelector(".btn-submit");
const withdrawBtn = document.querySelector(".btn-withdraw");
const depositBtn = document.querySelector(".btn-deposit");
const logoutBtn = document.querySelector(".btn-logout");
const balanceBtn = document.querySelector(".btn-balance");

let accountNumber = document.querySelector(".account-number");
let accountPin = document.querySelector(".account-pin");

let withdrawValue = document.querySelector(".withdraw-amount");
let depositValue = document.querySelector(".deposit-amount");

submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  atmMachine.login();
  accountPin.value = "";
  accountNumber.value = "";
});

withdrawBtn.addEventListener("click", function () {
  atmMachine.selectedUserAccount.withdrawAmount();
  withdrawValue.value = "";
});

depositBtn.addEventListener("click", function () {
  atmMachine.selectedUserAccount.depositAmount();
  depositValue.value = "";
});

logoutBtn.addEventListener("click", function () {
  atmMachine.logout();
});

balanceBtn.addEventListener("click", function () {
  console.log(atmMachine.selectedUserAccount.getBalance());
});

const atmMachine = new ATM();
const kepha = new UserAccount(1000, "KR", 1111, 1234);
const madav = new UserAccount(5000, "MM", 2222, 5678);
const userAccounts = [kepha, madav];
