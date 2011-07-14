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
        id: 'titlebar',
        items: [
        {
            text: 'Logout',
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
        text: 'Offers',
        margin: 5,
        style: 'padding: 1em',
        width: '200px',
        handler: function(){
            Ext.dispatch({
                controller: bringthefood.controllers.supplierController,
                action: 'manageOffers'
            });
        }
    },
    {
        xtype: 'button',
        text: 'Rewards',
        style: 'padding: 1em',
        width: '200px',
        margin: 5,
        handler: function(){
            Ext.dispatch({
                controller: bringthefood.controllers.supplierController,
                action: 'rewards'
            });
        }
    },
    {
        xtype: 'button',
        text: 'My Account',
        margin: 5,
        style: 'padding: 1em',
        width: '200px',
        handler: function(){
            Ext.dispatch({
                controller: bringthefood.controllers.supplierController,
                action: 'manageAccount'
            });
        }
    }
    ]

});