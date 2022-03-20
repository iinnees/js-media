const http =require('http');
const fs =require('fs');
const express = require('express');
const app = express();
const path = require('path');
const server =require('http').Server(app)
const io =require('socket.io')(server)

var number = 1;
var img_src ="images/1.png";
console.log(number+' image')

io.sockets.on('connection', function (socket) {
    socket.emit('hello', { 'this': 'is my data' });
    var im =getImagesFromDir(path.join(__dirname,'images'))
    var length =im.length
    //console.log(length)
    socket.emit('length',length)
    socket.on('nb', (arg) => {
        console.log('recieved : ' + arg)
        number = arg;
        console.log(number+'a change')

        var img=path.join(__dirname,'images',im[number])
        //console.log("1er ele de la liste "+im[0])
        //console.log("dernier ele de la liste"+im[8])
        //console.log("im1:"+im[1])
        var img_src ="images/"+im[number]
        console.log(img_src)
        socket.emit('src',img_src) 

    })

    socket.on('sendlist', (arg) => {
        console.log('recieved : ' + arg)
        socket.emit('list',im) 

    })

  });


app.use('/images', express.static('images'));

/*
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/image_player.html');
  });

app.get('/images', function (req, res) {  
  
})
*/

app.get('/',function(req,res){  
    res.setHeader('content-Type', 'text/html');
    console.log(img_src)
    fs.readFile('./image_player.html','utf-8',(err, data) => {
        if(err){
            console.log(err);
            res.end();
        }else {
            console.log(img_src)
            //data =data.replace('{{image_url}}',img_src)
            //res.write(data);
            res.end(data);
        }
    })


});


function getImagesFromDir(dirPath){
    let allImages=[]
    let files =fs.readdirSync(dirPath)
    //console.log(files)
    return files

}

server.listen(3000, 'localhost',() =>{
    console.log('Listening for requests on port 3000');
});
module.exports = app;