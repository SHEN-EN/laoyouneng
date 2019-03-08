$(function () {
     getWechat(location.href);
     doMain();
})

function doMain() {
    mui.init();
    eventCheck();
    if (localStorage.getItem('user_type') == 1) {
        location.href = 'index.html'
    }
}

function eventCheck() {
    $('#reg').click(function () {
        if ($('#name').val() == '' ) {
            mui.toast('姓名不能为空', {
                duration: 'long',
                type: 'div'
            })
        } else if ($('#sex').val() == '') {
            mui.toast('性别不能为空', {
                duration: 'long',
                type: 'div'
            })
        } else if ($('#phone').val() == '' || !(/^1[345789]\d{9}$/.test($('#phone').val()))) {
            mui.toast('请检查你的电话', {
                duration: 'long',
                type: 'div'
            })
        } else if ($('#emergencyManPhone').val() == '' || !(/^1[345789]\d{9}$/.test($('#emergencyManPhone').val()))) {
            mui.toast('请检查你的紧急联系人号码', {
                duration: 'long',
                type: 'div'
            })
        } else if ($('#userId').val() == '' || !(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test($('#userId').val()))) {
            mui.toast('请检查你的身份证', {
                duration: 'long',
                type: 'div'
            })
        } else if ($('#Address').val() == '') {
            mui.toast('住址不能为空', {
                duration: 'long',
                type: 'div'
            })
        } else if ($('#Address_community').val() == '') {
            mui.toast('所在社区不能为空', {
                duration: 'long',
                type: 'div'
            })
        } else if ($('#look').is(':checked')==false) {
            mui.toast('请阅读法律条款', {
                duration: 'long',
                type: 'div'
        })
        } else {
            let data = {
                'name': $('#name').val(),
                'sex': $('#sex').val(),
                'phone': $('#phone').val(),
                'idCard': $('#userId').val(),
                'address': $('#Address').val(),
                'userId': localStorage.getItem('userOpen_id'),
                'community': $('#Address_community').val().indexOf('社区') == -1 ? $('#Address_community').val() + '社区' : $('#Address_community').val(),
                'emergencyManPhone': $('#emergencyManPhone').val(),
                'area': $('#address_area').val()
            }
            $.ajax({
                type: "post",
                url: "http://114.115.207.229:5010/user/register",
                data: data,
                dataType: "json",
                success: function (response) {
                    if (response.flag == true) {
                        localStorage.setItem('new_user', response.data.new_user)
                        localStorage.setItem('user_token', response.data.token)
                        mui.toast(response.msg, {
                            duration: 'long',
                            type: 'div'
                        });
                        $('#reg').attr("disabled", 'true');
                        $('#reg').text('审核中')
                    }
                }
            });
            localStorageRes()
        }
    });
}

function localStorageRes() {
    $.ajax({
        type: "get",
        url: "http://114.115.207.229:5010/user/userInfo",
        data: {
            'token': localStorage.getItem('user_token')
        },
        dataType: "json",
        success: function (jsonData) {
            if (jsonData.flag == true) {
                localStorage.setItem('new_user', jsonData.data.newUser);
                localStorage.setItem('user_type', jsonData.data.userType);
                localStorage.setItem('pass_login', jsonData.data.allowLogin);
            }
        }
    })
}