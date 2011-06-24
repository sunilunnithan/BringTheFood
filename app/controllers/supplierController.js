bringthefood.controllers.supplierController = new Ext.Controller({
    manageOffers: function(){
       bringthefood.views.viewport.setActiveItem(bringthefood.views.publishoffer);
    },

    goBack: function(){
        bringthefood.views.viewport.setActiveItem(bringthefood.views.supplier_main);
    }
});