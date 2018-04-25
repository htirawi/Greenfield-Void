angular.module('app1')
.component('chatbody', {
	controller : function($http,$scope,$window){
		var socket = io.connect()
		var chatroom = $("#chatroom")
		
		$http({
        method : "GET",
        url : "/messages"
    }).then(function Success(response) {


    	
        $scope.messages = response.data.messages;
        console.log(response.data.messages)
        
        
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
					socket.emit('new_msg',{msg:msg,username:response.data})


				})
			}
			
		}
		socket.on('new_msg',function(data){
			
			
			document.getElementById("msg").value = "";
			chatroom.append("<p class='msg'>" + "<b>" + data.username + "</b>" + ": " + data.msg + " </p>")
			data.msg=''

		})
		
	},
	templateUrl:'chatbody.html'
})
