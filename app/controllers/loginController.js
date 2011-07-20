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
                animation = {
                    type: 'slide',
                    direction: 'left'
                }

                switch (result.role) {
                    case 'collector':{
                        this.loadCollector();
                    }
                    break;
                    case 'supplier':{
                        this.loadSupplier();
                    }
                    break;
                    default:
                        break;
                }

            },
            failure: function(form, result){
                Ext.Msg.alert('Login failed!','Wrong e-mail or password!',Ext.emptyFn);
                bringthefood.views.loginForm.reset();
            }
        });
    },

    logout: function(){
        animation = {
            type: 'slide',
            direction: 'right'
        };

        Ext.Ajax.request({
            url: 'include/logout.php',
            success: function(){
                bringthefood.views.viewport.setActiveItem(bringthefood.views.loginForm,animation);
            }
        });

    },

    loadSupplier: function(){
        bringthefood.stores.userStore.load({
            callback: function(){
                var store = bringthefood.stores.userStore;
                bringthefood.views.supplier_main.getComponent('welcome').update(store.getAt(0).data);
                bringthefood.views.viewport.setActiveItem(bringthefood.views.supplier_main,animation);
            }
        });
    },

    loadCollector: function(){
        //var data = bringthefood.stores.offersStore.read();
        bringthefood.views.viewport.setActiveItem(bringthefood.views.collector_main,animation);
    }
});
