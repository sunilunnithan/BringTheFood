bringthefood.controllers.collectorController = new Ext.Controller({
    posArray: [],
    countMarkers: [],
    markersArray: [],
    popup: [],

    goHome: function(){
        animation = {
            type: 'slide',
            direction: 'right'
        };
        bringthefood.views.viewport.setActiveItem(bringthefood.views.collector_main,animation);
    },

    goList: function(){
        bringthefood.stores.offersStore.clearFilter(true);
        bringthefood.stores.offersStore.load({
            scope: this,
            callback: function(){
                bringthefood.stores.offersStore.filter('status','available');
                bringthefood.views.viewport.setActiveItem(bringthefood.views.avoffers);
            }
        });   
    },

    goMap: function(){
        bringthefood.views.viewport.setActiveItem(bringthefood.views.offersmap);
    },

    goBackToMap: function(){
        var carousel = bringthefood.views.offerslist;
        carousel.removeAll();

        animation = {
            type: 'slide',
            direction: 'right'
        };

        bringthefood.views.viewport.setActiveItem(bringthefood.views.offersmap,animation);
    },

    manageAccount: function(){
        bringthefood.views.accountMgmt.origin = 'collector';
        bringthefood.views.viewport.setActiveItem(bringthefood.views.accountMgmt);
    },

    refreshMap: function(options){
        if (this.markersArray.length > 0){
            for (var i=0; i<this.markersArray.length; i++){
                this.markersArray[i].setMap(null);
            }
            this.posArray.length = 0;
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

                        var alreadyThere = false;

                        for (var j=0; j<this.posArray.length; j++){
                            if ((this.posArray[j].lat() == position.lat())&&(this.posArray[j].lng() == position.lng())){
                                alreadyThere = true;
                                break;
                            }
                        }

                        if (!alreadyThere){
                            this.countMarkers.push(1);
                            this.posArray.push(position);
                        } else {
                            idx = this.posArray.indexOf(position);
                            this.countMarkers[idx]++;
                        }

                    }
                }

                if (this.posArray.length > 0){
                    for (i=0; i<this.posArray.length; i++){
                        //this.addMarker(options.map, this.posArray[i]);

                        var pos = this.posArray[i];

                        var marker = new google.maps.Marker({
                            map: options.map,
                            position: pos
                        });

                        google.maps.event.addListener(marker, "click", function(event) {  //added this function
                            
                            Ext.dispatch({
                                controller: bringthefood.controllers.collectorController,
                                action: 'listOffersAt',
                                pos: event.latLng
                            });
                        });

                        this.markersArray[i] = marker;

                    }
                }
            }
        });
        
    },

    listOffersAt: function(options){
        var position = options.pos;
        var store = bringthefood.stores.offersStore;

        store.clearFilter(true);
        store.load({
            scope: this,
            callback:function(records,operation,success){
                store.filter('latitude', position.lat().toFixed(4));
                store.filter('longitude', position.lng().toFixed(4));

                var items = [];

                store.each(function(record){
                    var offercard = new bringthefood.views.OfferCard({
                        offer: record
                    });
                    offercard.updateContent();
                    //offercard.doLayout();

                    //offercard.offer = records[i];
                    var locked = record.get('status');
                    var lockBtn = offercard.getComponent('lockbtn');


                    if (locked == 'booked'){
                        lockBtn.setText('This offer is already locked!');
                        lockBtn.setDisabled(true);
                    }

                    items.push(offercard);
                });

                bringthefood.views.offerslist.add(items);
                bringthefood.views.offerslist.getComponent('titlebar').setTitle('Offers Here (' + items.length + ')');
                bringthefood.views.viewport.setActiveItem(bringthefood.views.offerslist);
                bringthefood.views.offerslist.doLayout();
            }
        });
        

    },

    showOffer: function(options){
        record = options.offer;
        index = record.get('offer_id');
        
        //if (!this.popup[index]){
            this.popup[index] = new bringthefood.views.OfferCard({
                offer: record,
                floating: true,
                fullscreen: false,
                modal: true,
                centered: true,
                width: 300,
                height: 400
            });
        //}

        this.popup[index].show('pop');

    },

    lockOffer: function(options){
        Ext.Ajax.request({
            url: 'include/offers.php?action=lock&offerId='+options.offer_id,
            waitMsg: 'Please wait while I do some stuff',
            success: function(response){
                var resp = Ext.decode(response.responseText);
                if (resp.success != true){
                    Ext.Msg.alert('Error!', 'You cannot lock this offer!!',Ext.emptyFn);
                } else {
                    Ext.Msg.alert('Done!', 'You have reserved this offer!!',Ext.emptyFn);
                }
            }
        })
    }

});