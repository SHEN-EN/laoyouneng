let reqId = ''
$(function () {
    getWechat(location.href)
})
function doMain() {
     reqId = location.href.split('?')[1];
     loadingExamination(reqId);
     eventHaveExamination(reqId);
}
function loadingExamination(reqId) {
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
                $('#phone').val(jsonData.data.detail.phone);
                $('#help').val(jsonData.data.detail.helpContent);
                $('#help_time_start').val(jsonData.data.detail.startHelpTime);
                $('#help_time_over').val(jsonData.data.detail.overHelpTime);
                $('#address').val(jsonData.data.detail.address);
                $('#all_help_time').val(jsonData.data.detail.timeLength + 'h');
            }
        }
    });
}

function eventHaveExamination(reqId) {
    $('#have_examination').click(function () {
        if ($('#real_time').val() == '') {
            mui.toast('请填写实际时长', {
                duration: 'long',
                type: 'div'
            })
        } else {
            $.ajax({
                type: "post",
                url: "http://114.115.207.229:5010/requirement/reviewed?token=" + localStorage.getItem('user_token'),
                data: {
                    'timeLen': parseFloat($('#real_time').val()),
                    'reqId': reqId
                },
                dataType: "json",
                success: function (jsonData) {
                    if (jsonData.flag == true) {
                          mui.toast(jsonData.msg, {
                              duration: 'long',
                              type: 'div'
                          })
                          setTimeout(() => {
                              location.href = 'admin.html'
                          }, 1000);
                    }
                }
            });
        }
    });
}