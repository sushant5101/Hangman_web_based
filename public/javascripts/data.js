const confirmtrigger = document.getElementById("confirmtrigger");
const password = document.getElementById("password");
const trigger = document.getElementById("trigger");
const enter = document.getElementById("enter");
const username = document.getElementById("username");
const clickme = document.getElementById("clickme");
const footquestion = document.getElementById("question");
const usernamelabel = document.getElementById("userlabel");
const passwordlabel = document.getElementById("passwordlabel");
let userExists = false;
// const headquestion = document.getElementById("headquestion");
const confirmpass = document.getElementById("confirmpassword");
const confirmpassbox = document.getElementById("five");
const userfeedback = document.getElementById("info");
const confirmpassinfo = document.getElementById("confirmpassinfo");
const cookievalue = getCookie("username");

function visibility(input, action) {
    if (input.type === "password") {
        input.type = "text";  // Show password
        action.innerText = "Θ";
        input.focus();
    } else {
        input.type = "password";  // Hide password
        action.innerText = "O";
        input.focus();
    }
}


async function getuser() {
    try {
        const response = await fetch("https://hangman-fuil.onrender.com/get-bin");
        if (response.ok) {
            return await response.json();
        } else {
            console.log("Failed to fetch data");
            return null;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

enter.addEventListener("click", () => {
    if (usernamelabel.innerText === "Enter your username") {
        checkuser();
    } else {
        registeruser();
    }
})

async function checkuser() {
    const userData = await getuser(); // Access the data here
    if (userData.hangman_user) {
        // console.log(userData.hangman_user);
        userData.hangman_user.forEach(user => {
            if (user.name === username.value && user.pass === password.value && username.value && password.value) {
                userExists = true;
                localStorage.setItem("username", username.value);
                setCookie('username', username.value, 7);
                window.location.href = "https://puzzleman-3ce04.web.app/";
                // console.log("located to home page");
                return 0;
            }
        });
    }
    if (!userExists) {
        userfeedback.innerText = `You have entred user name or password wrong `
    }
    userExists = false;
}

async function registeruser() {
    const userData = await getuser(); // Access the data here
    if (userData.hangman_user && usernamelabel.innerText == "Register your username") {
        userData.hangman_user.forEach(user => {
            if (user.name === username.value && username.value !== "" && password.value !== "") {
                userExists = true;
                userfeedback.innerText = `username ${username.value} already exist pick another`
            }
        });
        if (!userExists && username.value !== "" && password.value !== "" && password.value === confirmpass.value) {
            confirmpassinfo.style.visibility = "hidden";
            userfeedback.style.visibility = "hidden";
            await addUser(username.value, password.value);
            localStorage.setItem("username", username.value);
            setCookie('username', username.value, 7);
            window.location.href = "https://puzzleman-3ce04.web.app/";
            // console.log("located to home page");
        } else if (password.value !== confirmpass.value) {
            confirmpassinfo.style.visibility = "visible";

        }
    }
}

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
    console.log("Cookie updated");
}

function getCookie(name) {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(nameEQ) === 0) return cookie.substring(nameEQ.length);
    }
    return null;
}

if (cookievalue) {
    console.log("User is already logged in");
    window.location.href = "https://puzzleman-3ce04.web.app/";
    // console.log("located to home page");
}



async function addUser(name, pass) {
    try {
        const response = await fetch('https://hangman-fuil.onrender.com/add-user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: name, pass: pass })
        });

        if (response.ok) {
            console.log('User data added successfully.');
        } else {
            console.error('Error adding user data:', response.statusText);
        }

    } catch (error) {
        console.error('Error adding user data:', error);
    }
}

clickme.addEventListener("click", () => {
    if (usernamelabel.innerText === "Enter your username") {
        usernamelabel.innerText = "Register your username";
        // headquestion.style.visibility = "visible";
        confirmpassbox.style.visibility = "visible";
        userfeedback.style.visibility = "hidden";
        footquestion.innerText = "Already have an account ?";
        username.value = "";
        password.value = "";
        confirmpass.value = "";
    }
    else {
        usernamelabel.innerText = "Enter your username";
        // headquestion.style.visibility = "hidden";
        confirmpassbox.style.visibility = "hidden";
        footquestion.innerText = "Don't have an account ? ";
        username.value = "";
        password.value = "";
        confirmpass.value = "";
    }
})