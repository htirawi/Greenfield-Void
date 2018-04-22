angular.module('app')
	.component('signin', {
		controller : function($http){
			this.signin=(username,password) =>{
				$http({
					method:'POST',
					url:'/signin',
					data:{username:username,password:password},
					headers:{'Content-Type':'application/json'}
				})
		//console.log(username,password)
	}
},
templateUrl:'/templates/sign_in.html'
})