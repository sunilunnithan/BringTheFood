bringthefood.views.PublishOffer = Ext.extend(Ext.form.FormPanel,{
    title: 'Publish Offer',
    id: 'publishoffer',
    url: 'include/offers.php?action=add',
    standardSubmit: true,
    fullscreen: 'true',
    layout: {
        type : 'vbox',
        align : 'center'
    },
    layoutConfig: {
        trackLabels: false
    },
    scroll: 'vertical',
    dockedItems: [
    {
        dock: 'top',
        xtype: 'toolbar',
        title: 'Publish a New Offer',
        defaults: {
            iconMask: true
        },
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
            xtype: 'spacer'
        },
        {
            xtype: 'button',
            name: 'list',
            text: 'Offers List',
            handler: function(){
            //go to offers list
            }
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
            name: 'avdate',
            value: new Date()
        },
        {
            xtype: 'textfield',
            label: 'Time from',
            name: 'avtime',
            value: new Date().getHours() + ':' + new Date().getMinutes()
        },
        {
            xtype: 'datepickerfield',
            label: 'Date until',
            name: 'expdate',
            value: new Date()
        },
        {
            xtype: 'textfield',
            label: 'Time until',
            name: 'exptime',
            value: new Date().getHours() + ':' + new Date().getMinutes()
        }
        ]
    },
    
    {
        xtype: 'button',
        text: 'Upload Image'
    },
    {
        xtype: 'hiddenfield',
        id: 'image_field',
        name: 'image',
        hidden: true
    },
    {
        xtype: 'fieldset',
        id: 'additional_stuff',
        items: [
        {
            xtype: 'numberfield',
            label: 'How many people can it serve?',
            labelWidth: '80%',
            name: 'peopleserved',
            minValue: 0,
            value: 1
        }
        ]
    },
    {
        xtype: 'fieldset',
        item: 'newaddr_fieldset',
        items: [
        {
            xtype: 'checkboxfield',
            label: 'New address',
            name: 'newaddress',
            labelWidth: '80%',
            value: 'true',
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
            Ext.dispatch({
                controller: bringthefood.controllers.supplierController,
                action: 'submitOffer'
            });
        }
    }
    ]
    
});

