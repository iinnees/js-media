var socket = io();

const pTab=document.querySelectorAll('p');
const play = sessionStorage.getItem('play')
console.log(play)
if(play!==null)
{
pTab[play-1].style.backgroundColor="rgb(95,158,160)"
pTab[play-1].style.color="white"
}

//creating icons
function createIcon() {
    let i = document.createElement('i');
    i.class = "fa fa-play";
    return i;
}

//adding events to all texts in playlist


pTab.forEach((element,index)=>{
    element.addEventListener('click',(e)=>{
        socket.emit('title', index+1+ '.mp4');
        sessionStorage.setItem('play', index+1);
        window.location.reload();

    })
});

//adding events to buttons 
Object.defineProperty(HTMLMediaElement.prototype, 'playing', {
    get: function(){
        return !!(this.currentTime > 0 && !this.paused && !this.ended && this.readyState > 2);
    }
})
document.getElementById('start').addEventListener('click',(e)=>{
    var vid = false;
    
    if(document.querySelector('video').playing){ 
        vid=true;
    }
    if((!vid)&&(sessionStorage.getItem('play')!==null)){
        socket.emit('title',sessionStorage.getItem('play')+'.mp4')
        window.location.reload();
    }
    if((!vid)&&(sessionStorage.getItem('play')==null)){
        socket.emit('title',1+'.mp4')
        sessionStorage.setItem('play',1);
        window.location.reload();
    }

});
document.getElementById('stop').addEventListener('click',(e)=>{
    const video=document.querySelector('video');
    sessionStorage.removeItem("play")
    window.location.reload();
    video.pause();
    video.currentTime=0;
});

document.getElementById('next').addEventListener('click',(e)=>{
    const play=Number(sessionStorage.getItem('play'))+1;
    if (play-1<30){
    socket.emit('title',(play)+'.mp4')
    sessionStorage.setItem('play',play);
    window.location.reload();
    }
    else{
    window.location.reload();
    }
});

document.getElementById('previous').addEventListener('click',(e)=>{
    const play=Number(sessionStorage.getItem('play'))-1;
    if(play-1>=1){
    socket.emit('title',(play)+'.mp4')
    sessionStorage.setItem('play',play);
    window.location.reload();
    }
    else{
    window.location.reload();   
    }
});
document.getElementById('resume').addEventListener('click',(e)=>{
    const video=document.querySelector('video');
    video.play();
});
document.getElementById('pause').addEventListener('click',(e)=>{
    const video=document.querySelector('video');
    video.pause();
});




