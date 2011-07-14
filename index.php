<html>
    <head>       
        <title>Bring the Food!</title>

        <link rel="stylesheet" href="lib/touch/resources/css/sencha-touch.css" type="text/css">
        <script type="text/javascript" src="http://dev.sencha.com/deploy/touch/sencha-touch-debug.js"></script>
        <script type="text/javascript">
            //ugly workaround for map markers tap/click
            Ext.gesture.Manager.onMouseEventOld = Ext.gesture.Manager.onMouseEvent;
            Ext.gesture.Manager.onMouseEvent = function(e) {
                var target = e.target;

                while (target) {
                    if (Ext.fly(target) && Ext.fly(target).hasCls('x-map')) {
                        return;
                    }

                    target = target.parentNode;
                }

                this.onMouseEventOld.apply(this, arguments);
            };
        </script>

        <!-- Main app -->
        <script type="text/javascript" src="app/btf.js"></script>

        <!-- Google maps API -->
        <script type="text/javascript" src="http://maps.google.com/maps/api/js?sensor=true"></script>

        <!-- Models -->
        <script type="text/javascript" src="app/models/offerModel.js"></script>

        <!-- Stores -->
        <script type="text/javascript" src="app/stores/offersStore.js"></script>

        <!-- Views -->
        <script type="text/javascript" src="app/views/Viewport.js"></script>
        <script type="text/javascript" src="app/views/Login.js"></script>
        <script type="text/javascript" src="app/views/Registration.js"></script>
        <script type="text/javascript" src="app/views/Account.js"></script>

        <!-- Collector views -->
        <script type="text/javascript" src="app/views/collector/OfferCard.js"></script>
        <script type="text/javascript" src="app/views/collector/LockButton.js"></script>
        <script type="text/javascript" src="app/views/collector/OffersMap.js"></script>
        <script type="text/javascript" src="app/views/collector/OffersList.js"></script>

        <!-- Supplier Views -->
        <script type="text/javascript" src="app/views/supplier/SupplierMain.js"></script>
        <script type="text/javascript" src="app/views/supplier/PublishOffer.js"></script>
        <script type="text/javascript" src="app/views/supplier/EditOffer.js"></script>
        <script type="text/javascript" src="app/views/supplier/MyOffersList.js"></script>

        <!-- Controllers -->
        <script type="text/javascript" src="app/controllers/loginController.js"></script>
        <script type="text/javascript" src="app/controllers/registrationController.js"></script>
        <script type="text/javascript" src="app/controllers/collectorController.js"></script>
        <script type="text/javascript" src="app/controllers/supplierController.js"></script>

    </head>

    <body>

    </body>
</html>
