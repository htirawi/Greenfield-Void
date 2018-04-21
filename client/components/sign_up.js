angular.module('app')
	.component('signing', {
		controller : function($http){
	this.signup=(username,password,email) =>{
		$http({
			method:'POST',
			url:'/signup',
			data:{username:username,password:password,email:email},
			headers:{'Content-Type':'application/json'}
		})
		//console.log(username,password)
	}
	},
	templateUrl:'/templates/sign_up.html'
	})