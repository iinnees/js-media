var express = require('express');
app = express();
http = require('http');
server = http.createServer(app);
var fs = require('fs');
const { Server } = require("socket.io");
const io = new Server(server);
path = require('path');
util = require('util')
const bodyParser = require('body-parser');




app.use(bodyParser.urlencoded({ extended: true }));
var sock = io.sockets.on('connection', function (socket) {

  socket.on('title', (arg) => {
    console.log('recieved : ' + arg)
    app.get('/video', function (req, res) {
      const range = req.headers.range;
      if (!range) {
        res.status(400).send('requires range header');
      }
      const videoPath = "./video/" + arg;
      const videoSize = fs.statSync("./video/" + arg).size;
      const CHUNK_SIZE = 10 ** 6;
      const start = Number(range.replace(/\D/g, ""));
      const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
      const contentLength = end - start + 1;
      const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
      };
      res.writeHead(206, headers);
      const videoStream = fs.createReadStream(videoPath, { start, end });
      videoStream.pipe(res);
    
    

  });
  return sock;
});
});



app.post('/file',(req,res)=>{
  res.sendFile(__dirname + '/index.html');
  console.log(req.body.name)
  console.log(req.body.location)
   
  fs.copyFile(req.body.location, './video/'+req.body.name +'.mp4', (err) => {
    if (err) throw err;
      console.log('source.txt was copied to destination.txt');
   });
  
});

app.use(express.static(path.join(__dirname, '')));

app.get('/', function (req, res) {
  
});

console.log(videoUrl);
//charger le video 

app.get('/video', function (req, res) {
  const range = req.headers.range;
  if (!range) {
    res.status(400).send('requires range header');
  }
  const videoPath = "./video/" + videoUrl;
  const videoSize = fs.statSync("./video/" + videoUrl).size;
  const CHUNK_SIZE = 10 ** 6;
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };
  res.writeHead(206, headers);
  const videoStream = fs.createReadStream(videoPath, { start, end });
  videoStream.pipe(res);
});


server.listen(3000, () => {
  console.log('listening on *:3000');
});
module.exports = app;





