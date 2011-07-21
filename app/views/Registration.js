bringthefood.views.Registration = Ext.extend(Ext.form.FormPanel,{
    title: 'Registration',
    id: 'regform',
    scroll: 'vertical',
    url: 'include/register.php',
    standardSubmit: false,
    dockedItems:[{
        xtype: 'toolbar',
        title: 'Registration',
        dock: 'top',
        items: [
        {
            text: 'Back',
            ui: 'back',
            handler: function(){
                Ext.dispatch({
                    controller: bringthefood.controllers.registrationController,
                    action: 'goBack'
                });
            }
        }

        ]
    }],
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
        }, {
            xtype: 'passwordfield',
            name: 'password',
            label: 'Password',
            useClearIcon: true,
            required: true
        },{
            xtype: 'passwordfield',
            name: 'password2',
            label: 'Re-enter Password',
            useClearIcon: true,
            required: true
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
    },{
        xtype: 'selectfield',
        name: 'role',
        label: 'Role',
        options: [
        {
            text:'supplier',
            value:'supplier'
        } ,
{
            text:'collector',
            value:'collector'
        },

        {
            text:'distributor',
            value:'distributor'
        }
        ]
    }, {
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
                    action: 'register'
                });
            }
        }]
    }]
});
