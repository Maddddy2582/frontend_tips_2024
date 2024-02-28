const signInBtn = document.querySelector(".btn-signin");
const addBoardBtn = document.querySelector(".add-board-btn");
const btnBoardBack = document.querySelector(".btn-board-back");
const btnCreateBoard = document.querySelector(".btn-create-board");
const btnTaskBack = document.querySelector(".btn-task-back");
const btnSummaryBack = document.querySelector(".btn-summary-back");
const adminAddTaskBtn = document.querySelector(".admin-add-task-btn");
const adminSummaryBtn = document.querySelector(".admin-summary-btn");
const addMemberBtn = document.querySelector(".add-member-btn");
const btnAddMember = document.querySelector(".btn-add-member");
const btnBackAddMember = document.querySelector(".btn-back-add-member");
const memberAddTaskBtn = document.querySelector(".member-add-task-btn");
const memberProjectSummaryBtn = document.querySelector(
  ".member-project-summary-btn"
);
const memberLogout = document.querySelector(".member-logout");
const removeMemberBtn = document.querySelector(".remove-member-btn");
const btnBackRemoveMember = document.querySelector(".btn-back-remove-member");
const btnTaskBackMember = document.querySelector(".btn-task-back-member");
const btnSummaryBackMember = document.querySelector(".btn-summary-back-member");

const inputNameSignin = document.querySelector(".input-name-signin");
const inputPasswordSignin = document.querySelector(".input-password-signin");
const selectUserType = document.querySelector(".select-usertype");
const inputProjectName = document.querySelector(".input-project-name");

const adminHomepage = document.querySelector(".admin-homepage");
const logInPage = document.querySelector(".log-in-page");
const memberHomepage = document.querySelector(".member-homepage");
const addBoardPage = document.querySelector(".add-board-page");
const adminHomePageBoard = document.querySelector(".admin-home-page-board");
const addTaskPage = document.querySelector(".add-task-page");
const projectSummaryPage = document.querySelector(".project-summary-page");
const adminLogout = document.querySelector(".admin-logout");
const addNewMember = document.querySelector(".add-new-member");
const removeMember = document.querySelector(".remove-member");
const addTaskPageMember = document.querySelector(".add-task-page-member");
const projectSummaryPageMember = document.querySelector(
  ".project-summary-page-member"
);

const adminWelcomeMsg = document.querySelector(".admin-welcome");
const memberWelcomeMsg = document.querySelector(".member-welcome");

const allSections = document.querySelectorAll(".hidden");

class User {
  userName = "";
  password = "";
  isAdmin = true;
  projects = [];

  constructor(userName, password, isAdmin) {
    this.userName = userName;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}

class Webpage {
  currentuser = undefined;

  signin(username, userpassword) {
    if (!usersList.length) {
      alert("User dosen't exist please create an account");
      return;
    }
    let credentials = false;
    usersList.forEach((element) => {
      if (element.userName == username && element.password == userpassword) {
        if (element.isAdmin == true) {
          this.showSection(adminHomepage);
          this.currentuser = element;
          adminWelcomeMsg.textContent = `Welcome, ${this.currentuser.userName}`;
          credentials = true;
        } else {
          this.showSection(memberHomepage);
          this.currentuser = element;
          memberWelcomeMsg.textContent = `Welcome, ${this.currentuser.userName}`;
          credentials = true;
        }
      }
    });
    if (!credentials) alert("Wrong credentials");
  }

  createBoard() {
    let HTML = `<div class="board-container">
    <h4 class="board-label">${inputProjectName.value}</h4>
    <div class="main-board">
      <div class="name1">Pending</div>
      <div class="name1">In Progress</div>
      <div class="name1">Completed</div>
    </div>
  </div>`;
    adminHomePageBoard.insertAdjacentHTML("beforeend", HTML);
    this.showSection(adminHomepage);
  }

  // Method to display the required panel
  showSection(selectedSection) {
    allSections.forEach((element) => {
      element.classList.add("hidden");
    });
    selectedSection.classList.remove("hidden");
  }
}

const interface = new Webpage();

const addUser = function (userName, password, isAdmin) {
  usersList.push(new User(userName, password, isAdmin));
};

usersList = [];

signInBtn.addEventListener("click", function () {
  if (!inputNameSignin.value || !inputPasswordSignin.value) {
    alert("Text field can't be blank");
    return;
  }
  interface.signin(inputNameSignin.value, inputPasswordSignin.value);
  inputNameSignin.value = "";
  inputPasswordSignin.value = "";
});

addBoardBtn.addEventListener("click", function () {
  interface.showSection(addBoardPage);
});

btnCreateBoard.addEventListener("click", function () {
  interface.createBoard();
});

btnBoardBack.addEventListener("click", function () {
  interface.showSection(adminHomepage);
});

adminAddTaskBtn.addEventListener("click", function () {
  interface.showSection(addTaskPage);
});

btnTaskBack.addEventListener("click", function () {
  interface.showSection(adminHomepage);
});

btnSummaryBack.addEventListener("click", function () {
  interface.showSection(adminHomepage);
});

adminSummaryBtn.addEventListener("click", function () {
  interface.showSection(projectSummaryPage);
});

adminLogout.addEventListener("click", function () {
  interface.showSection(logInPage);
});

addMemberBtn.addEventListener("click", function () {
  interface.showSection(addNewMember);
});

btnBackAddMember.addEventListener("click", function () {
  interface.showSection(adminHomepage);
});

memberAddTaskBtn.addEventListener("click", function () {
  interface.showSection(addTaskPageMember);
});

memberProjectSummaryBtn.addEventListener("click", function () {
  interface.showSection(projectSummaryPage);
});

memberLogout.addEventListener("click", function () {
  interface.showSection(logInPage);
});

removeMemberBtn.addEventListener("click", function () {
  interface.showSection(removeMember);
});

btnBackRemoveMember.addEventListener("click", function () {
  interface.showSection(adminHomepage);
});

btnTaskBackMember.addEventListener("click", function () {
  interface.showSection(memberHomepage);
});

memberProjectSummaryBtn.addEventListener("click", function () {
  interface.showSection(projectSummaryPageMember);
});

btnSummaryBackMember.addEventListener("click", function () {
  interface.showSection(memberHomepage);
});

interface.showSection(logInPage);
// Hard coded Users
addUser("John", "Smith", true);
addUser("Alice", "Parker", false);

// createNewAccountBtn.addEventListener("click", function () {});

// const createNewUser = function () {
//   if (
//     !inputNameCreate.value ||
//     !inputPasswordCreate.value ||
//     !selectUserType.value
//   ) {
//     alert("Text field can't be blank");
//     return;
//   }
//   if (selectUserType.value === "Admin") {
//     settype = true;
//   } else {
//     settype = false;
//   }
//   addUser(inputNameCreate.value, inputPasswordCreate.value, settype);
//   inputNameCreate.value = "";
//   inputPasswordCreate.value = "";
// };

// createAccountBtn.addEventListener("click", function () {
//   if (usersList.length == 0) {
//     createNewUser();
//   } else {
//     let userexist = false;
//     usersList.forEach((element) => {
//       if (element.userName == inputNameCreate.value) {
//         userexist = true;
//         alert("Username taken :(");
//         inputNameCreate.value = "";
//         inputPasswordCreate.value = "";
//       }
//     });
//     if (!userexist) {
//       createNewUser();
//     }
//   }
// });
