<?php
error_reporting(0);
include("../settings.php");
$alltagsFile = "Bookmarks/alltags.json";

if(filemtime($alltagsFile)<filemtime($csvFile)){
      unlink($alltagsFile);
      echo "deleted";
}

if(!file_exists($alltagsFile)){
      //title,url,tags,description,comments,annotations,created_at
      $allTags = array("no_tag"=>0);
      $file = fopen($csvFile, 'r');
      $tmp = 0;
      while (($line = fgetcsv($file,'","')) !== FALSE) {
            $tags = explode(",", $line[2]);
            $tags = str_replace("\""," ",$tags);
            $tags=array_map('trim',$tags);
            foreach($tags as $t){
            if(array_key_exists($t,$allTags)){
                  $allTags[$t]+=1;
            }
            else{
            $allTags[$t] = 1;
            }
      }
      }
      fclose($file);

      //print(json_encode($allTags, JSON_PRETTY_PRINT));
      
      file_put_contents($alltagsFile,json_encode($allTags,JSON_PRETTY_PRINT));
      echo file_get_contents($alltagsFile);
}
else{
      
      echo file_get_contents($alltagsFile);
} 
?>