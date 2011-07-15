bringthefood.controllers.registrationController = new Ext.Controller({
    goBack: function(){
        animation = {
            type: 'slide',
            direction: 'right'
        };
        bringthefood.views.viewport.setActiveItem(bringthefood.views.loginForm,animation);
    },

    register: function(){
        bringthefood.views.regForm.submit({
            waitMsg: {
                message: 'Please wait...'
            },
            success: function(form, result){
                Ext.Msg.alert('Success!','You have been registered and may now login',Ext.emptyFn);
                bringthefood.views.regForm.reset();
                animation = {
                    type: 'slide',
                    direction: 'right'
                };
                bringthefood.views.viewport.setActiveItem(bringthefood.views.loginForm,animation);
            },
            failure: function(form, result){
                //var resp = action.result;
                //var jsonResp = Ext.util.JSON.decode(result);

                Ext.Msg.alert('Registration failed!',result.message,Ext.emptyFn);
            //bringthefood.views.regForm.reset();
            }
        });
    },

    manageAccount: function(options){
        bringthefood.views.accountMgmt.origin = options.role;
        bringthefood.stores.userStore.load({
            callback:function(){
                var store = bringthefood.stores.userStore;
                bringthefood.views.accountMgmt.getComponent('accountform').load(store.getAt(0));
                bringthefood.views.viewport.setActiveItem(bringthefood.views.accountMgmt);
            }
        });

    },

    update: function(){
        var form = bringthefood.views.accountMgmt.getComponent('accountform');
        form.submit({
            waitMsg: {
                message: 'Please wait...'
            },
            success: function(form, result){
                Ext.Msg.alert('Success!','Your data has been updated',Ext.emptyFn);
                form.reset();
                animation = {
                    type: 'slide',
                    direction: 'right'
                };
                form.up('panel').returnHome();
            }
        });
    },

    updatePassword: function(){
        var form = bringthefood.views.accountMgmt.getComponent('passwordform');
        form.submit({
            waitMsg: {
                message: 'Please wait...'
            },
            success: function(form, result){
                Ext.Msg.alert('Success!','Your password has been updated. Please login again.',Ext.emptyFn);
                form.reset();
                animation = {
                    type: 'slide',
                    direction: 'right'
                };
                Ext.dispatch({
                    controller: bringthefood.controllers.loginController,
                    action: 'logout'
                });
            }
        });
    }
});