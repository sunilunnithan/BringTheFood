Ext.regModel("bringthefood.models.offerModel",{
    fields:[
        {name: 'offer_id',type:'int'},
        {name: 'supplier_id',type:'int'},
        {name: 'description',type:'string'},
        {name: 'status',type:'string'},
        {name: 'available_date',type:'date'},
        {name: 'available_time',type:'string'},
        {name: 'expiry_date',type:'date'},
        {name: 'expiry_time',type:'string'},
        {name: 'image',type:'string'},
        {name: 'people_served',type:'int'},
        {name: 'street',type:'string'},
        {name: 'zip',type:'string'},
        {name: 'city',type:'string'},
        {name: 'country',type:'string'},
        {name: 'latitude',type:'float'},
        {name: 'longitude',type:'float'}
    ]
});