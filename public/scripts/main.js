const showResBtn = document.querySelectorAll(".showResBtn");
const fetchOutputs = document.querySelectorAll(".fetchOutput");

showResBtn.forEach((btn, i) => {
  let showToggle = false;
  btn.addEventListener("click", (e) => {
    e.target.innerHTML = showToggle ? "Show Result" : "Hide Result";
    fetchOutputs[i].style = `display: ${showToggle ? "none" : "block"}`;
    showToggle = !showToggle;
  });
});
