function getWechat(pageName) {
    console.log(pageName)
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) != "micromessenger") {
        console.log("Not Open in Wechat");
    } else {
        if (!localStorage.getItem('user_token') || localStorage.getItem('user_token') == undefined) {
            doWechatLogin(pageName) //第一次授权
        } else {
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
                    } else {
                        doWechatLogin(pageName) //缓存原因重新授权
                    }
                }
            })
            if (localStorage.getItem('pass_login') == 1 || localStorage.getItem('user_type')==1) {
                doMain() //进入主逻辑
            } 
        }
    }
}

function doWechatLogin(pageName) {
    if (!getParaValueFromUrl('code')) {
        getWechatCode(pageName)
    } else {
        var theCode = getParaValueFromUrl("code");
        $.ajax({
            type: "get",
            url: "http://114.115.207.229:5010/user/userCode",
            data: {
                'code': theCode
            },
            dataType: "json",
            success: function (jsonData) {
                if (jsonData.flag == true) {
                    localStorage.setItem('new_user', jsonData.data.newUser);
                    localStorage.setItem('user_token', jsonData.data.token);
                    localStorage.setItem('user_type', jsonData.data.userType); //判断是否管理员
                    localStorage.setItem('pass_login', jsonData.data.allowLogin);
                    localStorage.setItem('userOpen_id', jsonData.data.userId);
                    switch (jsonData.data.new_user) {
                        case 0: //新用户
                           location.href = 'index.html'
                            break;
                        case 1: //新用户
                            location.href = 'reg.html'
                            break;
                        case 2: //用户信息不全
                            location.href = 'reg.html'
                            break;
                        default:
                            break;
                    }
                }
            }
        });
    }
}

function getWechatCode(pageName) {
    let onUrl = ''
    onUrl += 'https://open.weixin.qq.com/connect/oauth2/authorize?' +
        'appid=wx71713a547eadfd02' +
        '&redirect_uri=' + encodeURI(pageName) + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    location.href = onUrl
}

function getParaValueFromUrl(theName) {
    var reg = new RegExp("(^|&)" + theName + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}