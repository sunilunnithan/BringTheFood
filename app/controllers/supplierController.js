bringthefood.controllers.supplierController = new Ext.Controller({
    manageOffers: function(){
        Ext.Ajax.request({
            url: 'include/login.php' ,
            success: function(response){
                var resp = Ext.decode(response.responseText);
                var uid = resp.id;
                bringthefood.stores.offersStore.clearFilter(true);
                bringthefood.stores.offersStore.load({
                    scope: this,
                    callback: function(){
                        bringthefood.stores.offersStore.filter({
                            property: 'supplier_id',
                            value: uid,
                            exactMatch: true
                        });
                        //                        bringthefood.stores.offersStore.filter({
                        //                            filterFn: function(item){
                        //                                return item.get('status') != "collected";
                        //                            }
                        //                        });
                        bringthefood.views.viewport.setActiveItem(bringthefood.views.myoffers);
                    }
                });   
            }
        });
        
    },
    newOffer: function(){
        bringthefood.views.viewport.setActiveItem(bringthefood.views.publishoffer);
    },

    goBack: function(){
        bringthefood.views.viewport.setActiveItem(bringthefood.views.myoffers);
    },

    goHome: function(){
        animation = {
            type: 'slide',
            direction: 'right'
        };

        bringthefood.views.viewport.setActiveItem(bringthefood.views.supplier_main,animation);
    },

    manageAccount: function(){
        bringthefood.views.accountMgmt.origin = 'supplier';
        bringthefood.stores.userStore.load({
            callback:function(){
                var store = bringthefood.stores.userStore;
                bringthefood.views.accountMgmt.getComponent('accountform').load(store.getAt(0));
                bringthefood.views.viewport.setActiveItem(bringthefood.views.accountMgmt);
            }
        });
        
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
                bringthefood.stores.offersStore.load({
                    callback:function(){
                        bringthefood.views.viewport.setActiveItem(bringthefood.views.myoffers,animation);
                    }
                });
                
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
    },

    confirmPickUp: function(options){
        //var record = options.data;

        Ext.Msg.confirm('Please Confirm','Has this offer been picked up?',function(ans){//we need a way (password from collector?) to verify pick up
            if (ans == 'yes'){
                Ext.Ajax.request({
                    url: 'include/offers.php?action=complete&offerId=' + options.data.get('offer_id'),
                    success: function(resp){
                        var res = Ext.decode(resp.responseText);
                        if (res.success){
                            Ext.Msg.alert('Transaction Complete','Food has been brought. Thank you.',Ext.emptyFn);
                            bringthefood.stores.offersStore.load();
                        }
                    }
                });
            }
        });

        
    }
   
});