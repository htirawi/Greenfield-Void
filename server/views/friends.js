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
			
		}



	},
	templateUrl:'friends.html'
})
