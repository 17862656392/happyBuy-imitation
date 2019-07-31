$('ul.other>li.address').click(function(){
        window.location.href = 'address.html'
});

myHttp({
        type:'post',
        url: '/profile/center',
        success: function(data) {
                $('.user-name').text(data);
        }
});
