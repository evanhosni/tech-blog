const post = document.getElementById('postform')
const comment = document.querySelector('.commentform')

post.addEventListener("submit",(e)=>{
    e.preventDefault()
    const post = {
        title: document.getElementById('posttitle').value,
        content: document.getElementById('postcontent').value,
        timestamp: Date.now()
    }
    fetch("/post",{
        method:"POST",
        body:JSON.stringify(post),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
            location.href = "/"
        } else {
            alert("wait a sec. ur post didnt post wtf")
        }
    })
})

comment.addEventListener("submit",(e)=>{
    e.preventDefault()
    let id = e.target.id
    const comment = {
        comment: document.getElementById(`comment${id}`).value,
        postId: id
    }
    fetch("/comment",{
        method:"POST",
        body:JSON.stringify(comment),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href = "/"
        } else {
            alert("ahh man. dang...")
        }
    })
})