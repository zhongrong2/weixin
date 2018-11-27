// 获取用户
$(function () {
    var user=$(".top-user");
    $.ajax({
        url:"",
        type:"get",
        dataType:"json",
        success:function (data) {
            user.val(data.user);
        }
    })
})
//选择图片
$(document).ready(function () {
    var url = location.href.split('#')[0];
    $.ajax({
        url:"",
        data:"url",
        type:"post",
        dataType:"json",
        success:function (data) {
            var timestamp = data.timestamp;
            var noncestr = data.nonceStr;
            var signature = data.signature;
            //通过config接口注入权限验证配置
            wx.config({
                debug: true,
                appId: data.appId,
                timestamp: timestamp,
                nonceStr: noncestr,
                signature: signature,
                jsApiList: ['chooseImage', 'uploadImage']
            });
        }
    });

    wx.error(function(res){
        console.log(res)
    });

    $(".add").click(function () {
        console.log("调用手机");
        wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
                console.log(localIds);
                // 添加图片
                var addhtml="<div class='addimg1'><img src='' alt='' class='add'></div>"
                var html=$(".addimgs");

                html.append(addhtml);
                var img=$(".addimg1").find("img");
                img.attr("src","localIds");
                // 判断图片个数
                var imgs=$(".addimgs").find("img").length;
                console.log(imgs);
                if(imgs>=3){
                    $(".addimg").css("display","none");
                    $('.addimg').removeAttr('onclick');
                }


                // $("#img").attr("src",localIds);
                // 图片上传微信服务器
                wx.uploadImage({
                    localId: '', // 需要上传的图片的本地ID，由chooseImage接口获得
                    isShowProgressTips: 1, // 默认为1，显示进度提示
                    success: function (res) {
                        var serverId = res.serverId; // 返回图片的服务器端ID
                        $("#serverId").attr("value",serverId);
                    }
                });
            }
        });
    })
})
// 确定上传
$('.btn').click(function () {
    var carnum1=$("#carnum1").val();
    var carnum2=$("#carnum2").val();
    var carnum3=$("#carnum3").val();
    var srcs=$("img").attr("src")
    var imgs=[];
    $(".addimgs").find("img").each(function () {
        imgs.push($(this).attr('src'));
    })
    // console.log(imgs);

    var datas={carnum1,carnum2,carnum3,imgs};
    console.log(datas);
    $.myConfirm({title:'提示框',message:'是否确定上传？',callback:function(){$.myToast('上传成功')}});
    $.ajax({
        url:"",
        type:"post",
        data:"datas",
        dataType:"json",
        success:function () {

            console.log("上传成功");
        }
    })
})

$(function () {
    $(".addimg").click(function () {
        var addhtml="<div class='addimg1'><img src='' alt='' class='add'></div>"
        var html=$(".addimgs");

        html.append(addhtml);
        var img=$(".addimg1").find("img");
        img.attr("src","img/1.jpg");

        var imgs=$(".addimgs").find("img").length;
        console.log(imgs);
        if(imgs>=3){
            $(".addimg").css("display","none");
            $('.addimg').removeAttr('onclick');
        }
    })

})

