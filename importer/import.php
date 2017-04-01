<?php
$stag = "";
if(isset($_GET["tag"])){
	$stag = explode("|",$_GET["tag"]);
}

include("../settings.php");
//$csv = array_map('str_getcsv', file('bookmarks/3453463_csv_2017_02_24_1106e/3453463_csv_2017_02_24_1106e.csv'));

/*echo "<pre>";
var_dump($csv);
echo "</pre>";
*/

//title,url,tags,description,comments,annotations,created_at

$bookmarkRegistry = new StdClass();
$bookmarkRegistry->boomarks=[];

$file = fopen($csvFile, 'r');
$tmp = 0;
while (($line = fgetcsv($file,'","')) !== FALSE) {
	$bookmark = new StdClass();	
	$bookmark->title = str_replace("/"," ",$line[0]);
	
	$bookmark->url = $line[1];
	$bookmark->tags = explode(",", $line[2]);
	$bookmark->tags = str_replace("\""," ",$bookmark->tags);
	$bookmark->tags=array_map('trim',$bookmark->tags);

	if(count($stag)>0 && count(array_intersect($stag,$bookmark->tags))!=count($stag) && $stag[0]!=""){
		unset($bookmark);
		continue;
	}

	$bookmark->annotations=[];
	$annotAndHiglights = [];
	if($line[3]){
		array_push($annotAndHiglights, $line[3]); 
	}
	if($line[5]){
		$annotAndHiglights = array_merge($annotAndHiglights,explode("Highlight:",$line[5]));
	}
	$bookmark->annotations = $annotAndHiglights;

	$bookmark->date = $line[6];

	array_push($bookmarkRegistry->boomarks, $bookmark);

	$tmp++;
	if($tmp==120 && $stag[0]==""){
		break;
	}
}
fclose($file);

print(json_encode($bookmarkRegistry, JSON_PRETTY_PRINT));
?>