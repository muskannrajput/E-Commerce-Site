let uname=document.getElementById('uname')
let email=document.getElementById('email')
let pswd=document.getElementById('pswd')
let btn=document.getElementById('btn')
let registereddata=[]

btn.addEventListener('click',(e) => {
    e.preventDefault()
    let jsondata=localStorage.getItem('registereddata')
    if(jsondata) {
        registereddata=JSON.parse(jsondata)
        let userdetails=registereddata.find(ele=>ele.email===email.value)
        if(userdetails) {
            alert('Already Registered, Please login now!')
        } 
        else {
            registereddata.push({uname:uname.value, email:email.value, password:pswd.value })
            localStorage.setItem('registereddata', JSON.stringify(registereddata))
            location.href='../Login Page/login.html'
        }  
    }
    else {
        registereddata.push({uname:uname.value, email:email.value, password:pswd.value })
        localStorage.setItem('registereddata', JSON.stringify(registereddata))
        location.href='../Login Page/login.html'
    }
}) 