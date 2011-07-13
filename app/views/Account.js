bringthefood.views.Account = Ext.extend(Ext.TabPanel, {    
    title: 'Account management',
    cardSwitchAnimation: 'slide',
    dockedItems:[{
        xtype: 'toolbar',
        title: 'Your Account',
        dock: 'top',
        items: [
        {
            text: 'Back',
            ui: 'back',
            handler: function(){
                //TODO waiting for komminist
            }
        }

        ]
    }],
    items: [
    {
        xtype: 'formpanel',
        title: 'Update Account',
        id: 'accountform',
        scroll: 'vertical',
        url: 'include/account.php',
        standardSubmit: false,
        items: [{
            xtype: 'fieldset',
            title: 'Personal Information',
            items: [{
                xtype: 'textfield',
                name: 'name',
                label: '(Company) Name',
                autoCapitalize : true,
                required: true,
                useClearIcon: true
            },
            {
                xtype: 'emailfield',
                name: 'email',
                label: 'Email',
                useClearIcon: true,
                required: true
            }]
        },{
            xtype: 'fieldset',
            title: 'Address',
            defaults: {
                xtype: 'textfield'
            },
            items: [{
                name: 'street',
                label: 'Street'
            }, {
                name: 'city',
                label: 'City'
            }, {
                name: 'zip',
                label: 'ZIP Code',
                vtype: 'zip'
            }, {
                name: 'country',
                label: 'Country'
            },{
                name: 'phone',
                label: 'Phone',
                vtype: 'phone'
            }]
        },
        {
            layout: 'hbox',
            defaults: {
                xtype: 'button',
                flex: 1,
                style: 'margin: .5em;'
            },
            items: [{
                text: 'Reset',
                handler: function(){
                    Ext.getCmp('regform').reset();
                }
            },
            {
                text: 'Submit',
                ui: 'confirm',
                handler: function(){
                    Ext.dispatch({
                        controller: bringthefood.controllers.registrationController,
                        action: 'update'
                    });
                }
            }]
        }]
    },
    {
        id: 'passwordchange',
        title: 'Change Password',
        xtype: 'formpanel',
        scroll: 'vertical',
        url: 'include/account.php',
        standardSubmit: false,
        items: [
        {
            xtype: 'fieldset',
            title: 'Type your new password below',
            items: [{
                xtype: 'passwordfield',
                name: 'password',
                label: 'New Password',
                useClearIcon: true,
                required: true
            },{
                xtype: 'passwordfield',
                name: 'password2',
                label: 'New Password (again)',
                useClearIcon: true,
                required: true
            }
            ]
        },
        {
            layout: 'hbox',
            defaults: {
                xtype: 'button',
                flex: 1,
                style: 'margin: .5em;'
            },
            items: [{
                text: 'Reset',
                handler: function(){
                    Ext.getCmp('regform').reset();
                }
            },
            {
                text: 'Submit',
                ui: 'confirm',
                handler: function(){
                    Ext.dispatch({
                        controller: bringthefood.controllers.registrationController,
                        action: 'updatePassword'
                    });
                }
            }]
        }
        ]
    }
    ]
    
});