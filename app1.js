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
    socket.emit('length',length)
    socket.on('nb', (arg) => {
        console.log('recieved : ' + arg)
        number = arg;
        console.log(number+'a change')

        var img=path.join(__dirname,'images',im[number])
        var img_src ="images/"+im[number]
        console.log(img_src)
        socket.emit('src',img_src) 

    })

    socket.on('sendlist', (arg) => {
        console.log('recieved : ' + arg)
        socket.emit('list',im) 

    })

    socket.on('save', (arg) => {
        console.log('recieved : ' + arg)
        saveImageToDisk(arg,"images/"+Date.now()+".png")

    })

  });


app.use('/images', express.static('images'));

app.get('/',function(req,res){  
    res.setHeader('content-Type', 'text/html');
    console.log(img_src)
    fs.readFile('./image_player_essai.html','utf-8',(err, data) => {
        if(err){
            console.log(err);
            res.end();
        }else {
            console.log(img_src)
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

function saveImageToDisk(url,path){
    var fullUrl =url
    console.log("dans la fonction save")
    var localPath = fs.createWriteStream(path)
    var request =http.get(fullUrl, function(response){
        console.log(response)
        response.pipe(localPath)
    })
}





server.listen(3000, 'localhost',() =>{
    console.log('Listening for requests on port 3000');
});
module.exports = app;