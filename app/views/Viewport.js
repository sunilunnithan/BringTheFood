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
            regForm: new bringthefood.views.Registration()
        });

        // Let's add our view to the Viewport.
        // This is defined in the "views" folder under its respective name.
        Ext.apply(this, {
            items: [
            bringthefood.views.loginForm,
            bringthefood.views.regForm
            ]
        });

        // Similar to calling "super" in languages like Java.  Kicks off initialization in parent classes.
        bringthefood.views.Viewport.superclass.initComponent.apply(this, arguments);
    }

});