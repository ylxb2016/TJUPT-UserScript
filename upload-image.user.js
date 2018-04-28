// ==UserScript==
// @name         Upload image to sm.ms
// @namespace    http://tampermonkey.net/
// @version      1.7.20180428
// @description  上传图片到图床（附件服务无法继续使用的解决办法xD
// @author       杯杯杯杯具@TJUPT
// @match        https://tjupt.org/*
// @match        https://www.tjupt.org/*
// @exclude      https://*tjupt.org/invite.php*
// @exclude      https://*tjupt.org/userdetails.php*
// @exclude      https://*tjupt.org/usercp.php*
// @exclude      https://*tjupt.org/addcss.php*
// @exclude      https://*tjupt.org/settings.php*
// @updateURL    https://github.com/tongyifan/TJUPT-UserScript/raw/master/upload-image.user.js
// ==/UserScript==

(function() {
    'use strict';
    var API_URL = "https://sm.ms/api/upload";
    // 判断是否有BBCode编辑器，并添加上传图片行
    if($("textarea").length > 0 & $("textarea#quickreplytext").length == 0){
        $("textarea").parent().parent().before("<tr><td align=\"left\" colspan=\"2\"><input type=\"file\" class=\"file\" id=\"uimg\" name=\"img\"><input id=\"uploadimg\" type=\"button\" class=\"btn\" value=\"上传图片\"></td></tr>");
        // 点击事件
        $("#uploadimg").click(function (){
            // 判断是否为空
            if($('#uimg').val() == ""){
                alert("请选择图片!");
            }
            //上传
            var formData = new FormData();
            formData.append('smfile', $('#uimg')[0].files[0]);
            $.ajax({
                url : API_URL,
                type : 'POST',
                cache : false,
                data : formData,
                processData : false,
                contentType : false,
                success: function(data){
                    if(data.code === "success"){
                        //插入到textarea
                        var imgBBCode = "[img]" + data.data.url + "[/img]";
                        var txtArea = $("textarea")[0];
                        var content = txtArea.value;
                        var start = txtArea.selectionStart;
                        txtArea.value = content.substring(0, txtArea.selectionStart) + imgBBCode + content.substring(txtArea.selectionEnd, content.length);
                        var position = start + imgBBCode.length;
                        $("textarea").focus();
                        txtArea.setSelectionRange(position, position);
                        $("#uimg").val("");
                    }else{
                        alert(data.msg);
                    }
                },
                error: function(){
                    alert("上传失败！");
                }
            });
        });
    }
    $("#qr").click(function(){
        $("#uimg").val("");
    });
})();
