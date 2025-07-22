const openModule = document.getElementById("openModule");
const details = document.getElementById("details");
const plus = document.getElementById("plus");
const expand = document.querySelector(".expanded");

openModule.addEventListener("click", () => {
	if (plus.className = "fa fa-plus") {
		plus.className = "fa fa-minus";
	} else {
		plus.className = "fa fa-plus";
	}
	openModule.classList.toggle("expanded");
	details.style.display = "block";
	if (expand.className = "expanded") {
		details.addEventListener("click", () => {
			style.transition = "all 0.5s ease-in-out";
		}) 
	} else {
		styleText.style.display = "none";

	}
	expanded.style.transition = "all 0.5s ease-in-out";
	// details.addEventListener("click", () => {
	// 	expanded.style.marginTop = "100%";
	// })

})
