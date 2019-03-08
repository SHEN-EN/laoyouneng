let reqId = ''
$(function () {
    getWechat(location.href)
})

function doMain() {
    reqId = location.href.split('?')[1];
    LoadingInf(reqId);
    eventToHelp(reqId);
}

function LoadingInf(reqId) {
    $.ajax({
        type: "get",
        url: "http://114.115.207.229:5010/requirement/detail",
        data: {
            'token': localStorage.getItem('user_token'),
            'reqId': reqId
        },
        dataType: "json",
        success: function (jsonData) {
            if (jsonData.flag == true) {
                $('#name').val(jsonData.data.detail.name);
                $('#help').val(jsonData.data.detail.helpContent);
                $('#help_time_start').val(jsonData.data.detail.startHelpTime);
                $('#help_time_over').val(jsonData.data.detail.overHelpTime);
                $('#address').val(jsonData.data.detail.area);
            }
        }
    });
}

function eventToHelp(reqId) {
    $('#to_help').click(function () {
        mui.confirm('是否确认去帮忙', '去帮忙~', ['是', '否'], function (e) {
            if (e.index == 1) {

            } else {
                $('#to_help').attr("disabled", 'true');
                $('#to_help').text('审核中')
                $('.mark').fadeIn();
                setInterval(function  () {
                    $('.mark').fadeOut();
                },40000)
                $.ajax({
                    type: "post",
                    url: "http://114.115.207.229:5010/requirement/accept?token=" + localStorage.getItem('user_token'),
                    data: {
                        'reqId': reqId
                    },
                    dataType: "json",
                    success: function (jsonData) {
                        mui.toast(jsonData.msg, {
                            duration: 'long',
                            type: 'div'
                        })
                        setTimeout(() => {
                            location.href = 'volunteer.html'
                        }, 40000);
                    }
                });
            }
        })

    });
}