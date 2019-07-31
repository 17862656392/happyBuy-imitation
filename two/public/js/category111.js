var vm = new Vue({
        el: '#root',
        data: {
                main: [],
                sub: [],
                ins: 0
        },
        methods: {
                scrollClick: function(i){
                        this.ins = i
                },
                updateSubCategory: function(){
                        axios.get('/category/sub', { id:id })
                                .then(function(response){ return response.data; })
                                .then(function(result){ return result.data; })
                                .then(function(data){ that.sub = data; })
                                .catch(function(error){
                                        alert(error.message);
                                });
                }
        },
        created: function(){
                var that = this;
                axios.get('/category/main')
                        .then(function(response){ return response.data; })
                        .then(function(result){ return result.data; })
                        .then(function(data){ that.main = data; updateSubCategory })
                        .catch(function(error){
                                alert(error.message);
                        });

        }
});




// $('.footer li.login').click(function() {
//         window.location.href = 'profile.html';
// });




