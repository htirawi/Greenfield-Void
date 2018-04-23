angular.module('app1')
	.component('rooms', {
		controller : function($http){
			{this.logout = () => {
			$http({
				method:'GET',
				url:'/logout'
			})
			
		}}

			
	},

	templateUrl:'rooms.html'
	})
