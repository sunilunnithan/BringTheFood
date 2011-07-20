bringthefood.views.PublishOffer = Ext.extend(Ext.form.FormPanel,{
    title: 'Publish Offer',
    id: 'publishoffer',
    url: 'include/offers.php?action=add',
    standardSubmit: false,
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
        title: 'New Offer',
        defaults: {
            iconMask: true
        },
        items: [
        {
            xtype: 'button',
            name: 'list',
            ui: 'back',
            text: 'Offers List',
            handler: function(){
                Ext.dispatch({
                    controller: bringthefood.controllers.supplierController,
                    action: 'goBack'
                });
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
            xtype: 'textareafield',
            label: 'Description',
            name: 'desc',
            maxLength: 1024
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
//        {
//            html: 'How many people can it serve?'
//        },
        {
            xtype: 'numberfield',
            name: 'peopleserved',
            label: 'For how many?',
            labelWidth: '50%',
            minValue: 1,
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
            labelWidth: '70%',
            value: 'true',
            listeners: {
                check: function(){
                    var dummy = this.up('fieldset').up().getComponent('dummy');
                    dummy.add({
                        xtype: 'fieldset',
                        id: 'address',
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
                    });
                    dummy.doComponentLayout();
                    dummy.doLayout();
                    
                    dummy.show({
                        type: 'fade'
                    });
                //                    var addressfields = bringthefood.views.publishoffer.getComponent('address');
                //                    addressfields.enable();
                //                    addressfields.show({
                //                        type: 'fade'
                //                    });
                },
                uncheck: function(){
                    var dummy = this.up('fieldset').up().getComponent('dummy');
                    dummy.hide({
                        type: 'fade'
                    });
                    dummy.removeAll();
                    dummy.doComponentLayout();
                    
                }
            }
        }
        ]
    },
    {
        id: 'dummy',
        visible: false
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

