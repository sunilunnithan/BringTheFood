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

        Ext.Msg.confirm('Update address', 'Would you like to update also the offers at your default address?',function(res){

            var form = bringthefood.views.accountMgmt.getComponent('accountform');

            if (res == 'yes'){
                form.url += '?updateoffers=1';
            } else {
                form.url += '?updateoffers=0';
            }

            form.submit({
                waitMsg: {
                    message: 'Please wait...'
                },
                success: function(form, result){
                    Ext.Msg.alert('Success!',result.message,Ext.emptyFn);
                    form.reset();
                    animation = {
                        type: 'slide',
                        direction: 'right'
                    };
                    form.up('panel').returnHome();
                },
                failure: function(form,result){
                    Ext.Msg.alert('Error!',result.message,Ext.emptyFn);
                }
            });

        })

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