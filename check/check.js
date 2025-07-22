const btn = document.getElementById("toggleBtn");
const text = document.getElementById("text");

btn.addEventListener("click", () => {
	text.classList.toggle("expanded");
	btn.textContent = text.classList.contains("expanded") ? "Read Less" : "Read More";
});