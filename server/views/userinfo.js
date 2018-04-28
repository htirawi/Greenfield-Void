angular.module('app1')
.component('userinfo', {
	controller : function($http,$window){
		this.logout=() => {
			$http({
				method:'GET',
				url:'/logout'
				
			}).then(function onSuccess(response){
				window.location.href = 'index.html'
			})
		}
		this.video=() => {
            $http({
                method:'GET',
                url:'/video'
                
            }).then(function onSuccess(response){
                window.location.href = 'video.html'
            })
        }
		this.deleteacc=() => {
			var x = prompt("Are you sure you want to delete the account :( ? y/n")
			if ( x === 'y' || x === "yes") {
				$http({
				method:'DELETE',
				url:'/deleteacc'
				
				
			})
				window.location.href = 'index.html'
			}

			
			
		}
	},
	
	


	templateUrl:'userinfo.html'
})
