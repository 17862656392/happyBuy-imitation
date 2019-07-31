var id = Cookies.get('addressId');

myHttp({
        type: 'post',
        url: '/address/edit',
        data: { eid: id },
        success: function(result){
                var name = result[0].receiveName;
                var tel = result[0].receiveTel;
                $('.name').val(name);
                $('.tel').val(tel);
        }
});
$('.save2').click(function(){
        var receiveName = $('.name').val();
        var receiveTel = $('.tel').val();
        var receiveAddress = $('.address').val() + $('.detail-address').val();
        var id = Cookies.get('addressId');
        console.log(id);
        myHttp({
                type: 'post',
                url: '/address/update',
                data: {
                        receiveName:receiveName,
                        receiveTel:receiveTel,
                        receiveAddress:receiveAddress,
                        id:id,
                },
                success: function(result){
                                window.location.href = 'address.html';
                }
        });
});