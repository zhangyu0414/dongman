<?php
    /*header('Content-Type:application/json;charset=utf-8');*/
    @$time=time()*1000;
    @$reply=$_REQUEST['reply'] or die('reply requery');
    @$name=$_REQUEST['name'] or die('name requery');
    @$tid=$_REQUEST['tid'];
    @$pid=$_REQUEST['pid'];
    require('init.php');
    if($pid==null){
        $sql="SELECT uid FROM tt_user WHERE user='$name'";
        $result=mysqli_query($conn,$sql);
        $row=mysqli_fetch_row($result)[0];
        $sql="INSERT INTO tt_tittle VALUES(NULL,'$reply',0,'$time','$row','$tid')";
        $result=mysqli_query($conn,$sql);
        echo 'succ';
    }else{
        $sql="SELECT uid FROM tt_user WHERE user='$name'";
        $result=mysqli_query($conn,$sql);
        $row=mysqli_fetch_row($result)[0];
        $sql="INSERT INTO tt_answer VALUES(NULL,'$reply','$time','$row','$tid','$pid')";
        $result=mysqli_query($conn,$sql);
        echo 'succ';
    }