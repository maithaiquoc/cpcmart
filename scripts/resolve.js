$('#btnConfirmPopup').click(function(){
    var name = $('#txtNamePopup').val();
    var phone = $('#txtPhonePopup').val();
    var address = $('#txtAddressPopup').val();
    var email = $('#emailPopup').val();
    var idProduct = $("#id").val();
    var amount = $('#qtyPopup').val();
    var unit = $('#hiddenProductPrice').val();
    var idShop = $('#hiddenShopID').val();
    var total = amount*unit;
    var idCustomer = $('#customerID').val();

    if(phone == '' || email == ''){
        alert("Điện thoại và email là các thông tin bắc buộc. Xin vui lòng không được để trống...");
    }
    else if($('#popupAccept').is(':checked') == false){
        alert("Bạn chưa đồng ý với chính sách của chúng tôi...");
    }
    else{
        var dataString = "name="+name+"&phone="+phone+"&address="+address+"&email="+email+"&idProduct="+idProduct+"&amount="+amount+"&unit="+unit
            +"&idShop="+idShop+"&total="+total+"&idCustomer="+idCustomer;
        insertOrder(dataString);
    }
});

function setMoney(){
    var money = $('#qtyPopup').val();
    if(money < 1){
        $('.popup-price').html($('#hiddenProductPrice').val()+' VND');
        $('#qtyPopup').val('1');
    }else{
        money = (money * $('#hiddenProductPrice').val()).toCurrencyString();
        $('.popup-price').html(money + ' VND');
    }
}

Number.prototype.toCurrencyString=function(){
    return this.toFixed(0).replace(/(\d)(?=(\d{3})+\b)/g,'$1,');
}

function setDefault(id){
    if($('#'+id).val() < 1){
        $('#'+id).val(1);
    }
}

function insertOrder(dataString){
    var dataString = dataString+"&functionName="+"insertOrder";
    $.ajax({
        type: "POST",
        url: "lib/functions.php",
        data: dataString,
        success: function(x){
            if(x == 1){
                alert("Cám ơn bạn đã đặt mua. Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất.");
                window.location.href = "#closed";
            }
            else{
                alert("Lỗi! Xin vui lòng tải lại trang và thử lại...");
            }
        }
    });
}

$(function(){
    $('.f-sty-P1').trigger('click');
    var length = $('#divProductPag a').length;
    var link = $('#divProductPag a').attr('href');
    var myArr = link.split("/");
    var filter = parseInt($('#hiddenProductPageFilter').val());
    var pageNum = parseInt($('#hiddenProductPageNum').val());
    if(filter == ''){
        filter = 1;
    }
    var getPage = myArr[2].substr(1, myArr[2].length);
    var linkAfter = "/"+myArr[1]+"?filter1="+filter+"&"+getPage;
    for(var i = 0; i < length - 1; i++){
        $('#divProductPag a:nth-child('+(i+1)+')').attr('href', linkAfter+(i+1));
    }

    $('#divProductPag').find('span').remove();
    var firstPage = "/"+myArr[1]+"?filter1="+filter+"&"+getPage+1;
    var previous = "/"+myArr[1]+"?filter1="+filter+"&"+getPage+(pageNum-1);
    var next = "/"+myArr[1]+"?filter1="+filter+"&"+getPage+(pageNum+1);
    var lastPage = "/"+myArr[1]+"?filter1="+filter+"&"+getPage+(length-1);
    if(pageNum == length - 1){
        next = lastPage;
    }
    if(pageNum-1 == 0){
        previous = "/"+myArr[1]+"?filter1="+filter+"&"+getPage+1;
    }

    $('#divProductPag').prepend("<a href="+firstPage+">1</a>");
    $('#divProductPag').prepend("<a href="+previous+">&lsaquo;</a>");
    $('#divProductPag').prepend("<a href="+firstPage+">&#171;</a>");

    $('#divProductPag a:nth-child('+(length+2)+')').attr('href', next);
    $('#divProductPag a:nth-child('+(length+3)+')').attr('href', lastPage);
});

$("#popBrandForm").on('submit',function(e) {
    e.preventDefault();
});

