bringthefood.controllers.loginController = new Ext.Controller({

    register: function(options){
        bringthefood.views.viewport.setActiveItem(bringthefood.views.regForm,options.animation);
    },

    login: function(options){
        bringthefood.views.loginForm.submit({
            waitMsg: {
                message: 'Please wait...'
            },
            success: function(e){
                //go to logged in status
            }
        });
    }
});
