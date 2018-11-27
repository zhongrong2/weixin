$(function () {
    $.ajax({
        url:"data.json",
        method:"post",
        dataType:"json",
        success:function (data) {
            console.log(data);
            if(data.phone){

            }
            else{
                $("#top").css("display","none");
                console.log("该用户不存在");
            }
        },
        error:function () {
            console.log("数据获取失败");
        }
    })
})
$(".btn").click(function () {
    var phone=$("#phone").val();
    var birthday=$("#birthday").val();
    var carnum1=$("#carnum1").val();
    var carnum2=$("#carnum2").val();
    var carnum3=$("#carnum3").val();

    var datas={phone,birthday,carnum1,carnum2,carnum3};
    console.log(datas);
    $.ajax({
        url:"",
        method:"post",
        dataType:"json",
        data:"datas",
        success:function (data) {
            console.log("修改成功");
        }
    })
})