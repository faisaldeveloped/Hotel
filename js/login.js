function otpStage()
  {
    document.getElementById("otp").style.display = "block";
    document.getElementById("verify").style.display = "block";
    document.getElementById("phone").style.display = "none";
    document.getElementById("recaptcha-container").style.display = "none";
    document.getElementById("login").style.display = "none";
  
  }
  
function phoneStage()
  {
    document.getElementById("otp").style.display = "none";
    document.getElementById("verify").style.display = "none";
    document.getElementById("phone").style.display = "block";
    document.getElementById("recaptcha-container").style.display = "block";
    document.getElementById("login").style.display = "block";
  }
  
function login()
  {
    const phone = document.getElementById("phone").value;
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    auth.signInWithPhoneNumber(phone, window.recaptchaVerifier).then(result =>{
      window.confirmationResult = result;
      otpStage();
    }).catch(e =>{
      alert("Error happened " + e.message);
      window.recaptchaVerifier?.clear();
    });
  
  }
  
function verify()
  {
    const code = document.getElementById("otp").value;
    window.confirmationResult.confirm(code).then(result =>{
      if(result.user)
      {
        window.location.href = "./book.html";
      }
    }).catch(e =>{
      alert("Verify error happened " + e.message);
    });
  }