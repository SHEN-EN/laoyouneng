/*************排行榜刷新***********/
$(function () {
    let onHtml = ''
    getWechat(location.href)
    if (localStorage.getItem('pass_login') != 1) {
        mui.toast('您的注册请求还未审核通过', {
            duration: 'long',
            type: 'div'
        })
        location.href = 'reg.html'
    }
})

function doMain() {
    LoveTop()
}

function LoveTop() {
    let onHtml = ''
    $('.main_ranking').empty();
    $.ajax({
        type: "get",
        url: "http://114.115.207.229:5010/timeLength/loveTop",
        data: {
            'token': localStorage.getItem('user_token')
        },
        dataType: "json",
        success: function (jsonData) {
            // console.log(jsonData)
            if (jsonData.data.topData.length == 0) {
                onHtml += '<div><img src="images/haveNo.png" style="width:100%;height: 100%;"></div>'
            } else {
                $.each(jsonData.data.topData, function (index, value) {
                    onHtml += '<ul class="mui-table-view"> <li class = "mui-table-view-cell" >' +
                        ' <img src = ' + value.avater + ' alt = "" >' +
                        '<span style="position: absolute;top:38% ;margin-left:.2rem;">' + value.name + '(工作时长：' + value.loveLength + 'min)' + '</span>' +
                        '<span class = "mui-badge mui-badge-primary">' + value.order + '</span>' +
                        '</li>'
                });
            }
            $('.main_ranking').append(onHtml);
        }
    });
}