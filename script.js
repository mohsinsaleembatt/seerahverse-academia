// Code for Typing effect - Start

var i = 0;
var txt = 'leaders in the next generation!';
var speed = 100;

function typeWriter() {
	if (i < txt.length) {
		document.getElementById("typing").innerHTML += txt.charAt(i);
		i++;
		setTimeout(typeWriter, speed);
	} else {
		// Reset after complete
		setTimeout(() => {
			document.getElementById("typing").innerHTML = "";
			i = 0;
			typeWriter(); // start again
		}, 1000); // wait 1 second before restarting
	}
}

// Start automatically
window.onload = typeWriter;

// Code for Typing effect - End

// Code for toggle button functionality - Start
// This code is for the toggle button to expand/collapse text content

const btn = document.getElementById("toggleBtn");
const text = document.getElementById("text");

//Still to work on it.

btn.addEventListener("click", () => {
	text.classList.toggle("expanded");
	btn.textContent = text.classList.contains("expanded") ? "Read Less" : "Read More";
});

// Code for toggle button functionality - End
// Ensure the toggle button functionality works with the HTML structure



 