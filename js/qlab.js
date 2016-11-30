// connect to  bridge.js
//************************************
// cd osc-web
// node bridge.js
//************************************

var mainDiv = document.getElementById("maindiv");

socket = io.connect('http://127.0.0.1', { port: 8081, rememberTransport: false});
console.log('oi');

var msg = document.getElementById("msg");
socket.on('connect', function() {
    // sends to socket.io server the host/port of oscServer
    // and oscClient
    socket.emit('config',
        {
            server: {
                port: 3333,
                host: '127.0.0.1'
            },
            client: {
                port: 53000,
                host: '127.0.0.1'
            }
        }
    );
});


socket.on('message', function(obj) {
    //var status = document.getElementById("status");
    //status.innerHTML = obj[0];
    //console.log(obj);
});

var sendCue = function(_cueNum, _delay){
    audioBlock.setToBlock();
    setTimeout(function(){ socket.emit("message", "/cue/" + _cueNum + "/start"); }, _delay);
    //socket.emit("message", "/cue/" + _cueNum + "/start");
    
}


// document.getElementById("red").addEventListener("click", function(){
//   socket.emit("message", "/cue/11.0/start");
//   console.log(socket)
// })



// socket = io.connect('http://127.0.0.1', { port: 8081, rememberTransport: false});
// console.log('oi');
// socket.on('connect', function() {
//     // sends to socket.io server the host/port of oscServer
//     // and oscClient
//     socket.emit('config',
//         {
//             server: {
//                 port: 3333,
//                 host: '127.0.0.1'
//             },
//             client: {
//                 port: 53000,
//                 host: '127.0.0.1'
//             }
//         }
//     );
// });
// // socket.on('message', function(obj) {
// //     var status = document.getElementById("status");
// //     status.innerHTML = obj[0];
// //     console.log(obj);
// // });

// var sendMessageQLab=function(_cueNum){
//     //socket.emit('message', '/foobar');
//     var message= "/cue/" +_cueNum + "/start";
//     console.log("so close!!!!!");
//     socket.emit("message", '/foobar');

// }