const offBtn = document.querySelector(".off-btn");

offBtn.addEventListener("click", function () {
  offBtn.textContent =
    offBtn.textContent == "OFF"
      ? (offBtn.textContent = "ON")
      : (offBtn.textContent = "OFF");
});
