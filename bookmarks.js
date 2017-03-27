var baseUrl = 'http://localhost:8080/bookmarks/';
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

function changeUrl(sr){
	location.assign(baseUrl+'#/search/'+sr["search"].value);
}
/*
myApp.factory('fserchTerm', function () {

    var seachterm = "";
    return {
        getTerm: function () {
            return seachterm;
        },
        setTerm: function(term) {
            seachterm = term;
        }
    };
});
*/


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
});












/*
var selectedTags = [];

$( document ).ready(function() {
    jQuery.getJSON( "importer/import.json", function( data ) {
	var bmks = $("#bookmarks")
	var tagsReg = new tagsRegistry();

    	$.each(data.boomarks, function(i, l ){
  		var card = $(document.createElement("div"));
		card.addClass("card");
  		var cardblock = $(document.createElement("div"));
		cardblock.addClass("card-block");

		var title = $(document.createElement("h3"));
		title.addClass("card-title");
		title.text(l.title.replace(/\//ig," / "));
		
		var cardtext = $(document.createElement("div"));
		cardtext.addClass("card-text");
		$.each(l.annotations,function(m,a){
			var par = $(document.createElement("p"));
			par.text(a);
			cardtext.append(par);
		});

		var linkPart = $(document.createElement("div"));
		linkPart.addClass("link");
		linkPart.append('<i class="fa fa-external-link" aria-hidden="true"></i>')

		var link = $(document.createElement("a"));
		link.attr({"href":l.url,"target":"blank","rel":"nofollow" });
		link.text(" " + l.url.substring(0, 50) + " ... ");
		linkPart.append(link);


		var tags = $(document.createElement("div"));
		tags.addClass("tags");
		tags.append('<i class="fa fa-tags" aria-hidden="true"></i>');
		$.each(l.tags, function(m,k){
			var tag = $(document.createElement("span")); //k
			tag.addClass("tag badge badge-primary");
			var tagName = k.replace(/\"/ig," ");
			tag.attr("data-tag-name",tagName);
			tag.text(tagName);
			tagsReg.addTag(tagName);
			tags.append(tag);
		});

		cardblock.append(title);
		cardblock.append(cardtext);
		cardblock.append(tags);
		cardblock.append(linkPart);
		card.append(cardblock);
		bmks.append(card);
		//console.log(i,l);
	});

    	$("#spinner").hide();

    	var allTags = tagsReg.getTags("");
 	printTagList();

    	$("#searchtags").keyup(function(){
	    	//allTags = tagsReg.getTags($(this).val());
		filterTagList($(this).val());
    	});

    	$(".tag").on("click",function(){
    		var tagToAdd = $(this).attr("data-tag-name");
    		if(selectedTags.indexOf(tagToAdd)===-1){
    			selectedTags.push(tagToAdd);
    		}
    		filterBookmarksList();
    		printSelectedTagList();
    	});

      	function printTagList(){
      		$("#tags-list").html("");
      		 $.each(allTags, function(i, l){
	    		var tag = $(document.createElement("span")); 
	    		tag.addClass("tag badge badge-primary");
	    		tag.text(l.tag+" ("+l.count+")");
	    		tag.attr("data-tag-name",l.tag);
	    		$("#tags-list").append(tag);
	    	});
      	}

      	function filterTagList(filter){
      		if(filter!==""){
      			filter = filter.toLowerCase();
	      		$("#tags-list .tag").each(function(t,l){
	      			var tagdata = $(this).attr("data-tag-name").toLowerCase();
	      			if(tagdata.indexOf(filter)>=0){
	      				$(this).show();
	      			}
	      			else{
	      				$(this).hide();
	      			}
	      		});
      			
      		}
      		else{
      			$("#tags-list .tag").show();
      		}

      	}

      	function printSelectedTagList(){
      		$("#selected-tags-list").html("");
      		 $.each(selectedTags, function(i, l){
	    		var tag = $(document.createElement("span")); 
	    		tag.addClass("tagselected badge badge-primary");
	    		tag.text(l);
	    		tag.attr("data-tag-name",l);
	    		tag.on("click",function(){
	    			selectedTags.remove(l);
	    			$(this).remove();
	    			filterBookmarksList();
	    			
	    		})
	    		$("#selected-tags-list").append(tag);
	    	});


      	}
    });
});



function compare(a,b) {
  if (a.count < b.count)
    return 1;
  if (a.count > b.count)
    return -1;
  return 0;
}


var tagsRegistry=function(){
	var tags = [];
	var tagsfiltered = [];
	this.addTag=function(newtag){
		for(var i = 0;  i<tags.length; i++){
			if(tags[i].tag===newtag){
				tags[i].count++;
				return;
			}
		}
		tags.push({"tag":newtag,count:1});
		tags.sort(compare);
	}
	this.getTags=function(filter){
		filter = filter.toLowerCase();
		tagsfiltered = [];
		if(filter===""){
			return tags;
		}
		else{
			for(var i = 0;  i<tags.length; i++){
				if(tags[i].tag.toLowerCase().indexOf(filter)>-1){
					tagsfiltered.push(tags[i]);
				}
			}
			return tagsfiltered;
		}
		tagsfiltered.sort(compare);
	}
};


function filterBookmarksList(){
	$(".card").each(function(){
		var tags = $(this).find(".tag");
		var tg = [];
		tags.each(function(){
			tg.push($(this).text());
		});

		if(containTags(tg,selectedTags)){
			$(this).show();
		}
		else{
			$(this).hide();
		}

		
	});
}

function containTags(primArray, filterArray){
	var count = 0;
	for(var i = 0; i<filterArray.length; i ++){
		if(primArray.indexOf(filterArray[i])>=0){
			count++;
		}
	}
	return (count==filterArray.length);

}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};
*/
/*
var taggs = new tagsRegistry();
taggs.addTag("jjjjj");
taggs.addTag("javascript");
taggs.addTag("Մարդ");
taggs.addTag("Մարդ");
taggs.getTags();
*/
