Ext.setup({
    icon: 'icon.png',
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    glossOnIcon: false,
    onReady: function(){

        var supplierBtn = new Ext.Button({
            text: 'Food Supplier',
            ui: 'round',
            padding: 20,
            margin: 5,
            handler: function(){
                location.href = 'food_supplier/index.html'
            }
        });

        var collectorBtn = new Ext.Button({
            text: 'Food Collector',
            ui: 'round',
            padding: 20,
            margin: 5,
            handler: function(){
                location.href = 'food_collector/index.html'
            }
        });

        var distributorBtn = new Ext.Button({
            text: 'Food Distributor',
            ui: 'round',
            padding: 20,
            margin: 5,
            handler: function(){
                location.href = 'food_distributor/index.html'
            }
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
                title: 'Bring the Food!'
            },
            supplierBtn,
            collectorBtn,
            distributorBtn
            ]
        });

        panel.render('index-panel');

    }
});
