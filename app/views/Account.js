bringthefood.views.Account = Ext.extend(Ext.TabPanel, {    
    title: 'Account management',
    cardSwitchAnimation: 'slide',
    origin: undefined,
    store: bringthefood.stores.userStore,

    returnHome: function(){
        if (bringthefood.views.accountMgmt.origin == 'collector'){
            Ext.dispatch({
                controller: bringthefood.controllers.collectorController,
                action: 'goHome'
            });
        } else if (bringthefood.views.accountMgmt.origin == 'supplier'){
            Ext.dispatch({
                controller: bringthefood.controllers.supplierController,
                action: 'goHome'
            });
        } else {
            Ext.Msg.alert('Error!','And who the hell are you supposed to be, dude?',Ext.emptyFn);
        }
    },

    dockedItems:[{
        xtype: 'toolbar',
        title: 'Your Account',
        dock: 'top',
        items: [
        {
            text: 'Back',
            ui: 'back',
            handler: function(){
                bringthefood.views.accountMgmt.returnHome();
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
        url: 'include/update.php',
        standardSubmit: true,
        items: [{
            xtype: 'fieldset',
            title: 'Personal Information',
            items: [{
                xtype: 'textfield',
                name: 'name',
                label: '(Company) Name',
                autoCapitalize : true,
                useClearIcon: true
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
        id: 'passwordform',
        title: 'Change Password',
        xtype: 'formpanel',
        scroll: 'vertical',
        url: 'include/change_pwd.php',
        standardSubmit: false,
        items: [
        {
            xtype: 'fieldset',
            items: [{
                xtype: 'passwordfield',
                name: 'password0',
                label: 'Old Password',
                useClearIcon: true,
                required: true
            }
            ]
        },
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
                label: 'Retype New Password',
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