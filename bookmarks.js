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

diigoBookmarks.factory('fRelatedTags', function(fSelectedTags){
	var relatedTags = [];
	return {
        remove: function (key) {
            var ind = relatedTags.indexOf(key);
				relatedTags.splice(ind,1);
        },
		  empty: function(){
			  relatedTags = [];
		  },
		  getAll: function(){
				return relatedTags;
		  },

		  generateFromBookmarks: function(bookmarks){
					relatedTags = [];
					bookmarks.forEach(function(bkmrk) {
    					bkmrk.tags.forEach(function(tag){
							 if(relatedTags.indexOf(tag)<0 && fSelectedTags.getAll().indexOf(tag)<0){
								relatedTags.push(tag);
							}
						 })
					});
		  }
    };
});



diigoBookmarks.controller("dataloaderController", function($scope,$http,$location,fSelectedTags,fRelatedTags) {
	$http.get("importer/import.php?tag=")
		.then(function(response) {
				$scope.bookmarks = response.data.boomarks;
				fRelatedTags.generateFromBookmarks($scope.bookmarks);
				$scope.relatedTags = fRelatedTags.getAll();
		}, function(response) {
				$scope.bookmarks = "մտավ սխալ";
		});
	
	$http.get("importer/alltags.php")
		.then(function(response1) {
				$scope.alltags = response1.data;
		}, 
		function(response) {
			$scope.alltags = "մտավ սխալ";
	});

	$scope.select = function(key){
		fSelectedTags.add(key);
		$http.get("importer/import.php?tag="+fSelectedTags.getAll().join("|"))
			.then(function(response) {
					$scope.bookmarks = response.data.boomarks;
					fRelatedTags.generateFromBookmarks($scope.bookmarks);
					$scope.relatedTags = fRelatedTags.getAll();
			}, function(response) {
					$scope.bookmarks = "մտավ սխալ";
		});
	};

	$scope.unselect = function(key){
		fSelectedTags.remove(key);
		$http.get("importer/import.php?tag="+fSelectedTags.getAll().join("|"))
			.then(function(response) {
					$scope.bookmarks = response.data.boomarks;
					fRelatedTags.generateFromBookmarks($scope.bookmarks);
					$scope.relatedTags = fRelatedTags.getAll();
			}, function(response) {
					$scope.bookmarks = "մտավ սխալ";
		});
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
	
	$scope.searchterm="";
	$scope.$watch("searchterm",function(oV,nV){
		if(nV!=="" && $scope.searchterm.length>3){
			$http.get("importer/search.php?srch="+$scope.searchterm)
				.then(function(response) {
						$scope.bookmarks = response.data.boomarks;
						fRelatedTags.generateFromBookmarks($scope.bookmarks);
						$scope.relatedTags = fRelatedTags.getAll();
				}, function(response) {
						console.log("մտավ սխալ");
				});
		}
	});

});