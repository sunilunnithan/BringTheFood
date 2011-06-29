bringthefood.views.OffersList = Ext.extend(Ext.Panel,{
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Available Offers',
        dock: 'top',
        items: [{
            xtype: 'button',
            text: 'Back',
            ui: 'back',
            handler: function() {
            //go back
            },
            scope: this
        },
        {
            xtype:'spacer'
        },
        {
            xtype: 'button',
            text: 'New Offer'
        }
        ]
    }],
    items: [{
        xtype: 'list',
        emptyText   : 'No data available.',
        store: bringthefood.stores.offersStore,
        itemTpl: '{title}',
        onItemDisclosure: function (record) {
        //todo
        },
        grouped: false,
        scroll: 'vertical',
        fullscreen: true
    }]
});