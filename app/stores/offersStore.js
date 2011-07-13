bringthefood.stores.offersStore = new Ext.data.Store({
   model: 'bringthefood.models.offerModel' ,
   //autoLoad: true,
   proxy: {
       type: 'ajax',
       url: 'include/offers.php?action=view',
       extraParams: {
           format: 'json'
       },
       reader: {
           root: 'data'
       },
       sorters: 'supplier_id',
       getGroupString: function(record){
           return record.get('supplier_name')[0];
       }
   }
});