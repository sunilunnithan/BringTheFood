bringthefood.views.AvailableOffersList = Ext.extend(Ext.Panel,{
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Available Offers',
        dock: 'top',
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
                    controller: bringthefood.controllers.collectorController,
                    action: 'goHome'
                });
            }
        },
        {
            xtype:'spacer'
        },
        {
            xtype: 'button',
            iconCls: 'maps',
            handler: function(){
                Ext.dispatch({
                    controller: bringthefood.controllers.collectorController,
                    action: 'goMap'
                });
            }
        }
        ]
    }],
    items: [{
        xtype: 'list',
        emptyText: 'No offer available',
        store: bringthefood.stores.offersStore,
        grouped: false,
        //indexBar: true,
        scroll: 'vertical',
        fullscreen: true,
        
        itemTpl: [
        '<div><b>{desc}</b> for <b>{peopleserved}</b></div>',
        '<div class="offer datetime">from <b>{avdate:date("d/m/Y")}</b> at <b>{avtime}</b></div>',
        '<div class="offer instructions">',
        '</div>'
        ],

        listeners: {
            itemtap:function(panel,index){
                Ext.dispatch({
                    controller: bringthefood.controllers.collectorController,
                    action: 'showOffer',
                    offer: panel.store.getAt(index)
                });
            }
        }
        
    }]
});