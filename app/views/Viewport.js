bringthefood.views.Viewport = Ext.extend(Ext.Panel, {
    // Let's set some config options for the panel.
    fullscreen: true,
    layout: 'card',
    cardSwitchAnimation: 'slide',

    // Now, we initialize it.
    initComponent: function() {

        //This makes the card available to other classes
        Ext.apply(bringthefood.views,{
            loginForm: new bringthefood.views.Login(),
            regForm: new bringthefood.views.Registration(),
            offersmap: new bringthefood.views.OffersMap(),
            supplier_main: new bringthefood.views.SupplierMain(),
            myoffers: new bringthefood.views.MyOffersList(),
            publishoffer: new bringthefood.views.PublishOffer(),
            editoffer: new bringthefood.views.EditOffer(),
            offerslist: new bringthefood.views.OffersList()
        });

        //determining the order of things
        var items = [
            bringthefood.views.loginForm,
            bringthefood.views.regForm,
            bringthefood.views.offersmap,
            bringthefood.views.supplier_main,
            bringthefood.views.myoffers,
            bringthefood.views.publishoffer,
            bringthefood.views.editoffer,
            bringthefood.views.offerslist
            ]

        // Let's add our view to the Viewport.
        // This is defined in the "views" folder under its respective name.
        Ext.apply(this, {
            items: items
        });

        Ext.Ajax.request({
            url: 'include/login.php',
            scope: this,
            waitMsg: 'Please wait while I do some stuff',
            success: function(response){
                var resp = Ext.decode(response.responseText);
                animation = {
                    type: 'fade'
                };
                //this has to be changed. now the login screen is seen for a few seconds COMPLETE THIS!!
                switch (resp.role){
                    case 'collector':
                        bringthefood.views.viewport.setActiveItem(bringthefood.views.offersmap,animation);
                        break;
                    case 'supplier':
                        bringthefood.views.viewport.setActiveItem(bringthefood.views.supplier_main,animation);
                        break;
                    default:
                        break;
                }
            }
        });

        // Similar to calling "super" in languages like Java.  Kicks off initialization in parent classes.
        bringthefood.views.Viewport.superclass.initComponent.apply(this, arguments);
    }

});