angular.module('app1')
.component('chatbody', {
	controller : function($http,$scope,$window){
		var socket = io.connect()
		var chatroom = $("#chatroom")
		
		$http({
			method : "GET",
			url : "/messages"
		}).then(function Success(response) {


			
			$scope.messages = response.data;
			console.log(response.data)
			
			
		});

		


		this.send_msg=() =>{
			var msg = $('#msg').val()
			if (msg === undefined || msg === null || msg ==='') {
				console.log(msg)
				return;
			}

			else {
				console.log(msg)
				$http({
					method:'GET',
					url:'/getusername',
				}).then(function (response){
					$scope.currentRoom=response.data.currentRoom
					socket.emit('new_msg',{msg:msg,username:response.data.user,room:response.data.currentRoom})


				})
			}
			
		}
		socket.on('new_msg',function(data){
			console.log($scope.currentRoom)
			if($scope.currentRoom === data.room)
				
			{
				document.getElementById("msg").value = "";
				chatroom.append(" <div style='padding-left: 10px; background-color: white; border:solid;border-color: #cde;  border-radius: 5px;'><p class='msg' style='font-size: 17px; font-family: sans-serif;'>" + "<b>" + data.username + "</b>" + ": " + data.msg + " </p></div> ")
				data.msg=''

			}
			
			

		})
		
	},
	templateUrl:'chatbody.html'
})