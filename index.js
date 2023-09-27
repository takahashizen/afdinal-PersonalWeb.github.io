const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const animatedBox = document.querySelector(".banner");
const navBar = document.querySelector(".navBar");
const navCenter = document.querySelector(".nav-center");
const profilImgContainer = document.querySelector(".profil-img");
const outerBox = document.querySelector(".outer-box");
const myProjects = document.querySelectorAll(".my-project");
const toastContainer = document.querySelector(".notification-center");
// Create Element
const Toast = document.createElement('div');
const lineTimer = document.createElement('div');

let lastScrollTop = 0;

// Connect to Google Sheet
const scriptURL = 'https://script.google.com/macros/s/AKfycbxDLMKS1YHcWi9teM_cCL_2LIRkGPHbAWssNBM5fgVgIB1J63CDVuCD0uVoRFcrZexS/exec'
const form = document.forms['submit-to-google-sheet']

form.addEventListener('submit', e => {
    Toast.classList.add("toast");
    Toast.classList.add("show-toast");
    lineTimer.classList.add("line-timer");

    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response => {
        document.querySelectorAll(".personal-input").forEach(input => input.value = "");
        document.querySelector("#text-message").value = "";
        // Toast Notification
        Toast.innerHTML = `<p>Success! <i class="fa-solid fa-circle-check"></i></p>`
        Toast.querySelector("i").style.color = "green";
        lineTimer.style.backgroundColor = "green";
        Toast.appendChild(lineTimer);
        toastContainer.appendChild(Toast);
        setTimeout(function(){
            Toast.classList.remove("show-toast")
        }, 4000);

        console.log(response);
    })
    .catch(error => {
        // Toast Notification
        Toast.innerHTML = `<p>Error <i class="fa-solid fa-circle-exclamation"></i></p>`;
        Toast.querySelector("i").style.color = "red";
        lineTimer.style.backgroundColor = "red";
        Toast.appendChild(lineTimer);
        toastContainer.appendChild(Toast);
        setTimeout(function(){
            Toast.classList.remove("show-toast")
        }, 4000);

        console.log(error)
    })
})

// Initialize
window.onload = function(){

    animatedBox.classList.add('show-animation');
}

// Window scroll listener
window.addEventListener("scroll", function(){

    const scrollHeight = window.pageYOffset;
    const navHeight = navBar.getBoundingClientRect().height;

    if(scrollHeight > navHeight){
        navBar.style.backgroundColor = "#111110";
        navBar.style.boxShadow = "0 0 20px black";
    }
    else{
        navBar.style.backgroundColor = "rgba(0, 0, 0, 0)";
        navBar.style.boxShadow = "none";
    }
})
window.addEventListener("scroll", function(){

    let currentScrollTop = window.pageYOffset || this.document.documentElement.scrollTop;

    if(currentScrollTop > lastScrollTop){
        navBar.classList.add("hide-nav-bar");
    }
    else{
        navBar.classList.remove("hide-nav-bar");
    }

    lastScrollTop = currentScrollTop;
})

// HTML Element event listener func
navToggle.addEventListener("click", function(){

    navLinks.classList.toggle("nav-bar");
    navToggle.classList.toggle("rotate-button");
})
profilImgContainer.addEventListener("mouseover", function(){

    outerBox.classList.add("rotate-outer-box");
})
profilImgContainer.addEventListener("mouseleave", function(){

    outerBox.classList.remove("rotate-outer-box");
})

// My Projects
myProjects.forEach(project => project.addEventListener("mouseover", function(){

    project.style.backgroundColor = "#10a0ee";
    project.style.borderColor = "aliceblue";
    project.querySelector("h3").style.color = "aliceblue";
    project.querySelector("p").style.color = "aliceblue";
}));
myProjects.forEach(project => project.addEventListener("mouseleave", function(){

    project.style.backgroundColor = "aliceblue";
    project.style.borderColor = "#10a0ee";
    project.querySelector("h3").style.color = "black";
    project.querySelector("p").style.color = "black";
}));
myProjects.forEach(project => project.addEventListener("click", function(){

    let projectName = project.getAttribute("id");
    switch (projectName){
        case "weather-project":
            window.open("https://takahashizen.github.io/afdinal-WeatherApp.github.io/", "_blank");
            break;
        case "to-do-list-project":
            window.open("https://takahashizen.github.io/afdinal-ToDoList.github.io/", "_blank");
            break;
        case "text-to-voice-project":
            window.open("https://takahashizen.github.io/afdinal-TextToVoice.github.io/", "_blank");
            break;
    }
}))

