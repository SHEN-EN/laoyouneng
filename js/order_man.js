$(function () {
    getWechat(location.href)
})
function doMain() {
    if (localStorage.getItem('new_user') != 0) {
        location.href = 'reg.html'
    } else {
        if (localStorage.getItem('user_type')==1) {
            $('#admin').css('display',' -webkit-inline-box')
        }
        mui.init();
        eventSelect();
        loadingInf()
    }
}
function loadingInf() {
    $.ajax({
        type: "get",
        url: "http://114.115.207.229:5010/user/userInfo",
         data: {
             'token': localStorage.getItem('user_token')
         },
        dataType: "json",
        success: function (jsonData) {
            
            $('#name').val(jsonData.data.name);
            $('#phone').val(jsonData.data.phone);
            $('#address_commodity').val(jsonData.data.community);
            $('#address').val(jsonData.data.address);
            $('#address_area').val(jsonData.data.area)
        }
    });
}
function eventSelect() {
    let help_time_start = '', //开始时间
        help_time_over = '', //结束时间
        selectHelp_content = ''; //服务值
    $('#help').click(function (e) {
        var picker = new mui.PopPicker();
        picker.setData([{
                value: "first",
                text: "陪伴聊天"
            }, {
                value: "second",
                text: "户外散心"
            }, {
                value: "third",
                text: "清洁卫生"
            }, {
                value: "fourth",
                text: "搬运货物"
            }, {
                value: "fifth",
                text: "采购物资"
            },
            {
                value: "six",
                text: "修理电器"
            },
            {
                value: "seven",
                text: "其他"
            }
        ])
        picker.pickers[0].setSelectedValue('fourth', 2000);
        picker.show(function (SelectedItem) {
            selectHelp_content = SelectedItem[0].value //选择服务值
            // console.log(selectHelp_content)
            $('#help').val(SelectedItem[0].text)
        })

    });
    $('#help_time_start').click(function (e) {
        var dtpicker = new mui.DtPicker({
            "type": "datetime",
        })
        dtpicker.show(function (SelectedItem) {
            $('#help_time_start').val(SelectedItem.y.text + '年' + SelectedItem.m.text + '月' + SelectedItem.d.text + '日' + SelectedItem.h.text + '：' + SelectedItem.i.text) //
            localStorage.setItem('help_time_start', SelectedItem.text)
            help_time_start = Date.parse(SelectedItem.text) //开始时间
        })
    });
    $('#help_time_over').click(function (e) {
        var dtpicker = new mui.DtPicker({
            "type": "datetime",
        })
        dtpicker.show(function (SelectedItem) {
            $('#help_time_over').val(SelectedItem.y.text + '年' + SelectedItem.m.text + '月' + SelectedItem.d.text + '日' + SelectedItem.h.text + '：' + SelectedItem.i.text) //SelectedItem.y.text+'年'+SelectedItem.m.text+'月'+SelectedItem.d.text+'日'+
            localStorage.setItem('help_time_over', SelectedItem.text)
            help_time_over = Date.parse(SelectedItem.text) //结束时间
        })
    });
    $('#demand').click(function () {
        if ($('#name').val() == '') {
            mui.toast('姓名不能为空', {
                duration: 'long',
                type: 'div'
            })
        } else if ($('#phone').val() == '' || !(/^1[34578]\d{9}$/.test($('#phone').val()))) {
            mui.toast('请检查你的电话号码', {
                duration: 'long',
                type: 'div'
            })
        } else if ($('#help').val() == '') {
            mui.toast('求助内容不能为空', {
                duration: 'long',
                type: 'div'
            })
        } else if ($('#help_time_start').val() == '' || $('#help_time_over').val() == '') {
            mui.toast('求助时间段不能为空', {
                duration: 'long',
                type: 'div'
            })
        } else if ($('#address').val() == '') {
            mui.toast('住址不能为空', {
                duration: 'long',
                type: 'div'
            })
        } else if ($('#address_commodity').val() == '') {
            mui.toast('所在社区不能为空', {
                duration: 'long',
                type: 'div'
            })
        } else if ($('#address_area').val() == '') {
            mui.toast('所在小区不能为空', {
                duration: 'long',
                type: 'div'
            })
        }else {
            helpTime(selectHelp_content, help_time_start, help_time_over)
            if (helpTime(selectHelp_content, help_time_start, help_time_over) == false) {
                return
            } else {
                $('#demand').attr("disabled", 'true');
                $('.mark').fadeIn();
                setInterval(function(){
                    $('.mark').fadeOut();
                },40000)
                let data = {
                    'name': $('#name').val(),
                    'phone': $('#phone').val(),
                    'help_content': $('#help').val(),
                    'startHelp_time': localStorage.getItem('help_time_start'),
                    'overHelp_time': localStorage.getItem('help_time_over'),
                    'address': $('#address').val(),
                    'wait': $('#wait').is(':checked') == true ? 1 : 0,
                    'commodity': $('#address_commodity').val().indexOf('社区') == -1 ? $('#address_commodity').val() + '社区' : $('#address_commodity').val(),
                    'note': $('#help_note').val(),
                    'area': $('#address_area').val()
                }
                $.ajax({
                    type: "post",
                    url: "http://114.115.207.229:5010/requirement/create?token=" + localStorage.getItem('user_token'),
                    data: data,
                    dataType: "json",
                    success: function (jsonData) {
                        if (jsonData.flag == true) {
                            mui.toast(jsonData.msg, {
                                duration: 'long',
                                type: 'div'
                            });
                            setTimeout(() => {
                                location.href = 'http://laoyouneng.top/have_requirement.html'
                            }, 40000);
                        } else {
                            console.log(jsonData.msg)
                        }
                    }
                });
            }
        }
    });
}

