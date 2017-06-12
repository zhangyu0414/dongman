<?php
    header('Content-Type:application/json;charset=utf-8');
    @$tid=$_REQUEST['tid'] or die();
    @$pag=$_REQUEST['pag'];
    require('init.php');
    if($pag==null){
        $pag=1;
    }else{
        $pag=intval($pag);
    }
    $onput=[];
    $num=5;
    $start=($pag-1)*$num;
    $sql="SELECT * FROM tt_tittle WHERE tittleId='$tid' ORDER BY one_time asc LiMIT $start,$num";
    $result=mysqli_query($conn,$sql);
    $all=mysqli_fetch_all($result,1);
    foreach($all as $k=>$value){
        $i=$value['userId'];
        $sql="SELECT * FROM tt_user WHERE uid='$i'";
        $result=mysqli_query($conn,$sql);
        $name=mysqli_fetch_assoc($result);
        $all[$k]['one_name']=$name['user'];
        $all[$k]['one_img']=$name['user_img'];
    }
    $sql="SELECT COUNT(*) FROM tt_tittle WHERE tittleId='$tid'";
    $result=mysqli_query($conn,$sql);
    $count=mysqli_fetch_row($result)[0];
    $more=ceil($count/$num);
    $sql="SELECT * FROM tt_answer WHERE two_tittleId='$tid'";
    $result=mysqli_query($conn,$sql);
    $two=mysqli_fetch_all($result,1);
    foreach($two as $k=>$value){
            $i=$value['two_userId'];
            $sql="SELECT * FROM tt_user WHERE uid='$i'";
            $result=mysqli_query($conn,$sql);
            $name=mysqli_fetch_assoc($result);
            $two[$k]['two_name']=$name['user'];
            $two[$k]['two_img']=$name['user_img'];
    }
    $onput=['result'=>'succ','all'=>$all,'count'=>$count,'comment'=>$two,'more'=>$more];
    echo json_encode($onput);



