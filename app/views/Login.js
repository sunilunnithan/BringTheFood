bringthefood.views.Login = Ext.extend(Ext.form.FormPanel,{
    title: 'Login',
    id: 'loginform',
    fullscreen: true,
    layout: {
        type: 'vbox',
        pack: 'center'
    },
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
            vtype: 'email',
            required: true
        },
        {
            xtype: 'passwordfield',
            label: 'Password',
            name: 'password',
            vtype: 'password',
            required: true
        },

        ]
    },
    {
        xtype: 'button',
        text: 'Login',
        name: 'loginBtn',
        style: 'margin-top: .5em; padding: .5em',
        width: '200px',
        centered: true,
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
        width: '200px',
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