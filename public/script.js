const header = document.querySelector("header");
const hamburger = document.querySelector(".hamburger");
const navList = document.querySelector(".nav-list");
const li = document.querySelectorAll("li");
const signupBtn = document.querySelector("#signUp-btn");
const overlay = document.querySelector(".overlay");
const closeOverlay = document.querySelector("#closeModalbtn");
const modSignup =document.querySelector("#modSignup");
const modLogin =document.querySelector("#modLogin");
const signupForm = document.querySelector(".signupForm");
const loginForm = document.querySelector(".loginForm");
const modal = document.querySelector(".modal");
const send_btn = document.querySelector(".send-btn");
const contactMsgOverlay = document.querySelector(".contactMsgOverlay");

window.addEventListener("scroll",function()  {
    header.classList.toggle("sticky",window.scrollY > 120);
})

hamburger.addEventListener("click",()=>{
    hamburger.classList.toggle("active");
    navList.classList.toggle("active");
})

li.forEach((n)=>{
    n.addEventListener("click",()=>{
        hamburger.classList.remove("active");
        navList.classList.remove("active");
    })
})

signupBtn.addEventListener("click",()=>{
    overlay.style.display = "block";
    modal.classList.add("active");
    modSignup.className = "active";
    modLogin.classList.remove("active");
    signupForm.style.display = "block";
    loginForm.style.display = "none";
})

if(signupForm.style.display = "block"){
    modSignup.className = "active";
}

closeOverlay.addEventListener("click",()=>{
    overlay.style.display = "none";
})

modLogin.addEventListener("click",()=>{
    modLogin.className = "active";
    modSignup.classList.remove("active");
    loginForm.style.display = "block";
    signupForm.style.display = "none";
})

modSignup.addEventListener("click",()=>{
    modSignup.className = "active";
    modLogin.classList.remove("active");
    signupForm.style.display = "block";
    loginForm.style.display = "none";
})

send_btn.addEventListener("click",()=>{
    contactMsgOverlay.style.display = "block";
    setTimeout(()=>{
        contactMsgOverlay.style.display = "none";
    },1200)
})