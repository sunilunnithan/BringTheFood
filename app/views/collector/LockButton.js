bringthefood.views.LockButton = Ext.extend(Ext.Button, {
    xtype: 'lockbutton',
    text: 'Lock',
    offer_id: '0',
    handler: function(){
        Ext.dispatch({
            controller: bringthefood.controllers.collectorController,
            action: 'lockOffer',
            offer_id: this.offer_id
        });
    }
});

Ext.reg('lockbutton',bringthefood.views.LockButton);