angular.module('app1')
.component('chatbody', {
	controller : function($http,$scope,$window){
		var socket = io.connect()
		var feedback = $("#feedback");
		var msg = $("#msg");
		var chatroom = $("#chatroom")
		// var send_msg = $("#send_msg")
		// this.send_msg =(msg) =>{
		// 	console.log(msg)
		// 	socket.emit('new_msg',msg)
		// }


		this.send_msg=(msg) =>{
			$http({
				method:'GET',
				url:'/getusername',
			}).then(function (response){
				socket.emit('new_msg',{msg:msg,username:response.data})
			})
			
		}
		socket.on('new_msg',function(data){
			console.log(data);
			feedback.html('');
			document.getElementById("msg").value = "";
			chatroom.append("<p class='msg'>" + "<b>" + data.username + "</b>" + ": " + data.msg + " </p>")
		})
		
	},
	templateUrl:'chatbody.html'
})
