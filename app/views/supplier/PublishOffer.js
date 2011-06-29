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
            name: 'newaddress',
            labelWidth: '80%',
            listeners: {
                check: function(){
                    var addressfields = bringthefood.views.publishoffer.getComponent('address');
                    addressfields.enable();
                    addressfields.show({
                        type: 'fade'
                    });
                },
                uncheck: function(){
                    var addressfields = bringthefood.views.publishoffer.getComponent('address');
                    addressfields.disable();
                    addressfields.hide({
                        type: 'fade'
                    });
                }
            }
        }
        ]
    },
    {
        xtype: 'fieldset',
        id: 'address',
        disabled: true,
        hidden: true,
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

