angular.module('app1')
.component('rooms', {
	controller : function($scope,$http,$window){
		$http({
			method : "GET",
			url : "/createroom"
		}).then(function Success(response) {
			$scope.rooms = response.data;			
		});

		this.createroom=(name) =>{
			// if(name === 'Public'){
			// 	alert("you can't create the Public room")
			// }
			// else{
				$http({
					method:'POST',
					url:'/createroom',
					data:{roomname:name},
					headers:{'Content-Type':'application/json'}
				}).then(function onSuccess(response){
					
					$window.location.reload();
				}).catch(function(response) {
					var x = (response.data)
					alert(x,response.status);
				})
			
			
		}

		// this.joinroom=(roomname) =>{
		// 	$http({
		// 		method:'POST',
		// 		url:'/joinroom',
		// 		data:{roomname:roomname},
		// 		headers:{'Content-Type':'application/json'}
		// 	}).catch(function(response) {
		// 		var x = (response.data)
		// 		alert(x,response.status);
		// 	})
			
			
		// }

	},

	templateUrl:'rooms.html'
})