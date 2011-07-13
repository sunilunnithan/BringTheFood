bringthefood.controllers.supplierController = new Ext.Controller({
    manageOffers: function(){
        bringthefood.stores.offersStore.clearFilter(true);
        bringthefood.stores.offersStore.load();
        Ext.Ajax.request({
            url: 'include/login.php' ,
            success: function(response){
                var resp = Ext.decode(response.responseText);
                var uid = resp.id;
                bringthefood.stores.offersStore.filter({
                    property: 'supplier_id',
                    value: uid,
                    exactMatch: true
                });
                bringthefood.views.viewport.setActiveItem(bringthefood.views.myoffers);
            }
        });
        
    },
    newOffer: function(){
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
                Ext.Msg.alert('Success!','Offer successfully published',Ext.emptyFn);
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
    },

    editOffer: function(options){
        var data = options.data;
        bringthefood.views.viewport.setActiveItem(bringthefood.views.editoffer.load(data));
    },

    updateOffer: function(){
        bringthefood.views.editoffer.submit({
            waitMsg: {
                message: 'Updating...'
            },
            success: function(form, result){
                Ext.Msg.alert('Success!','Offer successfully updated',Ext.emptyFn);
                bringthefood.views.editoffer.reset();
                animation = {
                    type: 'slide',
                    direction: 'right'
                };
                bringthefood.views.viewport.setActiveItem(bringthefood.views.myoffers,animation);
            },
            failure: function(form, result){
                Ext.Msg.alert('Update failed!',result.message,Ext.emptyFn);
            }
        });
    },

    rewards: function(){
        Ext.Ajax.request({
            url: 'include/rewards.php',
            success: function(resp){
                var res = Ext.decode(resp.responseText);
                Ext.Msg.alert('Your Score', 'You have <b>' + res.score + '</b> points!<br />More info on how to spend them coming soon!', Ext.emptyFn);
            }
        })
    }
   
});