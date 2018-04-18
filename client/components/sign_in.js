angular.module('app')
.component('signin', {
	controller : function(){this.sign=(username,password) =>{
		// $http({
		// 	method:'POST',
		// 	url:'/signin',
		// 	data:{username:username,password:password},
		// 	headers:{'Content-Type':'application/json'}
		// })
	console.log(username,password)
	}},
	templateUrl:'/templates/signin.html'
})