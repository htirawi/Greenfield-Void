angular.module('app')
.component('friends', {
	controller : function($scope,$http,$window){
		$http({
			method : "GET",
			url : "/showfriends"
		}).then(function Success(response) {
			$scope.friends = response.data;
			console.log(response.data)
			
		})
	

		

		this.showfriends=() =>{
			$http({
				method : "GET",
				url : "/showfriends"
			}).then(function onSuccess(response){
				
				$window.location.reload();
				
			}).catch(function(response) {
				var x = (response.data)
				alert(x,response.status);
			})
			
		}
		this.addfriend = (name) =>{
						$http({
				method:'POST',
				url:'/addfriend',
				data:{name:name},
				headers:{'Content-Type':'application/json'}
			}).catch(function(response) {
				var x = (response.data)
				alert(x,response.status);
			})
			$window.location.reload();
			
		}

		this.talktofriend = (fname) =>{
			$http({
				method:'POST',
				url:'/talktofriend',
				data:{roomname:fname},
				headers:{'Content-Type':'application/json'}
			}).then(function(){
				$('#chatroom').html('')
				$window.location.reload();
				console.log('fname')

			}

			)
			$window.location.reload();
		}



	},
	templateUrl:'friends.html'
})
