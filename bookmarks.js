var diigoBookmarks = angular.module("diigoBookmarks", ["ngRoute"]); 
var allTags = new tagsRegistry();


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



diigoBookmarks.controller("dataloaderController", function($scope,$http,$location) {
		 $http.get("importer/import.php")
    		.then(function(response) {
            	$scope.bookmarks = response.data.boomarks;
        			
					/*angular.forEach($scope.bookmarks, function(bookmark, key) {
						angular.forEach(bookmark.tags,function(tag,key){
							allTags.addTag(tag);
						}); 
					});
					*/
    		}, function(response) {
        			$scope.bookmarks = "Something went wrong";
    		});
			
			 
});

diigoBookmarks.controller("tagController", function($scope,$http,$routeParams) {
	  $http.get("importer/import.php?tag="+$routeParams.tagname)
    		.then(function(response) {
        			//$scope.tagsFilter="";
        			$scope.bookmarks = response.data.boomarks;
        			angular.forEach($scope.bookmarks, function(bookmark, key) {
						angular.forEach(bookmark.tags,function(tag,key){
							allTags.addTag(tag);
						});
					});
        			//$scope.tags = allTags.getTags("");

        			/*$scope.$watch("tagsFilter", function(newValue, oldValue) {
			      $scope.tags = allTags.getTags(newValue); 
			  });*/

    		}, function(response) {
        			//Second function handles error
        			$scope.bookmarks = "Something went wrong";
    		});

});


diigoBookmarks.controller("searchController", function($scope,$http,$location,$routeParams) {
					//$scope.termSearched = $routeParams.searchterm;
					//console.log($scope.termSearched);
					$http.get("importer/search.php?srch="+$routeParams.searchterm)
							.then(function(response) {
									$scope.bookmarks = response.data.boomarks;
									
							}, function(response) {
									console.log("մտավ սխալ");
							});

});

diigoBookmarks.controller("tagListController", function($scope,$http,$location) {
	$http.get("importer/alltags.php")
		.then(function(response) {
				$scope.alltags = response.data;
		}, 
		function(response) {
			$scope.alltags = "Something went wrong";
	});

	$scope.go = function ( path ) {
		$location.path( path );
	};


	$scope.filterTags = function(items,tagsFilter) {
		console.log(items);
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