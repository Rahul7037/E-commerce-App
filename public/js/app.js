const login = document.getElementById('login');
const signup = document.getElementById('signup');
const user = document.getElementById('user');
var cookieArray = document.cookie.split(';');
// var value = 'true';
// var cookieTrue = cookieArray.find((cookieArray)=>cookieArray=== value);

const abc = document.cookie.match('true')

function hide(){
    login.style.display = "none";
    signup.style.display = "none";
    cart.style.display = "block";
    user.style.display = "block";
}

function show(){
    login.style.display = "block";
    signup.style.display = "block";
    cart.style.display = "none";
    user.style.display = "none";
}

function check(){
    if(abc){
        show()
    }else{
        hide()
    }
}
check();

