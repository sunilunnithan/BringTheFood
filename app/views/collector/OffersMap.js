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
            name: 'logout',
            text: 'Logout',
            ui: 'back',
            handler: function(){
                Ext.dispatch({
                    controller: bringthefood.controllers.loginController,
                    action: 'logout'
                });
            }
        },
        {
            xtype: 'button',
            name: 'home',
            iconCls: 'home',
            handler: function(){
                
            }
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