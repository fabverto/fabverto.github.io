<?php

if(isset($_POST['submit']){

$namef = $_POST['firstname'];
$namel = $_POST['lastname'];
$emailFrom = $_POST['email'];
$momCredit = $_POST['MomCC'];
$country = $_POST['country'];
$message = $_POST['subject'];

$mailTo = "fabio.fahme@ucalgary.ca"

$headers = "From: ".emailFrom;
$txt = "You have received an email from ".namef." ".namel."./n/n".message;

mail($mailTo, "MyWebsiteMessage", $txt, $headers);
echo "<script type ='text/javascript'>alert('Your message was sent succesfully, Thanks!')</script>";
window.history.log(-1);
//header("Location: index.html?mailsend");
}

?>