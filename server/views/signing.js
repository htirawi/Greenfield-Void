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
			})
			
		}}

		{this.signup=(name,pass,email) =>{
			$http({
				method:'POST',
				url:'/signup',
				data:{username:name,password:pass,email:email},
				headers:{'Content-Type':'application/json'},
				error: function(error){
         			 if(error.responseText == 'showAlert')
             		 alert("Please enter correct user name and password.")}

			}).then(function onSuccess(response){
				window.location.href = 'index1.html'
			})
			
		}}
	},
	templateUrl:'signing.html'
})

