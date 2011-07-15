bringthefood.views.OffersList = Ext.extend(Ext.Carousel,{
    scroll: 'vertical',

    dockedItems: [{
        xtype: 'toolbar',
        id: 'titlebar',
        title: 'Offers Here',
        dock: 'top',
        defaults: {
            iconMask: true
        },
        items: [{
            xtype: 'button',
            iconCls: 'maps',
            handler: function() {
                Ext.dispatch({
                    controller: bringthefood.controllers.collectorController,
                    action: 'goBackToMap'
                });
            }
        }
        ]
    }]


});