<!DOCTYPE html>
<html>
<head>
	<title>Hanuman Diigo Bookmarks Self Hosted Export</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="assets/font-awesome-4.7.0/css/font-awesome.min.css">
	<link rel="stylesheet" type="text/css" href="style.css">
	 
</head>
<a href="https://github.com/hanumanum/self-hosted-diigo-bookmarks"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67" alt="Fork me on GitHub" data-canonical-src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"></a>
<body ng-app="diigoBookmarks">
<div class="container" ng-controller="dataloaderController">

	<div class="page-header row">
			<h1>Diigo Bookmarks Selfhosted BackUp</h1>
	</div>
	<div class="row">
		<div class="col-md-9">
		<form name="searchform">
					<input type="text" name="search" class="form-control" placeholder="search" ng-model="searchterm">
		</form>
		</div>
		
		<div class="col-md-9">
			<hr>
			<div class="" id="bookmarks">
				<p class="bg-success text-white linksfound">{{bookmarks.length}} links found</p>
				<br>
				<div id="forspinner" ng-hide="bookmarks" class="text-center">
					<i class="fa fa-spinner fa-spin fa-5x fa-fw" id="spinner"></i>
				</div>
				<div class="card" ng-repeat="b in bookmarks track by $index">
					<div class="card-block">
						<h3 class="card-title">{{b.title}}</h3>
						<div class="card-toolbox text-right">
							<i ng-click="showAnot = !showAnot" ng-show="b.annotations.length" ng-class="showAnot ? 'fa-caret-down':'fa-caret-left'" class="fa tag badge badge-success annotcount">
									{{b.annotations.length}}
							</i>
						</div>
						<hr>
						<div class="card-text" ng-show="showAnot">
							<p ng-repeat="a in b.annotations track by $index">{{a}}</p>
						</div>
						<i class="fa fa-external-link" aria-hidden="true">	
							<a href="{{b.url}}" rel="nofollow" target="_blank">{{b.url.substring(0, 50)}} ...</a>
						</i>
						<div class="tags">
							<i class="fa fa-tags" aria-hidden="true">
								<span ng-repeat="t in b.tags track by $index" ng-click="select(t)">
									<a>
										<span class="tag badge badge-primary" >
											{{t}}
										</span>
									</a>
								</span>
							</i>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="col-md-3">
			<h3>Selected Tags</h3>
			<div id="selected-tags-list">
				<a ng-repeat="key in selectedTags" ng-click="unselect(key)">
					<span class="tag badge badge-primary">{{key}}</span>
				</a>
			</div>
			<hr>
			<h3>Related Tags</h3>
			<div id="related-tags-list">
				<a ng-repeat="key in relatedTags" ng-click="select(key)">
					<span class="tag badge badge-primary">{{key}}</span>
				</a>
			</div>
			<hr>
			<h3>All tags</h3>
			<input type="text" name="searchtags" id="searchtags" class="form-control" placeholder="filter tags" ng-model="tagsFilter">
			<br>
			<div id="tags-list">
				<a ng-repeat="(key,val) in filterTags(alltags,tagsFilter)" ng-click="select(key)">
					<span class="tag badge badge-primary">{{key}} ({{val}})</span>
				</a>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript" src="settings.js"></script>
<script type="text/javascript" src="functions.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.js"></script>
<script type="text/javascript" src="bookmarks.js"></script>
</body>
</html>