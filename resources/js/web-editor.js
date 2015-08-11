$(function() {
    Editor.run();
});
var Editor = {
    url: null,
    token: {
        name: null,
        value: null
    },
    init: function() {
        var self = this,
            hidSecurityToken = $('#security_token');

        self.url = $('#base_url').val();
        self.token.name = hidSecurityToken.attr('name');
        self.token.value = hidSecurityToken.val();
    },
    run: function() {
        this.init();
    }
};