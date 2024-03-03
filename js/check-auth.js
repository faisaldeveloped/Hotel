function logout()
{
    auth.signOut();
    window.location.href = '/index.html';
}

auth.onAuthStateChanged((state) =>{
    if(state?.uid)
    {
        document.getElementById('user-nav').style.display = 'flex';
        document.getElementById('visitor-nav').style.display = 'none';
    }
    else
    {
        document.getElementById('user-nav').style.display = 'none';
        document.getElementById('visitor-nav').style.display = 'flex';
    }
})