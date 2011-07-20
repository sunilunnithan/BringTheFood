bringthefood.views.Commitments = Ext.extend(Ext.Panel,{
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Commitments',
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
        }
        ]
    }],
    items: [{
        xtype: 'list',
        emptyText: 'No commitments',
        store: bringthefood.stores.offersStore,
        grouped: false,
        //indexBar: true,
        scroll: 'vertical',
        fullscreen: true,

        itemTpl: [
        '<div><b>{desc}</b> for <b>{peopleserved}</b></div>',
        '<div class="offer datetime">from <b>{avdate}</b> at <b>{avtime}</b></div>',
        '<div class="offer instructions">',
        'Click to retract commitment</div>'
        ],

        listeners: {
            itemtap:function(panel,index){
                Ext.dispatch({
                    controller: bringthefood.controllers.collectorController,
                    action: 'unLockOffer',
                    offer: panel.store.getAt(index)
                });
            }
        }

    }]
});