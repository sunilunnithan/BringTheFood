Ext.regModel('Offers', {
    fields: ['description', 'supplier_name', 'status', 'offer_ID']
});

var store = getStore();

Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function(){
        var list = new Ext.List({
            fullscreen: true,
            itemTpl : '=> {description} ({status})',
            grouped : true,
            indexBar: true,
            store: store,
            listeners:
                {
                 itemtap: function (list, index) {
                        var record = list.getStore().getAt(index);
                        var rdesc = record.get('description');
                        var rSupp = record.get('supplier_name');
                        var rOffe = record.get('offer_ID');
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
                            params: {'collectorId': '1', 'offerId': rOffe},
                            success: function(result, response) {
                                Ext.Msg.alert('Booking', "Accepted:" + result.responseText, Ext.emptyFn);
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