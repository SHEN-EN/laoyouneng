$(function () {
    getWechat(location.href)
})

function doMain() {
    if (localStorage.getItem('new_user') != 0) {
        location.href = 'reg.html'
    } else {
        if (localStorage.getItem('user_type') == 1) {
            LoadingContent()
            return
        } else {
            location.href = 'http://laoyouneng.top'
        }
    }
}
// mui.init({
//     swipeBack: true, //启用右滑关闭功能
//     pullRefresh: {
//         container: '#content1', //待刷新区域标识
//         up: {
//             height: 50, //
//             auto: false, //自动上拉加载一次
//             contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
//             contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
//             callback: pullUpLoadingWaitList //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
//         }
//     }
// });
// function pullUpLoadingWaitList() {
//     LoadingWaitHelpList(page += 10)
// }
var i = 1,
    j = 1,
    leftTabNum = 4, //左侧选项卡数量
    FirstTabNum = '', //第一个选项卡列表数量
    secondTabNum = '' //第二个选项卡列表数量
    //page = 10; //默认刷新数据的变量
var controls = document.getElementById("segmentedControls");
var contents = document.getElementById("segmentedControlContents");
var html = [];

function loadingWaitHelpList() {
    $.ajax({
        type: "get",
        url: "http://114.115.207.229:5010/requirement/reviewList",
        async: false, //同步防止拿不到html变量
        data: {
            'currentPage': 1,
            'pageSize': 1000,
            'token': localStorage.getItem('user_token')
        },
        dataType: "json",
        success: function (jsonData) {
            console.log(jsonData);
            if (jsonData.flag == true) {
                FirstTabNum = jsonData.data.list.length
                for (j = 0; j < FirstTabNum; j++) {
                    //console.log(jsonData.data.list[j])
                    html += '<ul class="mui-table-view mui-table-view-chevron">' +
                        '<li class="mui-table-view-cell mui-media" data-repId=' + jsonData.data.list[j].reqId + '>' +
                        '<a class="mui-navigate-right">' +
                        '<img class="mui-media-object mui-pull-left" src=' + jsonData.data.list[j].avater + '>' +
                        '<div class="mui-media-body">' + jsonData.data.list[j].name +
                        '<p class="mui-ellipsis">' + jsonData.data.list[j].helpContent + '</p>' +
                        '</div>' +
                        '</a>' +
                        '</li>' +
                        '</ul>';
                }
                // if (pageSize >= 10) { //如果下拉刷新
                //     $('#content1').empty();
                //     $('#content1').append(html)
                // }
            } else {
                console.log(jsonData.msg)
            }
        }
    });
}

function LoadingWaitPassList() {
    $.ajax({
        type: "get",
        url: "http://114.115.207.229:5010/requirement/waitPassList",
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
                        '<img class="mui-media-object mui-pull-left" src=' + jsonData.data.list[j].avater + '>' +
                        '<div class="mui-media-body">' + jsonData.data.list[j].helpContent +
                        '<p class="mui-ellipsis">' + jsonData.data.list[j].name + jsonData.data.list[j].phone + '</p>' +
                        '</div>' +
                        '</a>' +
                        '<span style="position: relative;left: 107%;top:-.30rem;color: #f94a4a;" class="toPass" data-reqId=' + jsonData.data.list[j].reqId + '>通过</span>' +
                        '<br>' +
                        '<span style="position: relative;left: 106%;top:-.19rem;color: #f94a4a;" class="not_toPass" data-reqId=' + jsonData.data.list[j].reqId + '>不通过</span>' +
                        '</li>' +
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

function regList() {
    $.ajax({
        type: "get",
        url: "http://114.115.207.229:5010/user/waitReviewUserList",
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
                        '<img class="mui-media-object mui-pull-left" src=' + jsonData.data.list[j].avater + '>' +
                        '<div class="mui-media-body" style="font-size: .12rem;">' + jsonData.data.list[j].idCard +
                        '<p class="mui-ellipsis">' + jsonData.data.list[j].name + jsonData.data.list[j].phone + '</p>' +
                        '</div>' +
                        '</a>' +
                        '<span style="position: relative;left: 107%;top:-.30rem;color: #f94a4a;" class="toregPass"  data-userId=' + jsonData.data.list[j].userId + '>通过</span>' +
                        '<br>' +
                        '<span style="position: relative;left: 106%;top:-.19rem;color: #f94a4a;" class="not_toregPass" data-userId=' + jsonData.data.list[j].userId + '>不通过</span>' +
                        '</li>' +
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
                html.push('<a class="mui-control-item" href="#content' + i + '">时长待审核</a>');
                break;
            case 2:
                html.push('<a class="mui-control-item" href="#content' + i + '">需求待审核</a>');
                break;
            case 3:
                html.push('<a class="mui-control-item" href="#content' + i + '">用户待审核</a>');
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
                loadingWaitHelpList()
                break;
            case 2:
                LoadingWaitPassList()
                break;
            case 3:
                regList()
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

    $("#content1").children('.mui-table-view').on("tap", "ul", function () {
        // console.log($(this).children().attr('data-repId'))
        window.location.href = 'http://laoyouneng.top/examination_detailed.html?' + $(this).children().attr('data-repId'); //下拉刷新和点击冲突解决方法
    });
    //需求通过
    $(".toPass").on("tap", function () {
        //console.log($(this).attr('data-lenid'))
        let reqId = $(this).attr('data-reqId')
        $.ajax({
            type: "post",
            url: "http://114.115.207.229:5010/requirement/passReq?token=" + localStorage.getItem('user_token'),
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
                    location.href = 'admin.html'
                }, 1000);
            }
        });

    });
    //需求不通过
    $(".not_toPass").on("tap", function () {
        //console.log($(this).attr('data-lenid'))
        let reqId = $(this).attr('data-reqId')
        $.ajax({
            type: "post",
            url: "http://114.115.207.229:5010/requirement/reqRefuse?token=" + localStorage.getItem('user_token'),
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
                    location.href = 'admin.html'
                }, 1000);
            }
        });

    });
    //用户注册通过
    $(".toregPass").on("tap", function () {
        let userId = $(this).attr('data-userId')
        $.ajax({
            type: "post",
            url: "http://114.115.207.229:5010/user/userReview?token=" + localStorage.getItem('user_token'),
            data: {
                'userId': userId,
                'status': '1'
            },
            dataType: "json",
            success: function (jsonData) {
                mui.toast(jsonData.msg, {
                    duration: 'long',
                    type: 'div'
                });
                setTimeout(() => {
                    location.href = 'admin.html'
                }, 1000);
            }
        });

    });
    //用户注册不通过
    $(".not_toregPass").on("tap", function () {
        let userId = $(this).attr('data-userId')
        mui.prompt('请输入拒绝理由', '', '理由', ['确定', '取消'], function (e) {
            if (e.index == 0) {
                $.ajax({
                    type: "post",
                    url: "http://114.115.207.229:5010/user/userReview?token=" + localStorage.getItem('user_token'),
                    data: {
                        'userId': userId,
                        'status': '-1',
                        'reason':e.value

                    },
                    dataType: "json",
                    success: function (jsonData) {
                        mui.toast(jsonData.msg, {
                            duration: 'long',
                            type: 'div'
                        });
                        setTimeout(() => {
                            location.href = 'admin.html'
                        }, 1000);
                    }
                });
            }
        })
    });
}