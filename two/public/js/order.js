// ajax请求展示列表数据
var orderId = window.location.search.substr(1).split('?');
console.log(orderId);
$.ajax({
        type: 'post',
        dataType: 'json',
        url: '/order/orderDetail',
        data: { orderId: orderId },
        success: function(result) {
                if(result.status === 200) {
                        updateOrder(result.data);
                        console.log(result.data);
                }
                else {
                        alert(result.message);
                }
        }
});
function updateOrder(data) {
        console.log(data);
        data.forEach(function(item) {
                $(`
                       <div>
                                <p>${item.shoppingTime}</p>
                                <p>待付款</p>
                        </div>
                        <div>
                                <p><img src="${ item.avatar }" alt=""></p>
                                <div class="remark">
                                        <p>${ item.name }</p>
                                        <p>
                                                <span>×${item.count}</span>
                                                <span>￥${ item.price }</span>
                                        </p>
                                </div>
                        </div>
                        <div>
                                <p>共计${item.count}件商品</p>
                        </div>
                        <div>
                                <p class="num">订单编号：${ orderId }</p>
                        </div>
                        <div>
                                 <p></p>
                                <p class="pay">立即支付</p>
                        </div>
                `).appendTo('li.wait');
        });
        $('.pay').click(function(){
                alert('马上进入支付页面');
        })
}
