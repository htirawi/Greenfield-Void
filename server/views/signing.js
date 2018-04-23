angular.module('app')
.component('signing', {
	controller : function($http){
		{this.signin=(username,password) =>{
			$http({
				method:'POST',
				url:'/signin',
				data:{username:username,password:password},
				headers:{'Content-Type':'application/json'}
			}).then(function onSuccess(response){
				window.location.href = 'index1.html'
			}).catch(function(response) {
				var x = (response.data)
				alert(x,response.status);
			})
			
			
		}}

		{this.signup=(name,pass,email) =>{
			$http({
				method:'POST',
				url:'/signup',
				data:{username:name,password:pass,email:email},
				headers:{'Content-Type':'application/json'}
			}).then(function onSuccess(response){
				window.location.href = 'index1.html'
			}).catch(function(response) {
				var x = (response.data)
				alert(x,response.status);
			})
			
		}}
	},
	templateUrl:'signing.html'
})