function helpTime(selectHelp_content, help_time_start, help_time_over) { //帮助内容 开始时间-结束时间
    switch (selectHelp_content) {
        case 'first':
            if (help_time_over - help_time_start < 3600000 || help_time_over - help_time_start > 10800000 || help_time_over - help_time_start <= 0) {
                mui.toast('请选择正确时间：陪聊最少1小时，最多3小时噢~', {
                    duration: 'long',
                    type: 'div'
                })
                return false;
            }
            break;
        case 'second':
            if (help_time_over - help_time_start < 3600000 || help_time_over - help_time_start > 10800000 || help_time_over - help_time_start <= 0) {
                mui.toast('请选择正确时间：户外散心最少1小时，最多3小时噢~', {
                    duration: 'long',
                    type: 'div'
                })
                return false;
            }
            break;
        case 'third':
            if (help_time_over - help_time_start > 10800000 || help_time_over - help_time_start <= 0 || help_time_over - help_time_start<1800000) {
                mui.toast('请选择正确时间：清洁卫生最少半小时最多3小时噢~', {
                    duration: 'long',
                    type: 'div'
                })
                return false;
            }
            break;
        case 'fourth':
            if (help_time_over - help_time_start > 10800000 || help_time_over - help_time_start <= 0 || help_time_over - help_time_start < 1800000) {
                mui.toast('请选择正确时间：搬运货物最少半小时最多3小时噢~', {
                    duration: 'long',
                    type: 'div'
                })
                return false;
            }
            break;
        case 'fifth':
            if (help_time_over - help_time_start > 10800000 || help_time_over - help_time_start <= 0 || help_time_over - help_time_start < 1800000) {
                mui.toast('请选择正确时间：采购物资最少半小时最多3小时噢~', {
                    duration: 'long',
                    type: 'div'
                })
                return false;
            }
            break;
        case 'six':
            if (help_time_over - help_time_start > 10800000 || help_time_over - help_time_start <= 0 || help_time_over - help_time_start < 1800000) {
                mui.toast('请选择正确时间：修理电器最少半小时最多3小时噢~', {
                    duration: 'long',
                    type: 'div'
                })
                return false;
            }
            break;
        case 'seven':
            if (help_time_over - help_time_start <= 1800000 || help_time_over - help_time_start > 10800000 || help_time_over - help_time_start <= 0) {
                mui.toast('请选择正确时间：其他服务最少半小时，最多3小时噢~', {
                    duration: 'long',
                    type: 'div'
                })
                return false;
            }
            break;
        default:
            return true
            break;
    }

}