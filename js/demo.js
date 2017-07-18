var bot_endpoint = 'https://robot-service.centaurstech.com/api/chat'

function ask_question(msg, callback) {
    show_msg(msg)

    var fd = new FormData()
    fd.append('appkey', appkey)
    var now = Date.now()
    fd.append('timestamp', now)
    fd.append('uid', uid)
    var hash = md5(appsecret + uid + now)
    fd.append('verify', hash)
    fd.append('msg', msg)
    fd.append('nickname', nickname)

    $.ajax({
        url: bot_endpoint,
        type: "POST",
        data: fd,
        processData: false,
        contentType: false,
        success: function(data, status) {
            if (data.msg != "") {
                reply = data.msg.replaceAll('\n', '<br />')
                $('<li class="qw-message">\
						  <div class="qw-avator"></div>\
						  <div class="qw-message-content">' + reply + '</div>\
				  </li>').appendTo(".chat-list");
                $(".chat-list").scrollTop($(".chat-list")[0].scrollHeight);

                if (typeof callback == "function") {
                    callback()
                }
            }
        },
        error: function(xhr, ajaxOptions, thrownError) {
            console.log("Status: " + xhr.status)
            console.log(thrownError)

        },
    })
}

function show_msg(msg) {
    $('<li class="me-message">\
				<span class="me-message-content">' + msg + '</span>\
			  </li>').appendTo(".chat-list");

    $(".chat-list").scrollTop($(".chat-list")[0].scrollHeight);
}

$(".chat-input").keydown(function(e) {
    if (e.keyCode == 13) {
        var question = $(".chat-input").val();
        $(".chat-input").val("");


        $('<li class="me-message">\
        <span class="me-message-content">' + question + '</span>\
        </li>').appendTo(".chat-list");

        $(".chat-list").scrollTop($(".chat-list")[0].scrollHeight);

        ask_question(question)
    }
});

$(document).ready(function() {
    var search = location.search
    if (search) {
        appkey = search.substring(search.lastIndexOf("=") + 1)
        $('#title').html('<h1>知识库考核 ' + appkey + '</h1>')
    }
    ask_question('HELLO')
})