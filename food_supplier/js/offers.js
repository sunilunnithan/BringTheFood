Ext.regModel('Offers', {
    fields: ['name','time']
});

var store = new Ext.data.JsonStore({
    model  : 'Offers',
    sorters: 'time',

    getGroupString : function(record) {
        return record.get('name')[0];
    },

    data: [
    {
        name: '2 pizzas',
        time: '04/06/2011 22.30'
    },

    {
        name: '1 pasta alla carbonara',
        time: '04/06/2011 23.30'
    }
    ]
});

Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function(){
        var addBtn = new Ext.Button({
            text: 'Submit',
            ui: 'confirm'
        });

        var offerForm = new Ext.form.FormPanel({
            defaultType: 'textfield',
            items: [
            {
                label: 'Description',
                name: 'description',
                width: '100%',
                labelWidth: '30%'
            }, {
                label: 'Available from',
                name: 'from',
                width: '100%',
                labelWidth: '40%'
            },
            {
                label: 'Available until',
                name: 'until',
                width: '100%',
                labelWidth: '40%'
            },
            {
                label: 'Remarks',
                name: 'remarks',
                width: '100%',
                labelWidth: '30%'
            },
            {
                label: 'Quantity',
                name: 'pass',
                width: '100%',
                labelWidth: '30%'
            }
            ]
        });

        var panel = new Ext.Panel({
            fullscreen: 'true',
            layout: {
                type : 'vbox',
                align : 'center'
            },
            dockedItems: [
            {
                dock: 'top',
                xtype: 'toolbar',
                title: 'Manage Your Offers'
            },
            {
                dock: 'bottom',
                xtype: 'toolbar',
                items: [
                {
                    xtype: 'button',
                    text: 'My Offers'
                },
                {
                    xtype: 'button',
                    text: 'New Offer'
                }
                ]
            }
            ],
            items: [
            offerForm,
            addBtn
            ]
        });

        panel.render('panel');

    }
});
