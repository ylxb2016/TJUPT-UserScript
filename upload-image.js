// ==UserScript==
// @name         Upload image to sm.ms
// @namespace    http://tampermonkey.net/
// @version      1.0.20180409
// @description  种子详情页中加一行上传图片到图床（附件服务无法继续使用的解决办法xD
// @author       杯杯杯杯具@TJUPT
// @match        https://tjupt.org/upload.php
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    var API_URL = "https://sm.ms/api/upload";
    // 添加上传图片行
    $("#compose > table > tbody > tr:eq(6) > td:eq(1) > table > tbody > tr:eq(0)").after("<tr><td align=\"left\" colspan=\"2\"><input type=\"file\" class=\"file\" id=\"uimg\" name=\"img\"><input id=\"uploadimg\" type=\"button\" class=\"btn\" value=\"上传图片\"></td></tr>");
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
                    if(data.code == "success"){
                        var imgBBCode = "[img]" + data.data.url + "[/img]";
                        var txtArea = $("#descr")[0];
                        var content = txtArea.value;
                        var start = txtArea.selectionStart;
                        txtArea.value = content.substring(0, txtArea.selectionStart) + imgBBCode + content.substring(txtArea.selectionEnd, content.length);
                        var position = start + imgBBCode.length;
                        $("#descr").focus();
                        txtArea.setSelectionRange(position, position);
                    }else{
                        alert(data.msg);
                    }
                },
                error: function(){
                    alert("上传失败！");
                }
        });
    });
})();
