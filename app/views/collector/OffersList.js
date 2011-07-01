bringthefood.views.OffersList = Ext.extend(Ext.Panel,{
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Offers',
        dock: 'top',
        items: [{
            xtype: 'button',
            text: 'Back',
            ui: 'back',
            handler: function() {
               //
            },
            scope: this
        }
        ]
    }],
    items: [{
        xtype: 'list',
        emptyText: 'No data available.',
        store: bringthefood.stores.offersStore,
        itemTpl: '{desc}',
        onItemDisclosure: function (record) {
            //lock offer
        },
        grouped: false,
        scroll: 'vertical',
        fullscreen: true
    }]
});