bringthefood.controllers.collectorController = new Ext.Controller({
    markersArray: [],
    countMarkers: [],

    goHome: function(){

        var carousel = bringthefood.views.offerslist;
        carousel.removeAll();

        animation = {
            type: 'slide',
            direction: 'right'
        };
        
        bringthefood.views.viewport.setActiveItem(bringthefood.views.offersmap,animation);
    },

    refreshMap: function(options){
        if (this.markersArray.length > 0){
            for (var i=0; i<this.markersArray.length; i++){
                this.markersArray[i].setMap(null);
            }
            this.markersArray.length = 0;
            this.countMarkers.length = 0;
        }

        bringthefood.stores.offersStore.clearFilter(true);
        bringthefood.stores.offersStore.load({
            scope:this,
            callback: function(records,operation,success){
                
                for (var i = 0; i < records.length; i++) {
                    var offer = records[i].data;

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
                        //this.addMarker(options.map, this.markersArray[i]);

                        var marker = new google.maps.Marker({
                            map: options.map,
                            position: this.markersArray[i]
                        });

                        google.maps.event.addListener(marker, "click", function() {  //added this function
                            Ext.dispatch({
                                controller: bringthefood.controllers.collectorController,
                                action: 'listOffersAt',
                                pos: position
                            });
                        });

                        this.markersArray[i] = marker;

                    }
                }
            }
        });
        
    },

    addMarker: function(map, position){

       
        
    },

    listOffersAt: function(options){
        position = options.pos;
        var store = bringthefood.stores.offersStore;

        store.clearFilter(true);
        store.load({
            scope: this,
            callback:function(records,operation,success){
                store.filter('latitude', position.lat().toFixed(4));
                store.filter('longitude', position.lng().toFixed(4));

                var items = [];

                for (var i=0; i<records.length; i++){
                    var offercard = new bringthefood.views.OfferCard({
                        offer: records[i]
                    });
                    //offercard.offer = records[i];
                    var locked = records[i].get('status');
                    var lockBtn = offercard.getComponent('lockbtn');
                    

                    if (locked == 'booked'){
                        lockBtn.setText('This offer is already locked!');
                        lockBtn.setDisabled(true);
                    }

                    items.push(offercard);
                }

                bringthefood.views.offerslist.add(items);
                bringthefood.views.viewport.setActiveItem(bringthefood.views.offerslist);
                bringthefood.views.offerslist.doLayout();
            }
        });
        

    },

    lockOffer: function(options){
        Ext.Ajax.request({
            url: 'include/offers.php?action=lock&offerId='+options.offer_id,
            waitMsg: 'Please wait while I do some stuff',
            success: function(resp){
                if (resp.success != true){
                    Ext.Msg.alert('Error!', 'You cannot lock this offer!!',Ext.emptyFn);
                }
            }
        })
    }

});