var baseUrl = 'http://localhost:8080/bookmarks/';


var tagsRegistry=function(){
	var tags = [];
	this.addTag=function(newtag){
		for(var i = 0;  i<tags.length; i++){
			if(tags[i].tag===newtag){
				tags[i].count++;
				return;
			}
		}
		tags.push({"tag":newtag,count:1,showThis:true});
		//tags.sort(compare);
	}
	this.getTags=function(filter){
		filter = filter.toLowerCase();
		for(var i = 0;  i<tags.length; i++){
			if(tags[i].tag.toLowerCase().indexOf(filter)>-1){
				tags[i].showThis=true;
			}
			else{
				tags[i].showThis=false;
			}
		}

		return tags;
		
	}
};


function compare(a,b) {
  if (a.count < b.count)
    return 1;
  if (a.count > b.count)
    return -1;
  return 0;
}


function changeUrl(sr){
	location.assign(baseUrl+'#/search/'+sr["search"].value);
}
