// Selecting all buttons
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
const btnAddTask = document.querySelector(".btn-add-task");
const btnModifyTask = document.querySelector(".btn-modify-task");
const btnModifyTaskConfirm = document.querySelector(".btn-modify-task-confirm");
const btnModifyBack = document.querySelector(".btn-modify-back");

// Selecting all the input values
const inputNameSignin = document.querySelector(".input-name-signin");
const inputPasswordSignin = document.querySelector(".input-password-signin");
const selectUserType = document.querySelector(".select-usertype");
const inputProjectName = document.querySelector(".input-project-name");
const inputTaskName = document.querySelector(".input-task-name");
const inputDuedate = document.querySelector(".input-duedate");
const selectMember = document.querySelector(".select-member");
const selectTasktype = document.querySelector(".select-tasktype");
const listOfMembers = document.querySelectorAll(".list-of-members");
const listOfProjects = document.querySelector(".list-of-projects");
const taskDescp = document.querySelector(".task-descp");
const inputModifyName = document.querySelector(".input-modify-name");
const inputModifyDuedate = document.querySelector(".input-modify-duedate");
const modifyListOfMembers = document.querySelector(".modify-list-of-members");
const modifyTasktype = document.querySelector(".modify-tasktype");
const modifyTaskDescp = document.querySelector(".modify-task-descp");
const pendingTasksLabel = document.querySelector(".pending-tasks-label");
const membersNameLabel = document.querySelector(".members-name-label");

// Selecting all the panels to display
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
const modifyTaskPage = document.querySelector(".modify-task-page");

// Selecting all the labels
const adminWelcomeMsg = document.querySelector(".admin-welcome");
const memberWelcomeMsg = document.querySelector(".member-welcome");
const leaderNameLabel = document.querySelector(".leader-name-label");

// Selecting all the panels that need to be hidden
const allSections = document.querySelectorAll(".hidden");

// Required Global variable
let projectTracker = 1;
let taskTracker = 1;
let dragObj;
usersList = [];

// Class for user
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

// Class for the whole UI
class Webpage {
  currentuser = undefined;
  currentproject = undefined;
  currenttask = undefined;
  allTasks = [];

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

  // Method to create a board
  createBoard() {
    let user = this.currentuser;
    user.projects.push(new Project(inputProjectName.value, user.userName));
    let HTML = `<div class="board-container ${inputProjectName.value} hide-board"  id="${projectTracker}">
    <h4 class="board-label">${inputProjectName.value}</h4>
    <div class="main-board">
      <div class="Pending dropBox">Pending</div>
      <div class="In-Progress dropBox">In Progress</div>
      <div class="Completed dropBox">Completed</div>
    </div>
  </div>`;
    adminHomePageBoard.insertAdjacentHTML("beforeend", HTML);
    this.showSection(adminHomepage);
    let projectName = `<option>${inputProjectName.value}</option>`;
    listOfProjects.insertAdjacentHTML("beforeend", projectName);
    projectTracker++;
  }

  // Method to show the selected project
  showSelectedBoard(selectedBoard) {
    let currentBoard = document.getElementsByClassName(`${selectedBoard}`);
    this.currentproject = currentBoard[0];
    let hideBoard = document.querySelectorAll(".board-container");
    hideBoard.forEach((element) => {
      element.classList.add("hide-board");
    });
    currentBoard[0].classList.remove("hide-board");
  }

  // Metod to create a task
  createTask(name, deadline, member, priority, description) {
    this.allTasks.push(new Task(name, deadline, member, priority, description));
    let prioritySection = this.currentproject.querySelector(`.${priority}`);
    let HTML = `<div class="card"  draggable="true" id="task-${taskTracker}">${name}</div>`;
    taskTracker++;
    prioritySection.insertAdjacentHTML("beforeend", HTML);
    const dropbox = document.querySelectorAll(".dropBox");
    dropbox.forEach((element) => {
      element.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      element.addEventListener("drop", () => {
        element.appendChild(dragObj);
      });
    });
  }

  // Method to Modify Task
  modifyTask() {
    popup.style.display = "none";
    inputModifyName.value = `${this.currenttask.name}`;
    inputModifyDuedate.value = `${this.currenttask.deadline}`;
    modifyTasktype.value = `${this.currenttask.priority}`;
    modifyTaskDescp.value = `${this.currenttask.description}`;
  }

