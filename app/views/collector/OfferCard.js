bringthefood.views.OfferCard = Ext.extend(Ext.Panel,{
    
    offer: null,
    layout: 'vbox',
    scroll: 'vertical',

    items:[
    {
        xtype: 'panel',
        id: 'offerdesc',
        tpl: [
        '<h1 class="offer">{desc}</h1>',
        '<hr>',
        '<ul class="offer">',
        '<li class="offer">Offered by <b>{supplier_name}</b></li>',
        '<tpl if="image">',
        '<div class="offer image full">',
        '<img src="{image}" width="100%">',
        '</tpl>',
        '<tpl if="!image">',
        '<li class="offer noimage"><img src="images/noimageavailable.jpg" width="100%"></li>',
        '</tpl>',
        '<li class="offer">Can be picked up at</li>',
        '<li class="offer location">{street}<br />{zip} {city}, {country}</li>',
        '<tpl if="phone"><li class="offer">Contact<br /><b>{phone}</b></li></tpl>',
        '</ul>',
        '</div>'
        ]
    },
    {
        xtype: 'lockbutton',
        id: 'lockbtn'
    }
    ]
    
});