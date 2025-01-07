const confirmtrigger = document.getElementById("confirmtrigger");
const password = document.getElementById("password");
const trigger = document.getElementById("trigger");
const enter = document.getElementById("enter");
const username = document.getElementById("username");
const clickme = document.getElementById("clickme");
const usernamelabel = document.getElementById("userlabel");
const passwordlabel = document.getElementById("passwordlabel");
let userExists = false;
const headquestion = document.getElementById("headquestion");
const confirmpass = document.getElementById("confirmpassword");
const confirmpassbox = document.getElementById("five");
const userfeedback = document.getElementById("info");

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

async function checkuser() {
    const userData = await getuser(); // Access the data here
    if (userData.hangman_user) {
        userData.hangman_user.forEach(user => {
            if (user.name === username.value && username.value !== "" && password.value !== "") {
                userExists = true;
                userfeedback.innerText = `${username.value} already exist pick other`
            }
        });
        if (!userExists && username.value !== "" && password.value !== "") {
            addUser(username.value, password.value);
        } else {
            console.log("failed");
            alert("Process failed : the details you gave was incorrect or the user name has already been picked by someone");
        }
    }
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
        username.style.boxShadow = "0px 0px 20px 2px rgb(113, 243, 87)";
        headquestion.style.visibility = "visible";
        confirmpassbox.style.visibility = "visible";
    }
    else {
        usernamelabel.innerText = "Enter your username";
        username.style.boxShadow = "0px 0px 20px 2px #FF0080";
        headquestion.style.visibility = "hidden";
        confirmpassbox.style.visibility = "hidden";
    }
})