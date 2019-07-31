
$('.add').click(function(){
        window.location.href = 'addAddress.html'
});
function updateAddress(result){
        result.forEach(function(item){
                $(`
                        <li data-id="${ item.id }">
                                <div>
                                        <p><span class="receive-name">${ item.receiveName }</span><span class="tel">${ item.receiveTel }</span></p>
                                        <p class="address">${ item.receiveAddress }</p>
                                </div>
                                <div>
                                        <p class="default-address">
                                                <img class="default active" src="./images/car1no.png" /><img class="default default-y" src="./images/car11.png" />默认地址
                                        </p>
                                        <p>
                                                <span class="edit"><img src="./images/ico_bj.png" />编辑</span>
                                                <span class="remove"><img src="./images/car_del.png" />删除</span></p>
                                </div>
                        </li>
                `).appendTo('ul')
        });
        // 设置默认地址
        $('p.default-address').click(function(){
                var id = $(this).closest('li').attr('data-id');
                $('p.default-address>img').removeClass('active');
                $(this).children('img.default-y').addClass('active');
                $.ajax({
                        type: 'post',
                        dataType: 'json',
                        url: '/address/default',
                        data: { id:id },
                        success: function(result){
                                if(result.status === 200) {
                                        console.log(result);
                                }
                        }
                });
        });
        // 删除收货地址
        $('span.remove').click(function(){
                var id = $(this).closest('li').attr('data-id');
                $.ajax({
                        type: 'post',
                        url: '/address/remove',
                        dataType: 'json',
                        data: { id:id },
                        success: function(result){
                                if(result.status === 200) {
                                        alert('删除成功');
                                }
                        }
                });
        });
        //编辑
        $('span.edit').click(function(){
                var id = $(this).closest('li').attr('data-id');
                window.location.href = 'addressEdit.html';
                Cookies.set('addressId', id);
        });
}

myHttp({
        type: 'post',
        url: '/address/list',
        success: function(result){
                console.log(result);
                updateAddress(result);
        }
});

