bringthefood.views.SupplierMain = Ext.extend(Ext.Panel, {
    fullscreen: 'true',
    layout: {
        type : 'vbox',
        align : 'center'
    },
    dockedItems: [
    {
        dock: 'top',
        xtype: 'toolbar',
        title: 'Food Supplier',
        items: [
        {
            text: 'Log Out',
            ui: 'back',
            handler: function(){
                Ext.dispatch({
                    controller: bringthefood.controllers.loginController,
                    action: 'logout'
                });
            }
        }
        ]
    }],
    items: [
    {
        xtype: 'button',
        text: 'Offers Management',
        ui: 'round',
        margin: 5,
        handler: function(){
        //offers management
        }
    },
    {
        xtype: 'button',
        text: 'Rewards',
        ui: 'round',
        margin: 5
    },
    {
        xtype: 'button',
        text: 'My Account',
        ui: 'round',
        margin: 5,
        handler: function(){
        //go to account management
        }
    }
    ]

});