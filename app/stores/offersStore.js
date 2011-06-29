bringthefood.stores.offersStore = new Ext.data.Store({
   model: 'bringthefood.models.offerModel' ,
   proxy: {
       type: 'scripttag',
       url: 'include/offers.php?action=view',
       extraParams: {
           format: 'json'
       }
   }
});