<?php
    header('Content-Type:application/json;charset=utf-8');
    require('init.php');
    $sql="SELECT * FROM tt_main_type";
    $result=mysqli_query($conn,$sql);
    $first=mysqli_fetch_all($result,1);
    $sql="SELECT * FROM tt_group_type";
    $result=mysqli_query($conn,$sql);
    $two=mysqli_fetch_all($result,1);
    $onput=['result'=>'succ','first'=>$first,'two'=>$two];
    echo json_encode($onput);