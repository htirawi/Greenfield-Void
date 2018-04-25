$(function(){
	var socket = io.connect()

	console.log("HIIIIIIIIIIIIIII")

	// var msg = $("#msg")
	var username = $("#username")
	// var send_msg = $("#send_msg")
	var send_username = $("#send_username")
	// var chatroom = $("#chatroom")
	// var feedback = $("#feedback")

alert(username.val());

//emit username
send_username.click(function(){

	socket.emit('change_username',{username:username.val()})
	username.val('')

})

// //emit msg 
// send_msg.click(function(){
// 	console.log(msg.val());
// 	socket.emit('new_msg',{msg:msg.val()})
// })



// socket.on('new_msg',function(data){
// 	console.log(data);
// 	feedback.html('');
// 	msg.val('');
// 	chatroom.append("<p class='msg'>" + "<b>" + data.username + "</b>" + ": " + data.msg + " </p>")
// })

// msg.bind('keypress',function(){
// 	socket.emit('typing')
// })

// socket.on('typing',function(data){
// 	feedback.html("<p><i>" + "<b>"+ data.username+"</b>"+ " is typing ..." + "</i></p>")
// })

});