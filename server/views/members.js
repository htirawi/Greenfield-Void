angular.module('app1')
	.component('members', {
		controller : function($scope,$http,$window){
		$http({
			method : "GET",
			url : "/showmembers"
		}).then(function Success(response) {
			$scope.users = response.data;
			console.log(response.data)
			
		});

		this.showmembers=() =>{
			$http({
			method : "GET",
			url : "/showmembers"
		}).then(function onSuccess(response){
				setTimeout(function(){ 
					$window.location.reload();
				}, 200);
			}).catch(function(response) {
				var x = (response.data)
				alert(x,response.status);
			})
			
		}

		

	},
	templateUrl:'members.html'
	})
