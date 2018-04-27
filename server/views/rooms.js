angular.module('app1')
.component('rooms', {
	controller : function($scope,$http,$window){
		$http({
			method : "GET",
			url : "/createroom"
		}).then(function Success(response) {
			$scope.rooms = response.data;
			console.log(response.data)
			
		});

		this.createroom=(name) =>{
			if(name === 'Public'){
				alert("you can't create the Public room")
			}
			else{
			$http({
				method:'POST',
				url:'/createroom',
				data:{roomname:name},
				headers:{'Content-Type':'application/json'}
			}).then(function onSuccess(response){
				setTimeout(function(){ 
					$window.location.reload();
				}, 200);
			}).catch(function(response) {
				var x = (response.data)
				alert(x,response.status);
			})
			}
		}

		this.joinroom=(rname) =>{
			
			$http({
				method:'POST',
				url:'/joinroom',
				data:{roomname:rname},
				headers:{'Content-Type':'application/json'}
			}).then(function(){
					$('#chatroom').html('')
					$window.location.reload();
				}
				
			)
			$window.location.reload();
		}

	},

	templateUrl:'rooms.html'
})