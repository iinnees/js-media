var socket = io();
socket.on('hello', function (data) { // réception 'hello'
    console.log('le premier socket arrive ');
});
document.getElementById("firstsong").addEventListener('click', function (e) {
    console.log('clicked');
    socket.emit('title', e.target.textContent + '.mp4')
    console.log('emitted : ' + e.target.textContent + '.mp4');


});

document.getElementById("secondsong").addEventListener('click', function (e) {
    console.log('clicked');
    socket.emit('title', e.target.textContent + '.mp4')
    console.log('emitted : ' + e.target.textContent + '.mp4');

});

