var diigoBookmarks = angular.module("diigoBookmarks", ["ngRoute"]); 

diigoBookmarks.factory('fSelectedTags', function(){
	var selectedTags = [];
	return {
        add: function (key) {
            if(selectedTags.indexOf(key)<0){
					selectedTags.push(key);
				}
        },
        remove: function (key) {
            var ind = selectedTags.indexOf(key);
				selectedTags.splice(ind,1);

        },
		  getAll: function(){
				return selectedTags;
		  }
    };
});


diigoBookmarks.config(function($routeProvider) {
    $routeProvider
			.when("/", {
					controller : "dataloaderController",
					templateUrl : "bookmarklist.html"
			})
			.when("/tag/:tagname", {
				controller : "tagController",
				templateUrl : "bookmarklist.html"
			})
			.when("/search/:searchterm", {
				controller : "searchController",
				templateUrl : "bookmarklist.html"
			})
});


diigoBookmarks.controller("dataloaderController", function($scope,$http,$location,fSelectedTags) {
	$http.get("importer/import.php?tag=էպիստեմոլոգիա")
		.then(function(response) {
				$scope.bookmarks = response.data.boomarks;
		}, function(response) {
				$scope.bookmarks = "Something went wrong";
		});
	
	$scope.select = function(key){
		fSelectedTags.add(key);
		
		$http.get("importer/import.php?tag="+fSelectedTags.getAll().join("|"))
			.then(function(response) {
					console.log("second");
					$scope.bookmarks = response.data.boomarks;
			}, function(response) {
					$scope.bookmarks = "Something went wrong";
		});
	};

});

diigoBookmarks.controller("tagController", function($scope,$http,$routeParams,fSelectedTags) {
	if(fSelectedTags.getAll().length===0){
		var tPath = "importer/import.php?tag="+$routeParams.tagname;
		console.log("asdf");
	}
	else{
		var tPath = "importer/import.php?tag="+fSelectedTags.getAll().join("|");
		console.log("asdf1");
	}
	
	$http.get(tPath)
		.then(function(response) {
				$scope.bookmarks = response.data.boomarks;
		}, function(response) {
				$scope.bookmarks = "Something went wrong";
		});

	$scope.select = function(key){
		fSelectedTags.add(key);
	};
	
	$scope.$watch("fSelectedTags",function(){
		console.log("fSelectedTags changed view from tagController");
	});

});


diigoBookmarks.controller("tagListController", function($scope,$http,$location,fSelectedTags) {
	
	$http.get("importer/alltags.php")
		.then(function(response) {
				$scope.alltags = response.data;
		}, 
		function(response) {
			$scope.alltags = "Something went wrong";
	});

	$scope.select = function(key){
		fSelectedTags.add(key)

	};
	
	$scope.unselect = function(key){
		fSelectedTags.remove(key);
	};

	$scope.$watch("fSelectedTags",function(){
		$scope.selectedTags = fSelectedTags.getAll();
	});

	$scope.filterTags = function(items,tagsFilter) {
		if(tagsFilter==undefined || tagsFilter=="" || tagsFilter.length<3){
			return items;
		}
		var result = {};
		angular.forEach(items, function(value, key) {
			if(key.toLowerCase().indexOf(tagsFilter.toLowerCase())>-1){
				 result[key] = value;
			}

		});
		return result;
	}



});





diigoBookmarks.controller("searchController", function($scope,$http,$location,$routeParams,fSelectedTags) {
	$http.get("importer/search.php?srch="+$routeParams.searchterm)
			.then(function(response) {
					$scope.bookmarks = response.data.boomarks;
					
			}, function(response) {
					console.log("մտավ սխալ");
			});

	$scope.select = function(key){
		fSelectedTags.add(key)
	};
});