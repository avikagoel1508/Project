const socket=io()
let btn=document.querySelector('#btn')
let username=document.querySelector('#name')
let btn1=document.querySelector('#btn1')
let chatbox=document.querySelector('#chatbox')
let userdetails=document.querySelector('.userdetails')
let chattingapp=document.querySelector('.chattingapp')
let msgList=document.querySelector('.msgList')
let onlineCount = document.querySelector('#onlineCount')

//initially myname is not there so its empty as soon as user joins the chat in myname we will get username.value
let myName = "";                          

socket.on('msg', (msg)=>{
    console.log(msg.msg.msg)
})
 socket.on('joinedchat', ({username, activeusers})=>{
      console.log(`${username} has joined the chat`)
      console.log(`${activeusers.length} : Online`)
              
   onlineCount.innerText = activeusers.length 
   })

socket.on('mssg', ({text, senderName})=>{
   console.log(senderName+" :" +text.msg)

   let li=document.createElement('li')
   li.className = (senderName === myName) ? "sent" : "received"   
       
   li.innerHTML =                                                    
      `<span class="msg-name">${senderName}</span>` +
      `<span class="msg-text">${text.msg}</span>` +
      `<span class="msg-time">${new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}</span>`
   msgList.appendChild(li)
})

btn.addEventListener('click', ()=>{
   myName = username.value                      
   socket.emit('saveuser', {
       name:username.value
   })

   socket.emit('chat', {
       msg: username.value
   })

   username.value=""
   userdetails.classList.add('hidden')
   chattingapp.classList.add('class')
   msgList.classList.add('class')
})
socket.on('disconnected', ({username, activeusers})=>{
   console.log(`${username} has left the chat : ${activeusers.length} : Online`)
           // ADD
   onlineCount.innerText = activeusers.length  
})

btn1.addEventListener('click', ()=>{
   socket.emit('chatt', {
       msg: chatbox.value
   })
   chatbox.value=""
})

chattingapp.classList.add('hidden')
msgList.classList.add('hidden')
