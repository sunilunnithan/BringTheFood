bringthefood.views.PublishOffer = Ext.extend(Ext.form.FormPanel,{
    fullscreen: 'true',
    layout: {
        type : 'vbox',
        align : 'center'
    },
    defaults: {
        iconMask: true
    },
    layoutConfig: {
        trackLabels: false
    },
    scroll: 'vertical',
    dockedItems: [
    {
        dock: 'top',
        xtype: 'toolbar',
        title: 'Offers',
        items: [
        {
            xtype: 'button',
            name: 'home',
            iconCls: 'home',
            handler: function(){
                Ext.dispatch({
                    controller: bringthefood.controllers.supplierController,
                    action: 'goBack'
                });
            }
        },
        {
            xtype: 'button',
            text: 'New Offer'
        }
        ]
    }
    ],
    items: [
    {
        xtype: 'fieldset',
        items: [
        {
            xtype: 'textfield',
            label: 'Description',
            name: 'desc'
        }, {
            xtype: 'datepickerfield',
            label: 'Date from',
            name: 'avdate'
        },
        {
            xtype: 'textfield',
            label: 'Time from',
            name: 'avtime'
        },
        {
            xtype: 'datepickerfield',
            label: 'Date until',
            name: 'expdate'
        },
        {
            xtype: 'textfield',
            label: 'Time until',
            name: 'exptime'
        }
        ]
    },
    {
        xtype: 'fieldset',
        items: [
        {
            xtype: 'checkboxfield',
            label: 'New address',
            onChange: function(field, value){
                var addressfields = Ext.getCmp('address');

                if (field.isChecked()){
                    addressfields.enable();
                    addressfields.show();
                } else {
                    addressfields.disable();
                    addressfields.hide();
                }
            }
        }

        
        ]
    },
    {
        xtype: 'fieldset',
        name: 'address',
        disabled: true,
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
        xtype: 'button',
        text: 'Publish',
        ui: 'confirm',
        handler: function(){
        //offerForm.submit('offers-submit.php');
        }
    }
    ]
    
});