$("#popBrandSubmit").click(function(){
    var popBrandName = $("#popBrandName").val();
    var popBrandLink = $("#popBrandLink").val();
    if(popBrandName != '' && popBrandLink != ''){
        var popBrandID = $("#id").val();
        var popBrandBG = $("#popBrandBG").val();
        var popBrandFC = $("#popBrandFC").val();
        var popBrandStyle = popBrandBG+","+popBrandFC;

        var dataString = "popBrandID="+popBrandID+"&popBrandName="+popBrandName+"&popBrandLink="+popBrandLink+"&popBrandStyle="+popBrandStyle+"&functionName="+"updateBrand";
        $.ajax({
            type: "POST",
            url: "lib/functions.php",
            data: dataString,
            success: function(x){
                if(x == 1){
                    alert("Cập nhật thành công!");
                    $('#aBrand').attr("href", popBrandLink);
                    $('#aBrand').attr("title", popBrandName);
                    $('#aBrand').html(popBrandName);
                    $('#divBrand').css("background-color", popBrandBG);
                    $('#aBrand').css("color", popBrandFC);
                    $('#popBrandClose').click();
                }
                else{
                    alert("Lỗi! Xin vui lòng tải lại trang và thử lại...");
                }
            }
        });
    }
});

function lightbox_open(idLight, idFade){
    window.scrollTo(0,0);
    document.getElementById(idLight).style.display='block';
    document.getElementById(idFade).style.display='block';
}

function lightbox_close(idLight, idFade){
    document.getElementById(idLight).style.display='none';
    document.getElementById(idFade).style.display='none';
}

$("#aResend").click(function(){
    openConfirmPopup('<p>Đang kiểm tra thông tin...</p>');
    window.setTimeout(function () {
        var userName = $("#hiddenLoginUserName").val();
        var dataString = "userName="+userName+"&functionName="+"selectUserEmail";
        $.ajax({
            type: "POST",
            url: "lib/functions.php",
            data: dataString,
            success: function(x){
                resendActiveLink(x);
            }
        });
    }, 2000)
});

function resendActiveLink(email){
    openConfirmPopup('<p>Đang xử lý, xin vui lòng chờ...</p>');
    var email = email;
    var dataString = "email="+email;
    $.ajax({
        type: "POST",
        url: "lib/phpmailer/external/register_resend.php",
        data: dataString,
        success: function(x){
            closeConfirmPopup('<p>Hệ thống đã gửi lại đường dẫn kích hoạt qua <b>'+email+'</b>, vui lòng kiểm tra email và làm theo hướng dẫn.</p>');
        }
    });
}

$('#btn_doipass').click(function(){
    var email = $("#txtFPEmail").val();
    if(email == ""){
        alert("Bạn chưa nhập email!");
    }
    else{
        openConfirmPopup('<p>Đang kiểm tra thông tin...</p>');
        window.setTimeout(function () {
            var dataString = "email="+email+"&functionName="+"checkUserEmail";
            $.ajax({
                type: "POST",
                url: "lib/functions.php",
                data: dataString,
                success: function(x){
                    if(x == 2) {
                        closeConfirmPopup('<p>Tài khoản đăng ký qua <b>'+email+'</b> của bạn chưa được kích hoạt.<br/>' +
                        'Vui lòng kiểm tra email và nhấn vào đường dẫn chúng tôi đã gửi cho bạn trong lúc đăng ký.<br/> Hoặc, bạn có thể nhấn <a class="aResendActiveLink" id="aResendFP">vào đây</a> để hệ thống gửi lại đường dẫn kích hoạt cho bạn.</p>');
                        $("#aResendFP").click(function(){
                            resendActiveLink(email);
                        });
                    }else if(x == 1){
                        resendChangePassLink(email);
                    }
                    else{
                        closeConfirmPopup('<p>Hệ thống không thể xác thực được email <b>'+email+'</b> của bạn.<br/> Hãy chắc chắn rằng email này đã được đăng ký!<br/> Vui lòng kiểm tra và thử lại.</p>');
                    }
                }
            });
        }, 2000)
    }
});

function resendChangePassLink(email){
    openConfirmPopup('<p>Đang xử lý, xin vui lòng chờ...</p>');
    var email = email;
    var dataString = "email="+email;
    $.ajax({
        type: "POST",
        url: "lib/phpmailer/external/login_forget.php",
        data: dataString,
        success: function(x){
            closeConfirmPopup('<p>Hệ thống đã gửi đường dẫn cài đặt lại mật khẩu qua <b>'+email+'</b>, vui lòng kiểm tra email và làm theo hướng dẫn.</p>');
        }
    });
}

function openConfirmPopup(message){
    $('.pCloseConfirm').hide();
    $('#divConfirm').html('<img src="../imgs/load.gif"><p');
    $('#divConfirm').append(message);
    lightbox_open('lightConfirm', 'fadeConfirm');
}

function closeConfirmPopup(message){
    $('#divConfirm').html(message);
    $('.pCloseConfirm').show();
}