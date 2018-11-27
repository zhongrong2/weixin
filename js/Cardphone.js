$(".btn").click(function () {
    var phone = $("#phone").val();

    // 判断不为空
    if(phone!=""){
        // 判断手机号格式
        if(/^1[34578]\d{9}$/.test(phone)){
            // 获取后台数据
            $.ajax({
                url:"data.json",
                method:"get",
                data:"phone",
                dataType:"json",
                success:function (data) {
                    if(phone==data.phone){

                        window.location.href='Cardlist.html';
                    }else{
                        $.myToast("该手机号不存在");

                    }
                }
            })
        }else{
            $.myToast("请输入正确的手机号");
        }
    }else{
        $.myToast("请输入手机号");
    }

    // 提交数据
    $.ajax({
        url:"",
        method:"post",
        data:"phone",
        dataType:"json",
        success:function () {

        }
    })
})