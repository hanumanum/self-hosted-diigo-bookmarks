<?php
$srch = "";
if(isset($_GET["srch"])){
	$srch = $_GET["srch"];
}
else{
   die();
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

	if( strpos($line[0],$srch) || strpos($line[2],$srch) || strpos($line[5],$srch) ){
  
      $bookmark = new StdClass();	
      $bookmark->title = str_replace("/"," ",$line[0]);
      //$bookmark->title = $line[0];
      
      $bookmark->url = $line[1];
      $bookmark->tags = explode(",", $line[2]);
      $bookmark->tags= array_map('trim',$bookmark->tags);
      $bookmark->tags = str_replace("\""," ",$bookmark->tags);
      
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

     }
}
fclose($file);

/*
echo "<pre>";
var_dump($bookmarkRegistry);
echo "</pre>";
*/

print(json_encode($bookmarkRegistry, JSON_PRETTY_PRINT));
?>