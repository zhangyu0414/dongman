<?php
    header('Content-Type:application/json;charset=utf-8');
    require('init.php');
    $onput=[];
    $sql="SELECT * FROM tt_group_type";
    $result=mysqli_query($conn,$sql);
    $group=mysqli_fetch_all($result,1);
    $sql="SELECT * FROM tt_sm_type";
    $result=mysqli_query($conn,$sql);
    $sm=mysqli_fetch_all($result,1);
    $sql="SELECT * FROM tt_main_type";
    $result=mysqli_query($conn,$sql);
    $main=mysqli_fetch_all($result,1);
    $onput=['result'=>'succ','group'=>$group,'sm'=>$sm,'main'=>$main];
    echo json_encode($onput);
