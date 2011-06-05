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
                location.href = 'offers.php'
            }
        });

        var adsBtn = new Ext.Button({
            text: 'Ads',
            ui: 'round',
            margin: 5
        });

        var accountBtn = new Ext.Button({
            text: 'My Account',
            ui: 'round',
            margin: 5,
            handler: function(){
                location.href = 'account.php'
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
                title: 'Food Supplier',
                items: [
                    {
                        text: 'Back',
                        handler: function(){
                            location.href = '../index.php';
                        }
                    }
                ]
            },
            offersBtn,
            adsBtn,
            accountBtn
            ]
        });
        
    }
});
