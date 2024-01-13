console.log('hello helo hello helouuu ');

// Checking the username if it's more than 3 characters
document.getElementById("username").addEventListener("input", function(ev) {
  let userinput = ev.currentTarget;
  let username = userinput.value;
  var alphabets = /^[A-Za-z]+$/;

  if (RegExp(alphabets).test(username[0]) && username.length >= 3) {
    userinput.classList.remove("invalid-text");
    userinput.classList.add("valid-text");
  } else {
    userinput.classList.remove("valid-text");
    userinput.classList.add("invalid-text");
    console.log("Invalid username. Username must start with a letter.");
  }
});

document.getElementById("email").addEventListener("input", function(ev) {
  let userInput = ev.currentTarget;

  if (userInput.checkValidity() === false || userInput.value.length === 0) {
    userInput.classList.add("invalid-text");
    userInput.classList.remove("valid-text");
  } else {
    userInput.classList.remove("invalid-text");
    userInput.classList.add("valid-text");
  }
});

function CheckPassword(id) {
  const userInput = document.getElementById(id);
  
  userInput.addEventListener("input", function(ev) {
    const password = userInput.value;
    const passwordChar = /[!@#$^&+\-?]/;
    const passwordPattern = /[a-zA-Z0-9!@#$%^&()_+\-={}';:"\\|,.<>/?]{8,}$/;

    if (passwordPattern.test(password) && passwordChar.test(password)) {
      userInput.classList.remove("invalid-text");
      userInput.classList.add("valid-text");
    } else {
      userInput.classList.remove("valid-text");
      userInput.classList.add("invalid-text");
    }
  });
}

function ConfirmPassword(id) {
  const userInput = document.getElementById(id);
  const passwordInput = document.getElementById("password");

  userInput.addEventListener("input", function(ev) {
    let password = passwordInput.value;
    let confirmPassword = userInput.value;

    if (confirmPassword === password) {
      userInput.classList.remove("invalid-text");
      userInput.classList.add("valid-text");
    } else {
      userInput.classList.remove("valid-text");
      userInput.classList.add("invalid-text");
    }
  });
}

CheckPassword("password");
ConfirmPassword("confirm_password");


// My old code

// // assignment 4 part 1

// console.log('hello helo hello helouuu ');

// // checking the  usernmae if it's more tahn 3 characters

// document.getElementById("username").addEventListener("input", function(ev){
// let userinput = ev.currentgTarget;

// let username = userinput.value;

// var alphabets = /^[A-Za-z]+$/;

// if (RegExp(alphabets).test(username[0])&& username.length >= 3){ userinput.setAttribute ("class", "valid-text ");}

// else{
//     userinput.setAttribute ("class", "invalid-text ");

//     console.log("Invalid username. Username must start with a letter.");

// }
// });

// document.getElementById('email').addEventListener("input", function(ev) {
//     let userInput = ev.currentTarget;
//     if (userInput.checkValidity() === false || userInput.length === 0) {

//       // if the email is not valid prompt an  error message

//       userInput.classList.add("invalid-text");
//       userInput.classList.remove("valid-text");
//     } else {
//     // let the user submit it 

//       userInput.classList.remove("invalid-text");
//       userInput.classList.add("valid-text");
//     }
//   });



// function CheckPassword(id) {
//     const userInput = document.getElementById(id);
  
//     userInput.addEventListener("input", function(ev){
//       const password = userInput.value;
//       const passwordChar = /[!@#$^&+\-?]/;
//       const passwordPattern = /[a-zA-Z0-9!@#$%^&()_+\-={}';:"\\|,.<>/?]{8,}$/;
  
//       if (passwordPattern.test(password) && passwordChar.test(password)) {
//         userInput.classList.remove("invalid-text");
//         userInput.classList.add("valid-text");
//       } else {
//         userInput.classList.remove("valid-text");
//         userInput.classList.add("invalid-text");
//       }
//     });
//   }
  
  
  
//   function ConfirmPassword(id) {
//       const userInput = document.getElementById(id);
//       const passwordInput = document.getElementById("password");
//       userInput.addEventListener("input", function(ev){let password = passwordInput.value;
//         let confirmPassword = userInput.value;
  
//         if(confirmPassword === password){
//             userInput.setAttribute("class", "valid-text");
//         }
//         else{userInput.setAttribute("class", "invalid-text");}
//    });
      
//   }
  
//   CheckPassword("password");
//   ConfirmPassword("confirm_password");

  

