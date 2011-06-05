Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function(){
        new Ext.form.FormPanel({
            dockedItems: [
            {
                xtype: 'textfield',
                name : 'first',
                label: 'First name'
            },
            {
                xtype: 'textfield',
                name : 'last',
                label: 'Last name'
            },
            {
                xtype: 'numberfield',
                name : 'age',
                label: 'Age'
            },
            {
                xtype: 'urlfield',
                name : 'url',
                label: 'Website'
            }
            ]
        });



    }
});
