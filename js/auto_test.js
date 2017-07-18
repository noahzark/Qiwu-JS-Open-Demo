var test_cases = [
    '我的充值失败了',
    '充值',
    '获取星星',
    '我的钻石没有了',
    '游戏卡顿',
    '闪退'
]

var ask_counter = 0

function auto_ask() {
    if (ask_counter < test_cases.length) {
        setTimeout(function() {
            ask_question(test_cases[ask_counter++], auto_ask)
        }, 1000)
    }
}

function send_hello() {
    $('#app').text(appkey)
    ask_question('HELLO', auto_ask)
}