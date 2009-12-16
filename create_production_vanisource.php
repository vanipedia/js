<?php
/*******************************************************************
 *    This script extracts the contents from view_mode_vanisource.js
 *    dependencies file and concats and compressed them together
 *    to create a view_mode_production.js file for production
 *    **************************************************************/

$view_mode_development = file_get_contents('view_mode_development_vanisource.js');
preg_match_all('!src="/js/(.+?)"!', $view_mode_development, $m);
array_shift($m);
print_r($m);
foreach($m[0] as $f) {
  $temp .= file_get_contents($f);
}
//echo $temp;
file_put_contents("view_mode_vanisource.tmp", $temp);
echo "Compressing...\n";
system("java -jar yuicompressor-2.4.2.jar --type js -o view_mode_production_vanisource.js < view_mode_vanisource.tmp");
echo "Done compressing and updating view_mode_production_vanisource.js\n";

?>
