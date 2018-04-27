angular.module('app1')
.component('userinfo', {
	controller : function($http){
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
		
	},
	
	


	templateUrl:'userinfo.html'
})
