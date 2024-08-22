let registereddata=JSON.parse(localStorage.getItem('registereddata'))
// console.log(registereddata)
// console.log("Login done")

let email=document.getElementById('email')
let pwd=document.getElementById('pwd')
let btn=document.getElementById('btn')

btn.addEventListener('click', (e)=> {
    e.preventDefault();
    let userdetails=registereddata.find(ele=>ele.email===email.value && ele.password===pwd.value)
    if(userdetails) {
        alert('Login Sucessfull!');
        location.href='../Home Page/homepage.html'
        localStorage.setItem('userfullname',userdetails.uname)
    }
    else {
        alert('User not found!')
    }
})