<?php
    @$uid=$_REQUEST['uid'] or die();
    $time=time()*1000;
    @$tid=$_REQUEST['tid'] or die();
    require('init.php');
    $sql="SELECT * FROM tt_host WHERE host_tid='$tid' AND host_userId='$uid'";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_row($result);
    if(!$row){
        $sql="INSERT INTO tt_host VALUES(NULL,$time,$tid,$uid)";
        $result=mysqli_query($conn,$sql);
        if($result){
            echo 'succ';
        }
    }
