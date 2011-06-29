bringthefood.controllers.supplierController = new Ext.Controller({
    manageOffers: function(){
       bringthefood.views.viewport.setActiveItem(bringthefood.views.publishoffer);
    },

    goBack: function(){
        bringthefood.views.viewport.setActiveItem(bringthefood.views.supplier_main);
    },

    submitOffer: function(){
        bringthefood.views.publishoffer.submit({
            waitMsg: {
                message: 'Submitting...'
            },
            success: function(form, result){
                Ext.Msg.alert('Success!','You have been registered and may now login',Ext.emptyFn);
                bringthefood.views.publishoffer.reset();
                animation = {
                    type: 'slide',
                    direction: 'right'
                };
                bringthefood.views.viewport.setActiveItem(bringthefood.views.supplier_main,animation);
            },
            failure: function(form, result){
                Ext.Msg.alert('Submission failed!',result.message,Ext.emptyFn);
            }
        });
    }
});