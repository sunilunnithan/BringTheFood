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

    goCommitments: function(){
        bringthefood.stores.offersStore.clearFilter(true);
        bringthefood.stores.offersStore.load({
            scope: this,
            callback: function(){
                bringthefood.stores.offersStore.filter('status','booked');
                bringthefood.stores.userStore.load({
                    callback: function(){
                        var uid = bringthefood.stores.userStore.getAt(0).get('user_id');
                        bringthefood.stores.offersStore.filter('collector_id',uid);
                        bringthefood.views.viewport.setActiveItem(bringthefood.views.commitments);
                    } 
                });

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
                bringthefood.stores.offersStore.filter('status','available');

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

                    lockBtn.addListener('tap',function(){
                        bringthefood.views.viewport.setActiveItem(bringthefood.views.offersmap);
                    });

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

        this.popup[index].getComponent('offerdesc').update(record.data);
        this.popup[index].getComponent('offerdesc').doComponentLayout();
        this.popup[index].getComponent('lockbtn').offer = record;

        this.popup[index].doLayout();

        this.popup[index].show('pop');

    },

    lockOffer: function(options){
        var desc = options.offer.get('desc');
        var expdate = options.offer.get('expdate');//.format("d/m/Y");
        var exptime = options.offer.get('exptime');
        exptime = exptime.substring(0,exptime.length-3);

        Ext.Msg.confirm('Lock this offer?','You are committing to pick up <b>' + desc + '</b> by <b>' + expdate + ' at ' + exptime + '</b>. Are you sure?',function(res){
            if (res == 'yes'){
                Ext.Ajax.request({
                    url: 'include/offers.php?action=lock&offerId='+options.offer.get('offer_id'),
                    waitMsg: 'Please wait while I do some stuff',
                    success: function(response){
                        var resp = Ext.decode(response.responseText);
                        if (resp.success != true){
                            Ext.Msg.alert('Error!', 'You cannot lock this offer!!',Ext.emptyFn);
                        } else {
                            bringthefood.stores.offersStore.load({
                                callback: function(){
                                    Ext.Msg.alert('Done!', 'You have reserved this offer!!',Ext.emptyFn);
                                }
                            })
                    
                        }

                
                    }
                });
            }
        });

    },

    unlockOffer: function(options){
        Ext.Msg.confirm('Retract Commitment','Are you sure you want to retract this commitment?',function(ans){
            if (ans == 'yes'){
                Ext.Ajax.request({
                    url: 'include/offers.php?action=unlock&offerId='+options.offer_id,
                    waitMsg: 'Please wait while I do some stuff',
                    success: function(response){
                        var resp = Ext.decode(response.responseText);
                        if (resp.success != true){
                            Ext.Msg.alert('Error!', 'You cannot lock this offer!!',Ext.emptyFn);
                        } else {
                            bringthefood.stores.offersStore.load({
                                callback: function(){
                                    Ext.Msg.alert('Done!', 'You have reserved this offer!!',Ext.emptyFn);
                                }
                            })

                        }
                    }
                })
            }
        });

        
    }

});