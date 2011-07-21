Ext.regModel("bringthefood.models.offerModel",{
    fields:[
        {name: 'offer_id',type:'int'},
        {name: 'supplier_id',type:'int'},
        {name: 'supplier_name',type:'string'},
        {name: 'collector_id',type:'int'},
        {name: 'collector_name',type:'string'},
        {name: 'desc',type:'string'},
        {name: 'status',type:'string'},
        {name: 'avdate',type:'date'},
        {name: 'avtime',type:'time'},
        {name: 'expdate',type:'date'},
        {name: 'exptime',type:'time'},
        {name: 'image',type:'string'},
        {name: 'peopleserved',type:'int'},
        {name: 'street',type:'string'},
        {name: 'zip',type:'string'},
        {name: 'city',type:'string'},
        {name: 'country',type:'string'},
        {name: 'phone',type:'string'},
        {name: 'latitude',type:'number'},
        {name: 'longitude',type:'number'}
    ]
});