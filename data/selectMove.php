<?php
    @$user=$_REQUEST['user'];
    @$tid=$_REQUEST['tid'];
    require('init.php');
    $sql="SELECT * FROM tt_move WHERE move_userId='$user' AND move_tid='$tid'";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_row($result);
    if($row){
        echo 'succ';
    }else{
        echo 'err';
    }