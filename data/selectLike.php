<?php
    header('Content-Type:application/json;charset=utf-8');
    require('init.php');
    $onput=[];
    $four=4;
    $num=2;
    $one=1;
    $sql="SELECT * FROM tt_dm WHERE tt_two_type='4' ORDER BY tt_click desc LIMIT 0,$num";
    $result=mysqli_query($conn,$sql);
    $firstLike=mysqli_fetch_all($result,1);
    $sql="SELECT * FROM tt_dm WHERE tt_two_type='4' ORDER BY tt_click desc LIMIT $num,$num";
    $result=mysqli_query($conn,$sql);
    $nextLike=mysqli_fetch_all($result,1);
    $sql="SELECT * FROM tt_dm ORDER BY tt_click desc LIMIT 0,$one";
    $result=mysqli_query($conn,$sql);
    $firstGood=mysqli_fetch_all($result,1);
    $sql="SELECT * FROM tt_dm ORDER BY tt_click desc LIMIT $one,$one";
    $result=mysqli_query($conn,$sql);
    $nextGood=mysqli_fetch_all($result,1);
    $sql="SELECT * FROM tt_dm WHERE tt_tree_type='1' ORDER BY tt_click desc LIMIT 0,$one";
    $result=mysqli_query($conn,$sql);
    $firstChina=mysqli_fetch_all($result,1);
    $sql="SELECT * FROM tt_dm WHERE tt_tree_type='1' ORDER BY tt_click desc LIMIT $one,$one";
    $result=mysqli_query($conn,$sql);
    $nextChina=mysqli_fetch_all($result,1);
    $sql="SELECT * FROM tt_dm WHERE tt_one_type='3' ORDER BY tt_click desc LIMIT 0,$num";
    $result=mysqli_query($conn,$sql);
    $firstBig=mysqli_fetch_all($result,1);
    $sql="SELECT * FROM tt_dm WHERE tt_one_type='3' ORDER BY tt_click desc LIMIT $num,$num";
    $result=mysqli_query($conn,$sql);
    $nextBig=mysqli_fetch_all($result,1);
    $sql="SELECT * FROM tt_dm ORDER BY tt_click desc LIMIT 0,$four";
    $result=mysqli_query($conn,$sql);
    $run=mysqli_fetch_all($result,1);
    $sql="SELECT * FROM tt_dm ORDER BY tt_click desc LIMIT $four,$one";
    $result=mysqli_query($conn,$sql);
    $nextRun=mysqli_fetch_all($result,1);
    $fix=$four+$one;
    $sql="SELECT * FROM tt_dm ORDER BY tt_click desc LIMIT $fix,$one";
    $result=mysqli_query($conn,$sql);
    $treeRun=mysqli_fetch_all($result,1);
    $onput=['result'=>'succ','firstLike'=>$firstLike,'nextLike'=>$nextLike,'firstGood'=>$firstGood,'nextGood'=>$nextGood,'firstChina'=>$firstChina,'nextChina'=>$nextChina,'firstBig'=>$firstBig,'nextBig'=>$nextBig,'run'=>$run,'nextRun'=>$nextRun,'treeRun'=>$treeRun];
    echo json_encode($onput);