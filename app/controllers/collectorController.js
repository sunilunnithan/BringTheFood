bringthefood.controllers.collectorController = new Ext.Controller({
    markersArray: [],
    countMarkers: [],

    goHome: function(map){
        
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
            for (i in this.markersArray){
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
        bringthefood.stores.offersStore.clearFilter(true);
        bringthefood.stores.offersStore.load();
        bringthefood.stores.offersStore.filter('latitude', position.lat().toFixed(4));
        bringthefood.stores.offersStore.filter('longitude', position.lng().toFixed(4));

        bringthefood.views.viewport.setActiveItem(bringthefood.views.offerslist);

    }
});