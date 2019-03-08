$(function () {
    getWechat(location.href)
});

function doMain() {
    if (localStorage.getItem('new_user') != 0) {
        location.href = 'reg.html'
    } else {
        Loadingcontent();
        chart();
    }
}
mui.init({
    swipeBack: true, //启用右滑关闭功能
})
var i = 1,
    j = 1,
    leftTabNum = 5, //左侧选项卡数量
    FirstTabNum = '', //第一个选项卡列表数量
    secondTabNum = 1, //第二个选项卡列表数量
    thirdTabNum = '', //第三个选项卡列表数量
    page = 10, //默认刷新数据的变量
    date = [], //统计图日期x坐标
    times = []; //统计图时长y坐标
var controls = document.getElementById("segmentedControls");
var contents = document.getElementById("segmentedControlContents");
var html = [];

function LoadingHelpList() {
    $.ajax({
        type: "get",
        url: "http://114.115.207.229:5010/requirement/list",
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
                if (FirstTabNum==0) {
                    html+='<img src="images/req.png" style="width:100%">'
                } else {
                    for (j = 0; j < FirstTabNum; j++) {
                        //console.log(jsonData.data.list[j])
                        html += '<ul class="mui-table-view mui-table-view-chevron">' +
                            '<li class="mui-table-view-cell mui-media" data-repId=' + jsonData.data.list[j].reqId + '>' +
                            '<a class="mui-navigate-right">' +
                            '<img class="mui-media-object mui-pull-left" src=' + jsonData.data.list[j].avater + '>' +
                            '<div class="mui-media-body">' + jsonData.data.list[j].name +
                            '<p class="mui-ellipsis">' + jsonData.data.list[j].area + '</p>' +
                            '</div>' +
                            '</a>' +
                            '</li>' +
                            '</ul>';
                    }
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

function LoadingHelpTime() {
    $.ajax({
        type: "get",
        url: "http://114.115.207.229:5010/timeLength/waitDonateList",
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
                        '<p class="mui-ellipsis">服务时长：' + jsonData.data.list[j].timeLength + 'h</p>' +
                        '</div>' +
                        '</a>' +
                        '<span style="position: relative;left: 114%;top:-.19rem;color: #f94a4a;" class="toDonation" data-lenId=' + jsonData.data.list[j].lenId + ' data-name=' + jsonData.data.list[j].name + ' data-timeLength=' + jsonData.data.list[j].timeLength + '>捐赠</span>' +
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

function loveTime() {
    times = [] //防止多次点击push
    date = [] //防止多次点击push
    $('#content1').parent().next().remove()
    $.ajax({
        type: "get",
        url: "http://114.115.207.229:5010/timeLength/loveChart",
        async: false, //同步
        data: {
            'token': localStorage.getItem('user_token')
        },
        dataType: "json",
        success: function (jsonData) {
            if (jsonData.flag == true) {
                let listLength = jsonData.data.list.length
                let changeDate = [];
                for (j = 0; j < secondTabNum; j++) {
                    html += '<div class="user-img"><img src="images/logo.jpg"></div>' +
                        '<div class="mui-content">' +
                        '<div class="mui-content-padded" style="margin-top:1.8rem">' +
                        '<h5>爱心时长</h5>' +
                        '<div class="chart" id="barChart"></div>' +
                        '</div>';
                    for (let i = 0; i < listLength; i++) {
                        changeDate.push(jsonData.data.list[i].x)
                        date.push(new Date(changeDate[i]).getMonth() + 1 + '-' + new Date(changeDate[i]).getDate())
                        times.push(jsonData.data.list[i].y)
                    }
                }
            } else {
                console.log(jsonData.msg)
            }
        }
    });
}

function getUserInfo() {
    $.ajax({
        type: "get",
        url: "http://114.115.207.229:5010/user/userInfo",
        async: false,
        data: {
            'token': localStorage.getItem('user_token')
        },
        dataType: "json",
        success: function (json) {
            if (json.flag == true) {
                html += '<form id="login-form" class="mui-input-group">' +
                    '<div class="mui-input-row">' +
                    '<label>姓名</label>' +
                    '<input id="name" type="text" class="mui-input-clear mui-input" placeholder=' + json.data.name + ' disabled = "disabled">' +
                    '</div>' +
                    '<div class="mui-input-row">' +
                    '<label>电话</label>' +
                    '<input id="phone" type="text" class="mui-input-clear mui-input" value=' + json.data.phone + ' >' +
                    '</div>' +
                    '<div class="mui-input-row">' +
                    '<label>社区</label>' +
                    '<input id="community" type="text" class="mui-input-clear mui-input" value=' + json.data.community + ' > ' +
                    '</div>' +
                     '<div class="mui-input-row">' +
                     '<label>小区</label>' +
                     '<input id="area" type="text" class="mui-input-clear mui-input" value=' + json.data.area + ' > ' +
                    '</div>' +
                    '<div class="mui-input-row">' +
                    '<label>地址</label>' +
                    '<input id="address" type="text" class="mui-input-clear mui-input" placeholder=' + json.data.address + '  disabled = "disabled">' +
                    '</div>' +
                    '</form>' +
                    '<div class="mui-content-padded">' +
                    '<button id = "useinf" class = "mui-btn mui-btn-block mui-btn-primary" > 修改 </button>' +
                    '</div>'

            } else {
                console.log(jsonData.msg)
            }
        }
    });
}

function Loadingcontent() {
    for (; i < leftTabNum; i++) {
        switch (i) {
            case 1:
                html.push('<a class="mui-control-item" href="#content' + i + '">爱心时长</a>');
                break;
            case 2:
                html.push('<a class="mui-control-item" href="#content' + i + '">帮助他人</a>');
                break;
            case 3:
                html.push('<a class="mui-control-item" href="#content' + i + '">服务时长</a>');
                break;
            case 4:
                html.push('<a class="mui-control-item" href="#content' + i + '">我的信息</a>');
                break;
            default:
                break;
        }
    }
    controls.innerHTML = html.join('');
    html = ''; //清空
    for (i = 1; i < leftTabNum; i++) {
        html += '<div id="content' + i + '" class="mui-control-content" ><ul class="mui-table-view">';
        switch (i) {
            case 1:
                loveTime();
                break;
            case 2:
                LoadingHelpList()
                break;
            case 3:
                LoadingHelpTime(page)
                break;
            case 4:
                getUserInfo()
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
    $("#content2").children('.mui-table-view').on("tap", "ul", function () {
        // console.log($(this).children().attr('data-repId'))
        location.href = 'orderMan_detailed.html?' + $(this).children().attr('data-repId'); //下拉刷新和点击冲突解决方法
    });
    $("#segmentedControls").on("tap", 'a', function () {
        if (($(this).attr('href')) == '#content2') {
            chart()
        }
    });
    let flag = false //防止重复点击
    /***********捐赠时长 **************/
    $(".toDonation").on("tap", function () {
        flag = true;
        if (flag) {
            // console.log($(this).attr('data-lenid'))
            $('#mark').empty();
            let onHtml = ''
            let lenid = $(this).attr('data-lenid')
            var that = $(this);
            $.ajax({
                type: "post",
                url: "http://114.115.207.229:5010/timeLength/donate?token=" + localStorage.getItem('user_token'),
                data: {
                    'lenId': lenid
                },
                dataType: "json",
                success: function (jsonData) {
                    mui.toast(jsonData.msg, {
                        duration: 'long',
                        type: 'div'
                    });
                    onHtml += '<p>敬爱的' + that.attr('data-name') + '义工朋友：</p>'
                    onHtml += '<p>感谢您用您宝贵的时间帮助了他人感谢您用您宝贵的时间帮助了他人。彼此之前虽然不是亲人、不是朋友但是在他人有困难时,您伸出有援助之手， 解一时之困难,您在服务对象的眼里是好人,在他的心里是已是亲人。</p>'
                    onHtml += '<p>当有一天您也有需要时,您也有老的一天,老友能社区互助平台依然有年轻人在帮扶着您,请相信这点。 再次感谢您的付出,为本平台再次累加了' + that.attr('data-timelength') + '小时的服务时长。</p>'
                    onHtml += '<p>您的付出给生命以岁月,给岁月以生命,我们共筑一个和谐又美好的互助社区。</p>'
                    $('#mark').append(onHtml)
                    $('#mark').fadeIn()
                    setTimeout(() => {
                        $('#mark').fadeOut();
                        location.href = 'volunteer.html'
                    }, 10000);
                }
            });
            flag = false
        }

    });
    /***********修改信息********/
    $("#useinf").on("tap", function () {
        var that = $(this)
        $.ajax({
            type: "post",
            url: "http://114.115.207.229:5010/user/updateInfo?token=" + localStorage.getItem('user_token'),
            data: {
                'phone': $('#phone').val(),
                'community': $('#community').val().indexOf('社区') == -1 ? $('#community').val() + '社区' : $('#community').val(),
                'area': $('#area').val()
            },
            dataType: "json",
            success: function (jsonData) {
                mui.toast(jsonData.msg, {
                    duration: 'long',
                    type: 'div'
                });
            }
        });
    });
}

function chart() {
    var getOption = function (bar) {
        var chartOption = {
            legend: { //标题
                data: ['爱心时长(分)']
            },
            grid: {
                x: 30,
                x2: 1,
                y: 30,
                y2: 25
            },
            toolbox: { //工具箱
                show: false,
                feature: {
                    mark: {
                        show: true
                    },
                    dataView: {
                        show: true,
                        readOnly: false
                    },
                    magicType: {
                        show: true,
                        type: ['bar']
                    },
                    restore: {
                        show: true
                    },
                    saveAsImage: {
                        show: true
                    }
                }
            },
            calculable: false,
            //横纵轴刻度
            xAxis: {
                type: 'category',
                data: date
            },
            yAxis: {
                type: 'value',
                splitArea: {
                    show: true
                }
            },
            //显示数据 此处数据名的名称还要与标题的名称相对应，否则无法显示
            series: [{
                name: '爱心时长(分)',
                type: bar,
                data: times
            }]
        };
        return chartOption;
    };
    var byId = function (id) {
        return document.getElementById(id);
    };
    var barChart = echarts.init(byId('barChart'));
    barChart.setOption(getOption('bar'));
}