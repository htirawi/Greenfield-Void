angular.module('app')
.component('signing', {
	controller : function($http,$window){
		{this.signin=(username,password) =>{
			if ( username === undefined || password === undefined) {

				alert('enter a valid name or password')

			}else {
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
		}

		{this.signup=(name,pass,email) =>{
			$http({
				method:'POST',
				url:'/signup',
				data:{username:name,password:pass,email:email},
				headers:{'Content-Type':'application/json'}
			}).then(function onSuccess(response){
				
				$window.location.reload()
			}).catch(function(response) {
				var x = (response.data)
				alert(x,response.status);
			})
			
		}}
	},
	templateUrl:'signing.html'
})