<?php
    header('Content-Type:application/json;charset=utf-8');
    @$user=$_REQUEST['user'];
    @$upwd=$_REQUEST['upwd'];
    require('init.php');
    $sql="SELECT * FROM tt_user WHERE user='$user' AND upwd='$upwd'";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($result);
    if($row){
        $onput=['result'=>'succ','user'=>$row];
    }else{
        $onput=['result'=>'err'];
    }
    echo json_encode($onput);