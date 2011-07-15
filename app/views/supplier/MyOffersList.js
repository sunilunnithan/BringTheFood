bringthefood.views.MyOffersList = Ext.extend(Ext.Panel,{
    dockedItems: [{
        xtype: 'toolbar',
        title: 'Your Offers',
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
                    controller: bringthefood.controllers.supplierController,
                    action: 'goHome'
                });
            }
        },
        {
            xtype:'spacer'
        },
        {
            xtype: 'button',
            iconCls: 'add',
            handler: function(){
                Ext.dispatch({
                    controller: bringthefood.controllers.supplierController,
                    action: 'newOffer'
                });
            }
        }
        ]
    }],
    items: [{
        xtype: 'list',
        emptyText: 'You haven\'t posted any offer yet',
        store: bringthefood.stores.offersStore,
        grouped: true,
        //indexBar: true,
        scroll: 'vertical',
        fullscreen: true,
        
        itemTpl: [
        '<div><b>{desc}</b> for <b>{peopleserved}</b></div>',
        '<div class="offer datetime">from <b>{avdate}</b> at <b>{avtime}</b></div>',
        '<div class="offer instructions">',
        '<tpl if="status == \'booked\'">Click to confirm pickup</tpl>',
        '<tpl if="status == \'available\'">Click to edit</tpl>',
        '</div>'
        ],

        listeners: {
            itemtap:function(panel,index){
                this.handleOffer(panel.store.getAt(index));
            }
        },

        onItemDisclosure: function (record) {
            this.handleOffer(record);

        },

        handleOffer: function(record){
            var status = record.get('status');

            if (status == 'booked'){
                Ext.dispatch({
                    controller: bringthefood.controllers.supplierController,
                    action: 'confirmPickUp',
                    data: record
                });
            } else {
                Ext.dispatch({
                    controller: bringthefood.controllers.supplierController,
                    action: 'editOffer',
                    data: record
                });
            }
        }
        
    }]
});