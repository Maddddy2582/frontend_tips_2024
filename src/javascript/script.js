const dpdn1 = document.querySelector(".dpdn-1");
const dpdn2 = document.querySelector(".dpdn-2");
const allPanels = document.querySelectorAll(".panel");
const userSelect = document.querySelector(".user-select");
const chatBtn1 = document.querySelector(".chat-btn1");
const allPpl = document.querySelectorAll(".ppl");
const alice = document.querySelector(".Alice-chat");
const bob = document.querySelector(".Bob-chat");
const charles = document.querySelector(".Charles-chat");
const donbos = document.querySelector(".Donbos-chat");
const elixir = document.querySelector(".Elixir-chat");
const textBox1 = document.querySelector(".text-box1");
const sendBtn1 = document.querySelector(".send-btn1");
const sendMsg = document.querySelector(".send-message");
let receiver;
let message;

const userArr = ["Alice", "Bob", "Charles", "Donbos", "Elixir"];

class Whatsapp {
  currentUser = undefined;
  showPanel(selectedpanel) {
    console.log(selectedpanel);
    allPanels.forEach((element) => {
      element.style.display = "none";
    });
    selectedpanel.style.display = "flex";
  }

  callbob() {}
}
const whatsappUser = new Whatsapp();

class Users {
  constructor() {}
  Alice() {}
  Bob() {
    console.log("HELLO");
  }
  Charles() {}
  Donbos() {}
  Elixir() {}
}

const AliceWhatsapp = new Users();
const BobWhatsapp = new Users();
const CharlesWhatsapp = new Users();
const DonbosWhatsapp = new Users();
const ElixirWhatsapp = new Users();

dpdn1.addEventListener("change", function () {
  whatsappUser.currentUser = dpdn1.value;
  allPpl.forEach((element) => {
    element.classList.add("panel");
  });
  sendMsg.style.opacity = 0;
  whatsappUser.showPanel();
});

chatBtn1.addEventListener("click", function () {
  console.log(whatsappUser.currentUser);
  const notUser = document.getElementById(`${whatsappUser.currentUser}`);
  allPpl.forEach((element) => {
    element.classList.remove("panel");
  });
  notUser.classList.add("panel");
  whatsappUser.showPanel(userSelect);
  sendMsg.style.opacity = 0;
});

userSelect.addEventListener("click", function (e) {
  //   chatBtn1.classList.add("panel");
  message = e.target.getAttribute("id");
  receiver = message;
  console.log(whatsappUser.callbob());

  //   console.log(`${summa}.${receiver}`());
  //Alice.Bob()

  whatsappUser.showPanel(document.querySelector(`.${message}`));
  sendMsg.style.opacity = 100;
});

sendBtn1.addEventListener("click", function () {
  const receiverChatSpace = document.querySelector(`.${receiver}-chat-space`);
  if (textBox1.value.trim() == "") {
    return;
  } else {
    const HTML = `<p class="message-now">${textBox1.value}</p>`;
    receiverChatSpace.insertAdjacentHTML("beforeend", HTML);
  }
  textBox1.value = "";
});
