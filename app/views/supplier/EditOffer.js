bringthefood.views.EditOffer = Ext.extend(Ext.form.FormPanel,{
    title: 'Edit Offer',
    id: 'editoffer',
    url: 'include/offers.php?action=update',
    standardSubmit: false,
    fullscreen: 'true',
    model: 'bringthefood.models.offerModel',
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
        title: 'Update Offer',
        defaults: {
            iconMask: true
        },
        items: [
        {
            xtype: 'button',
            name: 'back',
            text: 'Back',
            ui: 'back',
            handler: function(){
                Ext.dispatch({
                    controller: bringthefood.controllers.supplierController,
                    action: 'manageOffers'
                });
            }
        }
        ]
    }
    ],
    items: [
    {
      xtype: 'hiddenfield',
      name: 'offer_id'
    },
    {
        xtype: 'fieldset',
        items: [
        {
            xtype: 'selectfield',
            name: 'status',
            label: 'Status',
            options: [
            {
                text: 'available',
                value: 'available'
            },

            {
                text: 'locked',
                value: 'locked'
            },

            {
                text: 'collected',
                value: 'collected'
            },
            ]
        }]
    },
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
    },
    {
        xtype: 'container',
        layout: 'hbox',
        items: [
        {
            xtype: 'button',
            text: 'Update',
            ui: 'confirm',
            margin: '10px',
            handler: function(){
                Ext.dispatch({
                    controller: bringthefood.controllers.supplierController,
                    action: 'updateOffer'
                });
            }
        },
        {
            xtype: 'button',
            text: 'Delete',
            ui: 'decline',
            margin: '10px',
            handler: function(){
                Ext.dispatch({
                    controller: bringthefood.controllers.supplierController,
                    action: 'deleteOffer'
                });
            }
        }
        ]
    }
    
    ]

});