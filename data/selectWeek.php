<?php
    header('Content-Type:application/json;charset=utf-8');
    @$udata=$_REQUEST['udata'] or die('{"result":"udata require","focus":3}');
    @$pag=$_REQUEST['pag'];
    if($pag==null){
        $pag=1;
    }else{
        $pag=intval($pag);
    }
    $onput=[];
    $num=4;
    $start=($pag-1)*4;
    $next=$start+4;
    $sum=$pag*$num*2;
    require('init.php');
    $sql="SELECT COUNT(*) FROM tt_dm WHERE tt_updata_date='$udata'";
    $result=mysqli_query($conn,$sql);
    $count=mysqli_fetch_row($result)[0];
    $sql="SELECT * FROM tt_dm WHERE tt_updata_date='$udata' LIMIT $start,$num";
    $result=mysqli_query($conn,$sql);
    if(!$result){
        echo '{"result":"err","focus":2}';
    }else{
         $ddi=mysqli_fetch_all($result,1);
         $sql="SELECT * FROM tt_dm WHERE tt_updata_date='$udata' LIMIT $next,$num";
         $result=mysqli_query($conn,$sql);
         if(!$result){
             echo '{"result":"err","focus":4}';
         }else{
             $more=mysqli_fetch_all($result,1);
             $onput=['result'=>'succ','data'=>$ddi,'next'=>$more,'more'=>true];
             if($sum>$count){
                $onput['more']=false;
             }
             echo json_encode($onput);
         }

    }
?>