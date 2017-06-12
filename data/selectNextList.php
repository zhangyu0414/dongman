<?php
    header('Content-Type:application/json;charset=utf-8');
    require('init.php');
    @$onet=$_REQUEST['onet'];
    @$twot=$_REQUEST['twot'];
    @$treet=$_REQUEST['treet'];
    @$pag=$_REQUEST['pag'];
    $onput=[];
    if($pag==null){
        $pag=1;
    }else{
        $pag=intval($pag);
    }
    $num=8;
    $start=($pag-1)*$num;
    if($onet==null&&$twot==null&&$treet==null){
        $sql="SELECT COUNT(*) FROM tt_dm";
        $result=mysqli_query($conn,$sql);
        $count=mysqli_fetch_row($result)[0];
        $sum=$pag*$num=8;
        $index=ceil($count/$num);
        $sql="SELECT * FROM tt_dm ORDER BY tt_click desc LIMIT $start,$num";
        $result=mysqli_query($conn,$sql);
        $all=mysqli_fetch_all($result,1);
        $onput=['result'=>'succ','all'=>$all,'more'=>false,'index'=>$index];
        if($sum>=$count){
            $onput['more']=true;
        }
        echo json_encode($onput);
    }else if($onet!=null&&$twot==null&&$treet==null){
        $sql="SELECT COUNT(*) FROM tt_dm WHERE tt_one_type='$onet'";
        $result=mysqli_query($conn,$sql);
        $count=mysqli_fetch_row($result)[0];
        $sum=$pag*$num=8;
        $index=ceil($count/$num);
        $sql="SELECT * FROM tt_dm WHERE tt_one_type='$onet' ORDER BY tt_click desc LIMIT $start,$num";
        $result=mysqli_query($conn,$sql);
        $all=mysqli_fetch_all($result,1);
        $onput=['result'=>'succ','all'=>$all,'more'=>false,'index'=>$index];
        if($sum>=$count){
            $onput['more']=true;
        }
        echo json_encode($onput);
    }else if($onet==null&&$twot!=null&&$treet==null){
        $sql="SELECT COUNT(*) FROM tt_dm WHERE tt_two_type='$twot'";
        $result=mysqli_query($conn,$sql);
        $count=mysqli_fetch_row($result)[0];
        $sum=$pag*$num=8;
        $index=ceil($count/$num);
        $sql="SELECT * FROM tt_dm WHERE tt_two_type='$twot' ORDER BY tt_click desc LIMIT $start,$num";
        $result=mysqli_query($conn,$sql);
        $all=mysqli_fetch_all($result,1);
        $onput=['result'=>'succ','all'=>$all,'more'=>false,'index'=>$index];
        if($sum>=$count){
            $onput['more']=true;
        }
        echo json_encode($onput);
    }else if($onet==null&&$twot==null&&$treet!=null){
        $sql="SELECT COUNT(*) FROM tt_dm WHERE tt_tree_type='$treet'";
        $result=mysqli_query($conn,$sql);
        $count=mysqli_fetch_row($result)[0];
        $sum=$pag*$num=8;
        $index=ceil($count/$num);
        $sql="SELECT * FROM tt_dm WHERE tt_tree_type='$treet' ORDER BY tt_click desc LIMIT $start,$num";
        $result=mysqli_query($conn,$sql);
        $all=mysqli_fetch_all($result,1);
        $onput=['result'=>'succ','all'=>$all,'more'=>false,'index'=>$index];
        if($sum>=$count){
            $onput['more']=true;
        }
        echo json_encode($onput);
    }else if($onet!=null&&$twot!=null&&$treet==null){
        $sql="SELECT COUNT(*) FROM tt_dm WHERE tt_one_type='$onet' AND tt_two_type='$twot'";
        $result=mysqli_query($conn,$sql);
        $count=mysqli_fetch_row($result)[0];
        $sum=$pag*$num=8;
        $index=ceil($count/$num);
        $sql="SELECT * FROM tt_dm WHERE tt_one_type='$onet' AND tt_two_type='$twot' ORDER BY tt_click desc LIMIT $start,$num";
        $result=mysqli_query($conn,$sql);
        $all=mysqli_fetch_all($result,1);
        $onput=['result'=>'succ','all'=>$all,'more'=>false,'index'=>$index];
        if($sum>=$count){
            $onput['more']=true;
        }
        echo json_encode($onput);
    }else if($onet!=null&&$twot==null&&$treet!=null){
        $sql="SELECT COUNT(*) FROM tt_dm WHERE tt_one_type='$onet' AND tt_tree_type='$treet'";
        $result=mysqli_query($conn,$sql);
        $count=mysqli_fetch_row($result)[0];
        $sum=$pag*$num=8;
        $index=ceil($count/$num);
        $sql="SELECT * FROM tt_dm WHERE tt_one_type='$onet' AND tt_tree_type='$treet' ORDER BY tt_click desc LIMIT $start,$num";
        $result=mysqli_query($conn,$sql);
        $all=mysqli_fetch_all($result,1);
        $onput=['result'=>'succ','all'=>$all,'more'=>false,'index'=>$index];
        if($sum>=$count){
            $onput['more']=true;
        }
        echo json_encode($onput);
    }else if($onet==null&&$twot!=null&&$treet!=null){
        $sql="SELECT COUNT(*) FROM tt_dm WHERE tt_two_type='$twot' AND tt_tree_type='$treet'";
        $result=mysqli_query($conn,$sql);
        $count=mysqli_fetch_row($result)[0];
        $sum=$pag*$num=8;
        $index=ceil($count/$num);
        $sql="SELECT * FROM tt_dm WHERE tt_two_type='$twot' AND tt_tree_type='$treet' ORDER BY tt_click desc LIMIT $start,$num";
        $result=mysqli_query($conn,$sql);
        $all=mysqli_fetch_all($result,1);
        $onput=['result'=>'succ','all'=>$all,'more'=>false,'index'=>$index];
        if($sum>=$count){
            $onput['more']=true;
        }
        echo json_encode($onput);
    }else if($onet!=null&&$twot!=null&&$treet!=null){
        $sql="SELECT COUNT(*) FROM tt_dm WHERE tt_one_type='$onet' AND tt_two_type='$twot' AND tt_tree_type='$treet'";
        $result=mysqli_query($conn,$sql);
        $count=mysqli_fetch_row($result)[0];
        $sum=$pag*$num=8;
        $index=ceil($count/$num);
        $sql="SELECT * FROM tt_dm WHERE tt_one_type='$onet' AND tt_two_type='$twot' AND tt_tree_type='$treet' ORDER BY tt_click desc LIMIT $start,$num";
        $result=mysqli_query($conn,$sql);
        $all=mysqli_fetch_all($result,1);
        $onput=['result'=>'succ','all'=>$all,'more'=>false,'index'=>$index];
        if($sum>=$count){
            $onput['more']=true;
        }
        echo json_encode($onput);
    }