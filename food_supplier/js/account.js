Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function(){

        var fs = new Ext.form.FormPanel({
          
            //title:'Account Management',
            //labelAlign: 'center',
            items: [
            new Ext.form.FieldSet({
                title: 'Contact Information',
                defaultType: 'textfield',
                items: [{
                    label: 'Name',
                    name: 'name',
                    width: '100%',
                    labelWidth: '30%'
                }, {
                    label: 'Address',
                    name: 'address',
                    width: '100%',
                    labelWidth: '30%'
                },
                {
                    label: 'Email',
                    name: 'email',
                    vtype:'email', // ie Validate as an email field
                    width: '100%',
                    labelWidth: '30%'
                },
                {
                    label: 'Username',
                    name: 'usern',
                    vtype: 'username',
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
                layout: 'vbox'
            })
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

        fs.load({
           url: 'functions.php',
           method: 'GET',
           success: function(form, action){

           },
           failure: function(form,action){
               
           }
        });

        fs.render('form');

    }
});
