const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 4444;
const path=require('path')
app.set('view engine', 'hbs')
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res)=>[
  res.render('chat')
])
app.get('/chat', (req, res)=>{
  res.render('chat')
})

let userMap={}

io.on('connection', (socket) => {
  // console.log('A user connected', socket.id);

  socket.on('saveuser', ({name})=>{
    // console.log(name)
    
    userMap[socket.id]=name

 let activeusers=[]
    for(let i in userMap){
      activeusers.push(userMap[i])
    }
    io.emit('joinedchat',{
      username: userMap[socket.id],
      activeusers
    })
    console.log(userMap)
  })
  socket.on('chat', (msg)=>{
    // console.log(msg.msg)
    io.emit('msg', {
    msg:msg
  })
  })

  socket.on('chatt', (msg)=>{
    // console.log(msg)
    io.emit('mssg', {
      text:msg,
      senderName:userMap[socket.id]
    })
  })

  socket.on('disconnect',()=>{
    let socketId=socket.id
    let username=userMap[socket.id]
    console.log("User has left the chat", userMap[socket.id])
   if (username) {
    delete userMap[socketId]
    let activeusers=[]
    for(let i in userMap){
      activeusers.push(userMap[i])
    }
    
     socket.broadcast.emit('disconnected', {
       username,
       activeusers
     })
   }
  })
  
})

server.listen(PORT, () => {
    console.log(`http://localhost:`+PORT);
});