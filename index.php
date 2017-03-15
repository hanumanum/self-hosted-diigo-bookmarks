<!DOCTYPE html>
<html>
<head>
	<title></title>
	<meta charset="utf-8">
    	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="assets/font-awesome-4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
<div class="container" ng-app="diigoBookmarks" ng-controller="dataloader">

	<div class="page-header row">
			<h1><!-- Diigo Bookmarks Selfhosted BackUp --></h1>
	</div>
	<div class="row">
		<div class="col-md-9" ng-controller="bookmarks_list">
			<form name="searchform">
					<input type="text" class="form-control" placeholder="search">
			</form>

			<hr>
			<div class="" id="bookmarks">
				<div id="forspinner" ng-hide="bookmarks" class="text-center">
					<i class="fa fa-spinner fa-spin fa-5x fa-fw" id="spinner"></i>
				</div>
				<div class="card" ng-repeat="b in bookmarks track by $index">
					<div class="card-block">
						<h3 class="card-title">{{b.title}}</h3>
						<div class="card-text">
							<p ng-repeat="a in b.annotations track by $index">{{a}}</p>
							<i class="fa fa-external-link" aria-hidden="true">	
								<a href="{{b.url}}" rel="nofollow" target="_blank">{{b.url.substring(0, 50)}} ...</a>
							</i>
						</div>
						<div class="tags">
							<i class="fa fa-tags" aria-hidden="true">
								<span class="tag badge badge-primary" ng-repeat="t in b.tags track by $index">{{t}}</span>
							</i>
						</div>
					</div>
				</div>
			</div>

		</div>
		<div class="col-md-3">
			<h3>Selected Tags</h3>
			<div id="selected-tags-list">
			</div>
			<hr>
			<h3>All tags</h3>
			<input type="text" name="searchtags" id="searchtags" class="form-control" placeholder="filter all tags" ng-model="tagsFilter">
			<br>
			<div id="tags-list">
				<span class="tag badge badge-primary" ng-repeat="t in tags" ng-show="t.showThis" ng-click="t.selected=true">{{t.tag}} ({{t.count}})</span>
			</div>
		</div>
	</div>
</div>







<script type="text/javascript" src="functions.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.js"></script>
<script type="text/javascript" src="bookmarks.js"></script>
</body>
</html>