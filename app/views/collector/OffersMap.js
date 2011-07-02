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
                Ext.dispatch({
                    controller: bringthefood.controllers.collectorController,
                    action: 'refreshMap',
                    map: bringthefood.views.offersmap.getComponent('map').map
                })
                
            }
        }
        ]
    }
    ],
    items: [
    {
        xtype: 'map',
        id: 'map',
        useCurrentLocation: true,
        listeners: {
            show: function() {
                var offers = bringthefood.stores.offersStore.read();
                bringthefood.views.offersmap.refreshMap(offers.data);
                bringthefood.views.offersmap.doLayout();
            }
        }
    }
    ]

    
   
});