  // Method to confirm the modifications
  confirmModify() {
    this.showSection(adminHomepage);
    let mainBoard = document.querySelector(".main-board");
    this.currenttask.name = inputModifyName.value;
    this.currenttask.deadline = inputModifyDuedate.value;
    this.currenttask.member = modifyListOfMembers.value;
    this.currenttask.priority = modifyTasktype.value;
    this.currenttask.description = modifyTaskDescp.value;
    let currentTaskLabel = mainBoard.querySelector(
      `#task-${this.currenttask.taskid}`
    );
    currentTaskLabel.textContent = `${inputModifyName.value}`;
  }

  // Method to display the required panel
  showSection(selectedSection) {
    allSections.forEach((element) => {
      element.classList.add("hidden");
    });
    selectedSection.classList.remove("hidden");
  }
}

class Project {
  static projectIdgenerator = 1;
  name = "";
  creatorName = "";
  tasks = [];

  constructor(name, creatorName) {
    this.name = name;
    this.creatorName = creatorName;
    this.projectId = Project.projectIdgenerator;
    Project.projectIdgenerator++;
  }
}

class Task {
  static taskIdgenerator = 1;
  name = "";
  deadline = "";
  member = "";
  priority = "";
  description = "";
  constructor(name, deadline, member, priority, description) {
    this.taskid = Task.taskIdgenerator;
    this.name = name;
    this.deadline = deadline;
    this.member = member;
    this.priority = priority;
    this.description = description;
    Task.taskIdgenerator++;
  }
}

const interface = new Webpage();

const addUser = function (userName, password, isAdmin) {
  usersList.push(new User(userName, password, isAdmin));
  listOfMembers.forEach((element) => {
    if (!isAdmin) {
      let HTML = `<option>${userName}</option>`;
      element.insertAdjacentHTML("beforeend", HTML);
    }
  });
};

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
  if (!inputProjectName.value) {
    alert("Enter a project name");
    interface.showSection(createBoard);
  }
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
  leaderNameLabel.textContent = `Admin Name: ${interface.currentuser.userName}`;
  pendingTasksLabel.textContent = `Number of tasks remining: ${interface.allTasks.length}`;
  interface.allTasks.forEach((element) => {
    membersNameLabel.innerHTML = "";
    let HTML = `<p>${element.member}</p>`;
    membersNameLabel.insertAdjacentHTML("beforeend", HTML);
  });
  interface.showSection(projectSummaryPage);
});

adminLogout.addEventListener("click", function () {
  interface.showSection(logInPage);
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

btnTaskBackMember.addEventListener("click", function () {
  interface.showSection(memberHomepage);
});

memberProjectSummaryBtn.addEventListener("click", function () {
  interface.showSection(projectSummaryPageMember);
});

btnSummaryBackMember.addEventListener("click", function () {
  interface.showSection(memberHomepage);
});

btnAddTask.addEventListener("click", function () {
  interface.createTask(
    inputTaskName.value,
    inputDuedate.value,
    selectMember.value,
    selectTasktype.value,
    taskDescp.value
  );
  inputTaskName.value = "";
  inputDuedate.value = "";
  selectMember.value = "";
  selectTasktype.value = "";
  taskDescp.value = "";
  interface.showSection(adminHomepage);
});

listOfProjects.addEventListener("change", function () {
  interface.showSelectedBoard(listOfProjects.value);
});

adminHomepage.addEventListener("dragstart", function (e) {
  dragObj = e.target;
});

adminHomepage.addEventListener("click", function (e) {
  interface.allTasks.forEach((element) => {
    if (`task-${element.taskid}` === e.target.getAttribute("id")) {
      popup.style.display = "flex";
      interface.currenttask = element;
      const taskName = document.querySelector(".task-name");
      const taskDuedate = document.querySelector(".task-duedate");
      const taskMember = document.querySelector(".task-member");
      const taskPriority = document.querySelector(".task-priority");
      const taskDescription = document.querySelector(".task-description");
      taskName.textContent = `Task Name: ${element.name}`;
      taskDuedate.textContent = `Due Date: ${element.deadline}`;
      taskMember.textContent = `Member Assigned: ${element.member}`;
      taskPriority.textContent = `Priority: ${element.priority}`;
      taskDescription.textContent = `Description: ${element.description}`;
    }
    window.addEventListener("click", function (event) {
      if (event.target === popup) {
        popup.style.display = "none";
      }
    });
  });
});

btnModifyTask.addEventListener("click", function () {
  interface.showSection(modifyTaskPage);
  interface.modifyTask();
});

btnModifyTaskConfirm.addEventListener("click", function () {
  interface.confirmModify();
});

btnModifyBack.addEventListener("click", function () {
  interface.showSection(adminHomepage);
});

// Show the login page
interface.showSection(logInPage);

// Hard coded Users
addUser("John", "Smith", true);
addUser("Alice", "Parker", false);
addUser("tony", "stark", false);
