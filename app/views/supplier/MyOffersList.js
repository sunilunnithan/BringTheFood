bringthefood.views.MyOffersList = Ext.extend(Ext.Panel,{
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Offers you published',
        dock: 'top',
        items: [{
            xtype: 'button',
            text: 'Back',
            ui: 'back',
            handler: function() {
                Ext.dispatch({
                    controller: bringthefood.controllers.supplierController,
                    action: 'goBack'
                });
            },
            scope: this
        },
        {
            xtype:'spacer'
        },
        {
            xtype: 'button',
            text: 'New Offer',
            ui: 'forward',
            handler: function(){
                Ext.dispatch({
                    controller: bringthefood.controllers.supplierController,
                    action: 'newOffer'
                });
            }
        }
        ]
    }],
    items: [{
        xtype: 'list',
        emptyText: 'You haven\'t posted any offer yet',
        store: bringthefood.stores.offersStore,
        itemTpl: '{desc}',
        onItemDisclosure: function (record) {
            Ext.dispatch({
                controller: bringthefood.controllers.supplierController,
                action: 'editOffer',
                data: record
            })
        },
        grouped: false,
        scroll: 'vertical',
        fullscreen: true
    }]
});