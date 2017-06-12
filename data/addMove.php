<?php
    @$uid=$_REQUEST['uid'] or die();
    $time=time()*1000;
    @$tid=$_REQUEST['tid'] or die();
    require('init.php');
    $sql="SELECT * FROM tt_move WHERE move_tid='$tid' AND move_userId='$uid'";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_row($result);
    if(!$row){
        $sql="INSERT INTO tt_move VALUES(NULL,$time,$tid,$uid)";
        $result=mysqli_query($conn,$sql);
        if($result){
            echo 'succ';
        }
    }

