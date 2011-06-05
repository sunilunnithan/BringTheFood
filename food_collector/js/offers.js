Ext.regModel('Offers', {
    fields: ['description', 'supplier', 'Accept']
});

var store = new Ext.data.JsonStore({
    model  : 'Offers',

    getGroupString : function(record) {
        return record.get('supplier');
    },

    data: [
        {description: '2 pizzas', supplier: 'Restaurant X'},
        {description: '1 pasta', supplier: 'Catering services Y'},
        {description: 'tomatos', supplier: 'Catering services Y'},
        {description: 'Mix', supplier: 'Mensa Z'},
        {description: 'Wine', supplier: 'Mensa Z'},
        {description: 'Bottles', supplier: 'Mensa Z'},
        {description: 'Crates of vegetables', supplier: 'Mensa Z'}
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
            itemTpl : '=> {description}',
            grouped : true,
            indexBar: true,
            store: store,
            listeners:
                {
                 itemtap: function (list, index) {
                        var record = list.getStore().getAt(index);
                        var rdescription = record.get('description');
                        var rSupp = record.get('supplier');
//                        Ext.Msg.confirm(
//                            'Pick-up',
//                            "Get " + rdescription + " from " + rSupp,
//                            function(btn) {
//
//                                Ext.Msg.alert('Button Click', 'You clicked the button');}
//                        );
                    
                        Ext.Ajax.request({
                            url: 'bookOffer.php',
                            method: 'POST',
                            param: {'collectorId': '1', 'offerId': '1'},
                            success: function(result, response) {
                                Ext.Msg.alert('Booking', result.responseText, Ext.emptyFn);
                                //Ext.Msg.alert('Booking', "Accepted", Ext.emptyFn);
                            },
                            failure: function(result, response) {
                                Ext.Msg.alert('Booking', "Refused", Ext.emptyFn);
                            }
                        });
                 }
             }
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