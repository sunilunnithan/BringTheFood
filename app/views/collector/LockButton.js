bringthefood.views.LockButton = Ext.extend(Ext.Button, {
    xtype: 'lockbutton',
    ui: 'confirm',
    text: 'Lock',
    offer: undefined,
    margin: '10px',
    padding: '.5em',
    height: '50px',
    width: '100px',
    handler: function(){
        Ext.dispatch({
            controller: bringthefood.controllers.collectorController,
            action: 'lockOffer',
            offer: this.offer
        });

        if (this.up('carousel')){
            Ext.dispatch({
                controller: bringthefood.controllers.collectorController,
                action: 'goBackToMap'
            });
        } else if (this.up('panel')) {
            this.up('panel').hide();
        }
    }
});

Ext.reg('lockbutton',bringthefood.views.LockButton);