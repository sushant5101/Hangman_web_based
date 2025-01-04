var visibility = document.getElementById("trigger");
var password = document.getElementById("password");
var enter = document.getElementById("enter");
var username = document.getElementById("username");
var clickme = document.getElementById("clickme");
var usernamelabel = document.getElementById("userlabel");
var passwordlabel = document.getElementById("passwordlabel");

visibility.addEventListener("click", () => {
    // Toggle visibility of the password
    if (password.type === "password") {
        password.type = "text";  // Show password
        visibility.innerText = "Θ";
        password.focus();
    } else {
        password.type = "password";  // Hide password
        visibility.innerText = "O";
        password.focus();
    }
});

username.addEventListener("keypress", function (event) { // listening for enter key pressed
    if (event.key === "Enter") {
        event.preventDefault();
        valuecheck();
    }
});

password.addEventListener("keypress", function (event) { // listening for enter key pressed
    if (event.key === "Enter") {
        event.preventDefault();
        valuecheck();
    }
});



enter.addEventListener("click", () => { // listening for button pressed
    valuecheck()
});

function valuecheck() {
    if (username.value == "" || password.value == "") {
        alert("Enter all the details properly");
    }
    else {
        addUser(username.value, password.value);
    }
}

async function addUser(name, pass) {
    try {
        const response = await fetch('http://localhost:3001/add-user', {
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
    }
    else {
        usernamelabel.innerText = "Enter your username";
        username.style.boxShadow = "0px 0px 20px 2px #FF0080";

    }
})