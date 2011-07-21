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
        '<div class="offer image">',
        '<tpl if="image"><img src="{image}" class="offer image"></tpl>',
        '<tpl if="!image"><img src="images/noimageavailable.jpg" class="offer image"></tpl>',
        '</div>',
        '<div class="offer container">',
        '<div><b>{desc}</b> for <b>{peopleserved}</b></div>',
        '<div class="offer datetime">from <b>{avdate:date("d/m/Y")}</b> at <b>{avtime}</b></div>',
        '<div class="offer instructions">',
        '<tpl if="status == \'booked\'">',
        '<tpl if="collector_name"><div class="offer collector">Booked by <b>{collector_name}</b></div></tpl>',
        '<tpl if="!collector_name"><div class="offer locked">Locked</div></tpl>',
        'Click to confirm pickup',
        '</tpl>',
        '<tpl if="status == \'available\'">Click to edit</tpl>',
        '</div>',
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