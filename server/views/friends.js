angular.module('app')
.component('friends', {
	controller : function($scope,$http,$window){
		$http({
			method : "GET",
			url : "/showfriends"
		}).then(function Success(response) {
			$scope.friends = response.data;
			console.log(response.data)
			
		}
		// ,
		// 	function (){
		// 		setTimeout(function(){ 
		// 			$window.location.reload();
		// 		}, 200)}

		);

		this.showfriends=() =>{
			$http({
				method : "GET",
				url : "/showfriends"
			}).then(function onSuccess(response){
				setTimeout(function(){ 
					$window.location.reload();
				}, 200);
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
			})
			
		}



	},
	templateUrl:'friends.html'
})
