bringthefood.views.OffersMap = Ext.extend(Ext.Panel, {
    title: 'Offers',
    id: 'offersmap',
    layout: 'fit',
    dockedItems: [
    {
        xtype: 'toolbar',
        title: 'Offers Nearby',
        defaults: {
            iconMask: true
        },
        items: [
        {
            xtype: 'button',
            name: 'home',
            iconCls: 'home',
        //position: 'left'
        },
        {
            xtype: 'spacer'
        },

        {
            xtype: 'button',
            name: 'refresh',
            iconCls: 'refresh',
            //position: 'right',
            handler: function(){
            //reload offers
            }
        }
        ]
    }
    ],
    items: [
    {
        xtype: 'map',
        useCurrentLocation: true
    }
    ]
});