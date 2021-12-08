const post = document.getElementById('postform')


post.addEventListener("submit",(e)=>{
    e.preventDefault()
    const post = {
        username: document.getElementById('username').value(),
        password: document.getElementById('password').value()
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