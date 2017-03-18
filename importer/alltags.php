<?php
$csvFile = 'bookmarks/3453463_csv_2017_02_24_1106e/3453463_csv_2017_02_24_1106e.csv';

//title,url,tags,description,comments,annotations,created_at

$allTags = array("no_tag"=>0);

$file = fopen($csvFile, 'r');
$tmp = 0;
while (($line = fgetcsv($file,'","')) !== FALSE) {
	$tags = explode(",", $line[2]);
	$tags = str_replace("\""," ",$tags);
	foreach($tags as $t){
      if(array_key_exists($t,$allTags)){
            $allTags[$t]+=1;
      }
      else{
         $allTags[$t] = 1;
      }
      
   }

   $tmp++;
	if($tmp==120){
		//break;
	}
}
fclose($file);


/*
echo "<pre>";
var_dump($allTags);
echo "</pre>";
*/

print(json_encode($allTags, JSON_PRETTY_PRINT));
?>