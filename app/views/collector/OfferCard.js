bringthefood.views.OfferCard = Ext.extend(Ext.Panel,{
    
    offer: null,
    layout: 'vbox',

    items:[
        {
            xtype: 'panel',
            id: 'offerdesc',
            tpl: [
                '<h1>{desc}</h1>',
                '<ul>',
                '<li>Supplier: {supplier_name}</li>',
                '</ul>',
                '<div><img src="images/food_placeholder.jpg" width="100%"></div>'
            ]
        },
        {
            xtype: 'lockbutton',
            id: 'lockbtn'
        }
    ],
    listeners:{
        show: function(){
            this.updateContent();
        }
    },

//    show: function(){
//        this.updateContent();
//    },

    updateContent: function(){
        this.getComponent('offerdesc').update(this.offer.data);
        this.getComponent('lockbtn').offer_id = this.offer.get('offer_id');
    }
    
});