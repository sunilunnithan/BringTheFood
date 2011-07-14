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
    },
    {
        xtype: 'toolbar',
        dock: 'bottom',
        layout: {
            pack: 'center',
            align: 'center'
        },
        defaults: {
            iconMask: true
        },
        items: [
        {
            xtype: 'button',
            name: 'account',
            iconCls: 'user',
            text: 'Account',
            //position: 'right',
            handler: function(){
                Ext.dispatch({
                    controller: bringthefood.controllers.collectorController,
                    action: 'manageAccount'
                });
            }
        },
        {
            xtype: 'button',
            name: 'youroffers',
            iconCls: 'compose',
            text: 'Commitments',
            //position: 'right',
            handler: function(){
            //
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
        mapOptions: {
            zoom: 14
        },
        listeners: {
            maprender: function() { 
                Ext.dispatch({
                    controller: bringthefood.controllers.collectorController,
                    action: 'refreshMap',
                    map: bringthefood.views.offersmap.getComponent('map').map
                });
            }
        }
    }
    ]

    
   
});