<?php
    @$uid=$_REQUEST['uid'] or die();
    require('init.php');
    $sql="DELETE FROM tt_host WHERE host_userId='$uid'";
    $result=mysqli_query($conn,$sql);
    if($result){
        echo 'succ';
    }
