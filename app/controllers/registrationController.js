bringthefood.controllers.registrationController = new Ext.Controller({
   goBack: function(){
       animation = {
           type: 'slide',
           direction: 'right'
       };
       bringthefood.views.viewport.setActiveItem(bringthefood.views.loginForm,animation);
   },

   register: function(){
        bringthefood.views.regForm.submit({
            waitMsg: {
                message: 'Please wait...'
            },
            success: function(form, result){
                Ext.Msg.alert('Success!','You have been registered and may now login',Ext.emptyFn);
            },
            failure: function(form, result){
                //var resp = action.result;
                //var jsonResp = Ext.util.JSON.decode(result);

                Ext.Msg.alert('Registration failed!',result.message,Ext.emptyFn);
                bringthefood.views.regForm.reset();
            }
        });
   }
});