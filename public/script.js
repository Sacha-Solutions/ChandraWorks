// const provider = new OAuthProvider('microsoft.com');

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-analytics.js";
// import { getAuth, GoogleAuthProvider ,createUserWithEmailAndPassword, OAuthProvider, signInWithPopup  } from "firebase/auth";
import { getAuth, GoogleAuthProvider ,createUserWithEmailAndPassword, OAuthProvider, signInWithPopup  } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-auth.js";
import { sendEmail } from "./Email.js";
 


const firebaseConfig = {
  apiKey: "AIzaSyCjsw6ocOJcfzeJ6LCDEUWv6U9uC7Xl17o",
  authDomain: "sachavendorapp.firebaseapp.com",
  projectId: "sachavendorapp",
  storageBucket: "sachavendorapp.appspot.com",
  messagingSenderId: "762501294759",
  appId: "1:762501294759:web:60e54367189d9c826f8982",
  measurementId: "G-W42QYBWH5V"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

// const signupButton = document.getElementById("sign-up");

// const main = document.getElementById("main");
// const createacct = document.getElementById("create-acct")

const signupEmailIn = document.getElementById("email-signup");

const createacctbtn = document.getElementById("create-acct-btn");

const microsoftlogo = document.getElementById("microsoft-logo");

const provider = new OAuthProvider('microsoft.com');

const providerGoogle = new GoogleAuthProvider();

var signupEmail, signupPassword;

createacctbtn.addEventListener("click",async function() {
  var isVerified = true;

  signupEmail = signupEmailIn.value;
 
  signupPassword = "Dummy@123";
  
  if(signupEmail == null ) {
    swal("Error!", "Please fill out all required fields.", "error")
    // window.alert("Please fill out all required fields.")s;
    isVerified = false;
  }
  
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(signupEmail))
  {
    swal("Error", "Enter a valid email address.", "error")
    // window.alert("Enter a valid email address.");
    isVerified = false;
  }

  if(isVerified) {

    fetch('https://chandraworks.onrender.com/results').then(response => {return response.json()}).then((data)=>{data
    var findemail = []
    var findemail = data.filter((emailcheck)=>{return emailcheck.mail == signupEmail})
    if(findemail.length)
    {
      swal("Note:", "The email address " +  signupEmail +" is already registred with us! You will shortly receive an email with a link to login.", "info"); }
    else
    {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => { 

      var redata = [];
      redata.push(
        userCredential.user.email,
        userCredential.user.email
      )
      sendEmail(redata);
      console.log(userCredential.user.email);
      swal("You did it!", "We are setting up your account. A link to login will be shared to your email with in few minutes.", "success");    
   
      signupEmailIn.value = "";
       // Hide the popup
       popupContainer.style.display = 'none';
      
       signupEmailIn.value = "";
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      swal("Note:", "The email address " +  signupEmail +" is already registred with us! You will shortly receive an email with a link to login.", "info"); 
      // swal("Error!", "Something went wrong! Try again later.: "+ error.message + error.code, "error")
      // window.alert("Error occurred. Try again.",error);
    });
  }
 
});
  }
});

//Microsoft Authentication
microsoftlogo.addEventListener("click", function() {
 
  const auth = getAuth();
  signInWithPopup(auth, provider)
  .then((result) => {
    console.log(result);
    var redata = [];
    redata.push(
       result.user.email,
      result.user.displayName
    )


    fetch('https://chandraworks.onrender.com/results').then(response => {return response.json()}).then((data)=>{data
    var findemail = []
    var findemail = data.filter((emailcheck)=>{return emailcheck.mail == result.user.email})
    if(findemail.length)
    {
      swal("Note:", "The email address " +  result.user.email +" is already registred with us! You will shortly receive an email with a link to login.", "info"); 

    }
    else
    {
      sendEmail(redata);
      // console.log(userCredential.user.email);
      // console.log(result.additionalUserInfo.profile);
      swal("You did it!", "We are setting up your account. A link to login will be shared to your email with in few minutes.", "success");    
   
      signupEmailIn.value = "";
       // Hide the popup
       popupContainer.style.display = 'none';
      
    }
  });
     

    })
    .catch((error) => {
      swal("Error:", error.message, "error"); 


    });
});
 
 //Google Authentication
Googlelogo.addEventListener("click", function() {
  const auth = getAuth();
  signInWithPopup(auth, providerGoogle)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
      var redata = [];
      redata.push(
         result.user.email,
        result.user.displayName
      )

      fetch('https://chandraworks.onrender.com/results').then(response => {return response.json()}).then((data)=>{data
      var findemail = []
      var findemail = data.filter((emailcheck)=>{return emailcheck.mail == result.user.email})
      if(findemail.length)
      {
        swal("Note:", "The email address " +  result.user.email +" is already registred with us! You will shortly receive an email with a link to login.", "info"); 
      }else{
        sendEmail(redata);
        // console.log(userCredential.user.email);
        // console.log(result.additionalUserInfo.profile);
        swal("You did it!", "We are setting up your account. A link to login will be shared to your email with in few minutes.", "success");    
     
        signupEmailIn.value = "";
         // Hide the popup
         popupContainer.style.display = 'none';
      }
    });
 
    }).catch((error) => {
      swal("Error:", error.message, "error"); 

      // // Handle Errors here.
      // const errorCode = error.code;
      // const errorMessage = error.message;
      // // The email of the user's account used.
      // const email = error.customData.email;
      // // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
});