Ext.regModel('AccountInfo',
    {
        fields: [

        {
            name: 'supplier_name',
            type: 'string'
        },
        {
            name: 'supplier_address',
            type: 'string'
        },
        {
            name: 'supplier_email',
            type: 'string'
        },
        {
            name: 'supplier_phone',
            type: 'string'
        },
        {
            name: 'password',
            type: 'string'
        }
        ]
    });

Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function(){

        var store = new Ext.data.Store({
            model: 'AccountInfo',
            proxy: {
                type: 'ajax',
                url: 'inc/getjson.php?recordID=1',
                reader:{
                    type: 'json',
                    root: 'data'
                }
            }
        });

        var fs = new Ext.form.FormPanel({

            defaultType: 'textfield',
            model: 'AccountInfo',
            fullscreen: true,
            items: [
            {
                label: 'Name',
                name: 'supplier_name',
                width: '100%',
                labelWidth: '30%'
            }, {
                label: 'Address',
                name: 'supplier_address',
                width: '100%',
                labelWidth: '30%'
            },
            {
                label: 'Email',
                name: 'supplier_email',
                vtype:'email', // ie Validate as an email field
                width: '100%',
                labelWidth: '30%'
            },
            {
                label: 'Phone',
                name: 'supplier_phone',
                vtype: 'phone',
                width: '100%',
                labelWidth: '30%'
            },
            {
                xtype: 'passwordfield',
                label: 'Password',
                name: 'pass',
                vtype: 'password',
                width: '100%',
                labelWidth: '30%'
            }
            ],
            dockedItems: [
            {
                xtype: 'toolbar',
                dock: 'top',
                title: 'Account Management'
            } ,

{
                xtype: 'toolbar',
                dock: 'bottom',
                items: [{
                    xtype: 'spacer'
                }, {
                    text: 'Reset',
                    handler: function() {
                        fs.reset();
                    }
                }, {
                    text: 'Save',
                    ui: 'confirm',
                    handler: function() {
                        fs.submit({
                            waitMsg: {
                                message:'Submitting',
                                cls : 'demos-loading'
                            },
                            success: function(e) {
                                showCenteredOverlay();
                                fs.reset();
                            }
                        });
                    }
                }]
            }]
        });

        store = store.load(function(records, operation, success) {
            fs.load(records[0]);
            fs.render('form');
        }
        );

    }
});
