bringthefood.views.Login = Ext.extend(Ext.form.FormPanel,{
    title: 'Login',
    id: 'loginform',
    fullscreen: true,
    url: 'include/login.php',
    standardSubmit: false,
    items: [
    {
        xtype: 'fieldset',
        title: 'Please enter your e-mail and password',
        items: [
        {
            xtype: 'textfield',
            name: 'email',
            label: 'E-mail',
            vtype: 'email'
        },
        {
            xtype: 'passwordfield',
            label: 'Password',
            name: 'password',
            vtype: 'password'
        },

        ]
    },
    {
        xtype: 'button',
        text: 'Login',
        name: 'loginBtn',
        style: 'margin-top: .5em; padding: .5em',
        ui: 'confirm',
        handler : function(){
            Ext.dispatch({
                controller: bringthefood.controllers.loginController,
                action: 'login'
            });
        }
    },
    {
        xtype: 'button',
        text: 'Register',
        name: 'loginBtn',
        style: 'margin-top: .5em; padding: .5em',
        ui: 'action',
        handler : function(){
            Ext.dispatch({
                controller: bringthefood.controllers.loginController,
                action: 'register'
            });
        }
    }
    ]

});