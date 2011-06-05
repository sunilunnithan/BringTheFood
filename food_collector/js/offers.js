Ext.regModel('Offers', {
    fields: ['name', 'supplier', 'Accept']
});

var store = new Ext.data.JsonStore({
    model  : 'Offers',

    getGroupString : function(record) {
        return record.get('supplier');
    },

    data: [
        {name: '2 pizzas', supplier: 'Restaurant X'},
        {name: '1 pasta', supplier: 'Catering services Y'},
        {name: 'tomatos', supplier: 'Catering services Y'},
        {name: 'Mix', supplier: 'Mensa Z'},
        {name: 'Wine', supplier: 'Mensa Z'},
        {name: 'Bottles', supplier: 'Mensa Z'},
        {name: 'Crates of vegetables', supplier: 'Mensa Z'}
    ]
});

Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function(){
        var list = new Ext.List({
            fullscreen: true,
            itemTpl : '{name}',
            grouped : true,
            indexBar: true,
            store: store,
            listeners:
                {
                 itemtap: function(item)
                    { Ext.Msg.alert('Item', 'Selected', Ext.emptyFn);} }
        });

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
                title: 'Offers Overview'
            },
            list
            ]
        });

        list.show();

    }
});