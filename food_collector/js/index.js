Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function(){
        var offersBtn = new Ext.Button({
            text: 'Offers',
            ui: 'round',
            handler: function(){location.href = 'offers.php'}
        });

        var adsBtn = new Ext.Button({
            text: 'Ads',
            ui: 'round'
        });

        var accountBtn = new Ext.Button({
            text: 'My Account',
            ui: 'round'
        });

        new Ext.Panel({
            fullscreen: 'true',
            layout: {
                type : 'vbox',
                pack : 'center',
                align: 'stretch'
            },
            defaults:{
                flex: 1
            },
            dockedItems: [
            {
                dock: 'top',
                xtype: 'toolbar',
                title: 'Food Supplier'
            },
            offersBtn,
            adsBtn,
            accountBtn
            ]
        });
        
    }
});
