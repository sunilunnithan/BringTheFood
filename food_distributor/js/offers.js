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
        {name: '2 pizzas',   time: '04/06/2011 22.30'},
        {name: '1 pasta alla carbonara',     time: '04/06/2011 23.30'}
    ]
});

Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function(){
        var addBtn = new Ext.Button({
            text: 'New Offer',
            ui: 'round',
            margin: 5,
            padding: 10
        });

        var list = new Ext.List({
            fullscreen: true,

            itemTpl : '{name} {time}',
            grouped : true,
            indexBar: true,

            store: store
        });
        list.show();

        new Ext.Panel({
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
            addBtn,
            list
            ]
        });

    }
});
