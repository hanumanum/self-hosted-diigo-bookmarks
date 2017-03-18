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
<div class="container" ng-app="diigoBookmarks">

	<div class="page-header row">
			<h1><!-- Diigo Bookmarks Selfhosted BackUp --></h1>
	</div>
	<div class="row">
		<div class="col-md-9 ng-view">
		
		</div>
		<div class="col-md-3">
			<h3>Selected Tags</h3>
			<div id="selected-tags-list">
			</div>
			<hr>
			<h3>All tags</h3>
			<input type="text" name="searchtags" id="searchtags" class="form-control" placeholder="filter all tags" ng-model="tagsFilter">
			<br>
			<div id="tags-list" ng-controller="tagListController">
				<a ng-repeat="(key,val) in alltags" ng-href="#/tag/{{key}}">
					<span class="tag badge badge-primary"  >{{key}} ({{val}})</span>
				</a>
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