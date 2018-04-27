	angular.module('app')
	.component('signing', {
		controller : function($http){
			{this.signin=(username,password) =>{
				$http({
					method:'POST',
					url:'/signin',
					data:{username:username,password:password},
					headers:{'Content-Type':'application/json'}
				})
		//console.log(username,password)
	}}

	{this.signup=(username,password,email) =>{
		$http({
			method:'POST',
			url:'/signup',
			data:{username:username,password:password,email:email},
			headers:{'Content-Type':'application/json'}
		})
		//console.log(username,password)
	}}
	},
	templateUrl:'/templates/signing.html'
	})