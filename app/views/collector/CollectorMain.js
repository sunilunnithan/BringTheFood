bringthefood.views.CollectorMain = Ext.extend(Ext.Panel, {
    fullscreen: 'true',
    layout: {
        type : 'vbox',
        align : 'center'
    },
    dockedItems: [
    {
        dock: 'top',
        xtype: 'toolbar',
        title: 'Food Collector',
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
        text: 'Offers List',
        margin: 5,
        style: 'padding: 1em',
        width: '200px',
        handler: function(){
            Ext.dispatch({
                controller: bringthefood.controllers.collectorController,
                action: 'goList'
            });
        }
    },
    {
        xtype: 'button',
        text: 'Commitments',
        margin: 5,
        style: 'padding: 1em',
        width: '200px',
        handler: function(){
        //Coming soon TODO
        }
    },
    {
        xtype: 'button',
        text: 'Offers Nearby',
        style: 'padding: 1em',
        width: '200px',
        margin: 5,
        handler: function(){
            Ext.dispatch({
                controller: bringthefood.controllers.collectorController,
                action: 'goMap'
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
                controller: bringthefood.controllers.collectorController,
                action: 'manageAccount'
            });
        }
    }
    ]

});