bringthefood.controllers.collectorController = new Ext.Controller({
    markersArray: [],
    countMarkers: [],

    goHome: function(){
        //        var old_carousel = bringthefood.views.offerslist.getComponent('carousel');
        //
        //        if (old_carousel){
        //            bringthefood.views.offerslist.remove(old_carousel);
        //            bringthefood.views.offerslist.doComponentLayout();
        //        }

        //        for (i in bringthefood.views.offerslist.items){
        //            item = bringthefood.views.offerslist.items[i];
        //            bringthefood.views.offerslist.remove(item);
        //        }
        var carousel = bringthefood.views.offerslist;
        carousel.removeAll();
        //bringthefood.views.offerslist.doComponentLayout();


        animation = {
            type: 'slide',
            direction: 'right'
        };
        bringthefood.views.viewport.setActiveItem(bringthefood.views.offersmap,animation);
    },

    refreshMap: function(options){
        if (this.markersArray.length > 0){
            for (i in this.markersArray){
                this.markersArray[i].setMap(null);
                this.markersArray.length = 0;
                this.offersAtMarker.length = 0;
            }
        }

        bringthefood.stores.offersStore.clearFilter(true);
        var offers = bringthefood.stores.offersStore.load();
        var data = offers.data;

        for (var i = 0; i < data.length; i++) {
            var offer = data.items[i].data;

            if (offer.latitude && offer.longitude) {
                var position = new google.maps.LatLng(offer.latitude, offer.longitude);

                if (!this.markersArray.contains(position)){
                    this.countMarkers.push(1);
                    this.markersArray.push(position);
                } else {
                    idx = this.markersArray.indexOf(position);
                    this.countMarkers[idx]++;
                }

            }
        }

        if (this.markersArray.length > 0){
            for (i=0; i<this.markersArray.length; i++){
                this.addMarker(options.map, this.markersArray[i]);
            }
        }
    },

    addMarker: function(map, position){

        var marker = new google.maps.Marker({
            map: map,
            position: position
        });

        google.maps.event.addListener(marker, "click", function() {  //added this function
            Ext.dispatch({
                controller: bringthefood.controllers.collectorController,
                action: 'listOffersAt',
                pos: position
            });
        });
        
    },

    listOffersAt: function(options){
        position = options.pos;
        var store = bringthefood.stores.offersStore;

        store.clearFilter(true);
        store.load();
        store.filter('latitude', position.lat().toFixed(4));
        store.filter('longitude', position.lng().toFixed(4));

        var items = [];

        store.each(function(rec){
            var locked = rec.get('status');
            var lockBtn = new Ext.Button({
                id: 'lockBtn',
                xtype: 'button',
                text: 'Lock',
                handler: function(){
                    Ext.Ajax.request({
                        url: 'include/offers.php?action=lock&offerId='+rec.get('offer_id'),
                        waitMsg: 'Please wait while I do some stuff',
                        success: function(resp){
                            if (resp.success != true){
                                Ext.Msg.alert('Error!', 'You cannot lock this offer!!',Ext.emptyFn);
                            }
                        }
                    })
                }
            });

            if (locked == 'booked'){
                lockBtn.setText('This offer is already locked!');
                lockBtn.setEnabled(false);
            }

            items.push(new Ext.Panel({
                store: store,
                offer_id: rec.get('offer_id'),
                layout: 'vbox',
                items:[
                {
                    html: rec.get('desc')
                },
                lockBtn
                ]
            }));
        });

        //        var carousel = new Ext.Carousel({
        //            items: items,
        //            itemId: 'carousel',
        //            fullscreen: true,
        //            layout: 'fit'
        //        });

        bringthefood.views.offerslist.add(items);
        //if (bringthefood.views.offerslist.rendered)
        //      bringthefood.views.offerslist.setActiveItem(items[0].id);

        bringthefood.views.viewport.setActiveItem(bringthefood.views.offerslist);
        bringthefood.views.offerslist.doLayout();

    },

    lockOffer: function(id){

    }

});