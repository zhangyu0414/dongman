<?php
    header('Content-Type:application/json;charset=utf-8');
    require('init.php');
    @$name=$_REQUEST['name'];
    $sql="SELECT * FROM tt_dm WHERE tid='$name'";
    $result=mysqli_query($conn,$sql);
    $all=mysqli_fetch_all($result,1);
    $onput=['result'=>'succ','all'=>$all];
    echo json_encode($onput);
