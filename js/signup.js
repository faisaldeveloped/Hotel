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

function profileStage()
{
    document.getElementById("profile-section").style.display = "flex";
    document.getElementById("phone-section").style.display = "none";
}

function phoneStage()
{
    document.getElementById("profile-section").style.display = "none";
    document.getElementById("phone-section").style.display = "flex";
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
        window.user = result.user;
        //window.location.href = "home.html";
        profileStage();
      }
    }).catch(e =>{
      alert("Verify error happened " + e.message);
    });
  }

function signup()
{
    const phone = window.user.phoneNumber;
    const uid   = window.user.uid;
    const fullName = document.getElementById("fullname").value;
    const age      = document.getElementById("age").value;
    const docRef   = userCollection.doc(uid);
    docRef.get().then(doc =>{
        if(doc.exists)
        {
            console.log("Alerady signed up");
        }
        else
        {
            console.log("We will sign up");
            docRef.set({
                fullName: fullName,
                age: age,
                phone: phone,
            }).then((result) =>{
                window.location.href = "./book.html";
            })
        }
    })
}