$(function () {
    getWechat(location.href)
})

function doMain() {
    LoadingContent()
}
var i = 1,
    j = 1,
    leftTabNum = 2, //左侧选项卡数量
    FirstTabNum = ''; //第一个选项卡列表数量
var controls = document.getElementById("segmentedControls");
var contents = document.getElementById("segmentedControlContents");
var html = [];
function LoadingMyList() {
    $.ajax({
        type: "get",
        url: "http://114.115.207.229:5010/requirement/ownReqList",
        async: false, //同步
        data: {
            'currentPage': 1,
            'pageSize': 1000,
            'token': localStorage.getItem('user_token')
        },
        dataType: "json",
        success: function (jsonData) {
            if (jsonData.flag == true) {
                //console.log(jsonData)
                thirdTabNum = jsonData.data.list.length
                for (j = 0; j < thirdTabNum; j++) {
                    //console.log(jsonData.data.list[j])
                    html += '<ul class="mui-table-view mui-table-view-chevron">' +
                        '<li class="mui-table-view-cell mui-media">' +
                        '<a>' +
                        '<img class="mui-media-object mui-pull-left" src=>' +
                        '<div class="mui-media-body">' + jsonData.data.list[j].helpContent + '(' + jsonData.data.list[j].state + ')' +
                        '<p class="mui-ellipsis">开始：' + jsonData.data.list[j].startHelpTime +'<br>结束：'+ jsonData.data.list[j].overHelpTime + '</p>' +
                        '</div>' +
                        '</a>' +
                        '<span style="position: relative;left: 100%;top:-.30rem;color: #f94a4a;" class="tocancel" data-reqId=' + jsonData.data.list[j].reqId + '>取消</span>' +
                        '<br>';
                        if (jsonData.data.list[j].state=='服务中') {
                        html+='<span style="position: relative;left: 99%;top:-.19rem;color: #f94a4a;" class="complete" data-reqId=' + jsonData.data.list[j].reqId + '>完成需求</span>' 
                        }
                        html+='</li>' +
                        '</ul>';
                }   
                // if (pageSize >= 10) {
                //     $('#content3').empty();
                //     $('#content3').append(html)
                // }
            } else {
                console.log(jsonData.msg)
            }
        }
    });
}

function LoadingContent() {
    for (; i < leftTabNum; i++) {
        switch (i) {
            case 1:
                html.push('<a class="mui-control-item" href="#content' + i + '">我的需求</a>');
                break;
            default:
                break;
        }
    }
    controls.innerHTML = html.join('');
    html = ''; //清空
    for (i = 1; i < leftTabNum; i++) {
        html += '<div id="content' + i + '" class="mui-control-content"><ul class="mui-table-view">';
        switch (i) {
            case 1:
                LoadingMyList()
                break;
            default:
                break;
        }
        html += '</ul></div>';
    }
    $('#segmentedControlContents').append(html);
    html = '' //执行完清空html
    //默认选中第一个
    controls.querySelector('.mui-control-item').classList.add('mui-active');
    contents.querySelector('.mui-control-content').classList.add('mui-active');
    $(".tocancel").on("tap", function () {
        //console.log($(this).attr('data-lenid'))
        let reqId = $(this).attr('data-reqId')
        $.ajax({
            type: "post",
            url: "http://114.115.207.229:5010/requirement/cancel?token=" + localStorage.getItem('user_token'),
            data: {
                'reqId': reqId
            },
            dataType: "json",
            success: function (jsonData) {
                mui.toast(jsonData.msg, {
                    duration: 'long',
                    type: 'div'
                });
                setTimeout(() => {
                    location.href = 'have_requirement.html'
                }, 1000);
            }
        });

    });
     $(".complete").on("tap", function () {
         let reqId = $(this).attr('data-reqId')
         $.ajax({
             type: "post",
             url: "http://114.115.207.229:5010/requirement/complete?token=" + localStorage.getItem('user_token'),
             data: {
                 'reqId': reqId
             },
             dataType: "json",
             success: function (jsonData) {
                 mui.toast(jsonData.msg, {
                     duration: 'long',
                     type: 'div'
                 });
                 setTimeout(() => {
                     location.href = 'have_requirement.html'
                 }, 1000);
             }
         });

     });
}