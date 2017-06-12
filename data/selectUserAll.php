<?php
    header('Content-Type:application/json;charset=utf-8');
    @$user=$_REQUEST['user'];
    @$pag=$_REQUEST['pag'];
    require('init.php');
    $sql="SELECT * FROM tt_user WHERE user='$user'";
    $result=mysqli_query($conn,$sql);
    $row=mysqli_fetch_assoc($result);
    if($row){
        $uid=$row['uid'];
        $onput=['result'=>'succ','user'=>$row];
        if($pag==null){
            $sql="SELECT * FROM tt_move WHERE move_userId='$uid'";
        }else{
            $sql="SELECT * FROM tt_move WHERE move_userId='$uid' LIMIT 0,$pag";
        }
        $result=mysqli_query($conn,$sql);
        $move=mysqli_fetch_all($result,1);
        foreach($move as $k=>$value){
            $tid=$value['move_tid'];
            $sql="SELECT * FROM tt_dm WHERE tid='$tid'";
            $result=mysqli_query($conn,$sql);
            $row=mysqli_fetch_assoc($result);
            $move[$k]['img']=$row['tt_sm_img'];
            $move[$k]['name']=$row['tt_name'];
            $move[$k]['click']=$row['tt_click'];
            $move[$k]['tid']=$row['tid'];
        }
        $onput['move']=$move;
        if($pag==null){
            $sql="SELECT * FROM tt_host WHERE host_userId='$uid' ORDER BY host_time desc";
        }else{
            $sql="SELECT * FROM tt_host WHERE host_userId='$uid' ORDER BY host_time desc LIMIT 0,$pag";
        }
        $result=mysqli_query($conn,$sql);
        $host=mysqli_fetch_all($result,1);
        foreach($host as $k=>$value){
            $tid=$value['host_tid'];
            $sql="SELECT * FROM tt_dm WHERE tid='$tid'";
            $result=mysqli_query($conn,$sql);
            $row=mysqli_fetch_assoc($result);
            $host[$k]['img']=$row['tt_sm_img'];
            $host[$k]['name']=$row['tt_name'];
            $host[$k]['click']=$row['tt_click'];
            $host[$k]['tid']=$row['tid'];
        }
        $onput['host']=$host;
    }else{
        $onput=['result'=>'err'];
    }
    echo json_encode($onput);