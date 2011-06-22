bringthefood.controllers.loginController = new Ext.Controller({

    register: function(options){
        bringthefood.views.viewport.setActiveItem(bringthefood.views.regForm,options.animation);
    },

    login: function(options){
        bringthefood.views.loginForm.submit({
            waitMsg: {
                message: 'Please wait...'
            },
            success: function(form, result){
                Ext.Msg.alert('Login successful!','You are a ' + result.role,Ext.emptyFn);
            },
            failure: function(form, result){
                Ext.Msg.alert('Login failed!','Wrong e-mail or password!',Ext.emptyFn);
                bringthefood.views.loginForm.reset();
            }
        });
    }
});
