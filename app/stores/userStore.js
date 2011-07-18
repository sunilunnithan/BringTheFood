bringthefood.stores.userStore = new Ext.data.Store({
    model: 'bringthefood.models.userModel' ,
    //autoLoad: true,
    proxy: {
        type: 'ajax',
        url: 'include/myaccount.php',
        extraParams: {
            format: 'json'
        },
        reader: {
            root: 'myaccount'
        }

    }
});