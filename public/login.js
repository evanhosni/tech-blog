const login = document.getElementById('login')
const signup = document.getElementById('signup')

login.addEventListener("submit",(e)=>{
    e.preventDefault()
    const user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }
    fetch("/login",{
        method:"POST",
        body:JSON.stringify(user),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.href = "/"
        } else {
            alert("hmm that didnt work. maybe wrong username or password? idk")
        }
    })
})

signup.addEventListener('submit',(e)=>{
    e.preventDefault()
    e.stopPropagation()//
    const newUser = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    }
    fetch("/signup",{//login?
        method:"POST",
        body:JSON.stringify(newUser),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.href = "/"
        } else {
            alert("ok at this point i dont even know whats going on")
        }
    })
})