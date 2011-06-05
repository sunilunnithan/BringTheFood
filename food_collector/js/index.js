Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function(){
        var offersBtn = new Ext.Button({
            text: 'Offers',
            ui: 'round',
            margin: 5,
            handler: function(){
                location.href = 'getOffersTest.php'
                }
        });

        var accountBtn = new Ext.Button({
            text: 'My Account',
            ui: 'round',
            margin: 5,
            handler: function() {
                location.href = 'getAccountInfoTest.php';
            }
        });

        new Ext.Panel({
            fullscreen: 'true',
            layout: {
                type : 'vbox',
                align : 'center'
            },
            dockedItems: [
            {
                dock: 'top',
                xtype: 'toolbar',
                title: 'Food Collector'
            },
            offersBtn,
            accountBtn
            ]
        });
        
    }
});
