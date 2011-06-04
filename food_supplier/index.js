Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function(){
        var buttons = [
        {
            text: 'Normal'
        },
        {
            ui  : 'round',
            text: 'Round'
        },
        {
            ui  : 'small',
            text: 'Small'
        }
        ];

        var panel = new Ext.Panel({
            layout: {
                type : 'vbox',
                pack : 'center',
                align: 'stretch'
            },
            defaults: {
                layout: {
                    type: 'hbox'
                },
                flex: 1,
                defaults: {
                    xtype: 'button',
                    cls  : 'demobtn',
                    flex : 1
                }
            },
            items: [
            {
                items: buttons // buttons array defined above
            },
            {
                items: [
                new Ext.Button({
                    ui  : 'decline',
                    text: 'Drastic'
                }),
                {
                    ui  : 'decline-round',
                    text: 'Round'
                },
                {
                    ui  : 'decline-small',
                    text: 'Small'
                }
                ]
            },
            {
                items: [
                {
                    ui  : 'confirm',
                    text: 'Confirm'
                },
                {
                    ui  : 'confirm-round',
                    text: 'Round'
                },
                {
                    ui  : 'confirm-small',
                    text: 'Small'
                }
                ]
            }
            ]
        });
    }
});