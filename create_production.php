<?php
/*******************************************************************
 *    This script extracts the contents from view_mode_[argument].js
 *    dependencies file and concats and compressed them together
 *    to create a view_mode_production.js file for production
 *    This special script will create a production file depending
 *    on the first parameter in the command line e.g.:
 *    $ php create_production.php vanisource
 *    will create the view_mode_production_vanisource.js file.
 *    **************************************************************/

$petal = $argv[1]; // is the first argument in the command line
$devel_file = 'view_mode_development_'.$petal.'.js';
$temp_file = 'view_mode_'.$petal.'.tmp';
$production_file = 'view_mode_production_'.$petal.'.js';
echo "You are about to compress the contens of $petal in $devel_file and output it to $production_file\n";
echo "Getting the contents of $devel_file... ";
$view_mode_development = file_get_contents($devel_file);
// Get path vars in development file
preg_match_all('/var (?P<var>.+?)\s*=\s*[\'"](?P<path>.+)[\'"];/', $view_mode_development, $paths, PREG_SET_ORDER);
if(sizeof($paths) > 0) {
  $paths_found = true;
  echo "found paths\n";
  //print_r($paths);
}
echo "done\n";
preg_match_all('!src="(.+?)"!', $view_mode_development, $m);
echo "List of files to compress:\n";
array_shift($m);
print_r($m);
echo "Gathering data in development files...\n";
foreach($m[0] as $f) {
  if($paths_found) {
    foreach($paths as $p) {
      $f = preg_replace(array("!'\+$p[var]\+'!", "!^/js/!"), array($p[path], ""), $f);
    }
  }
  echo "    $f\n";
  $temp .= file_get_contents($f);
}
echo "done\n";
echo "Saving code in development env to $temp_file...";
file_put_contents($temp_file, $temp);
echo "done\n";
echo "Compressing and saving to $production_file...\n";
system("java -jar yuicompressor-2.4.2.jar --type js -o ".$production_file." < ".$temp_file);
echo "\nDone compressing and updating ".$production_file.".js\n";

?>
