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
        xtype: 'container',
        html:'<div style="width:100%;"><img src="images/logo.png" align="center"></div>'
    },
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
        {
            xtype: 'togglefield',
            name: 'auto',
            label: 'Remember Login'
        }

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
        //style: 'margin-top: 1em, margin-bottom: -.5em',
        html: "<small>Don't have an account yet?</small>"
    },
    {
        xtype: 'button',
        text: '<small>Register</small>',
        name: 'loginBtn',
        //style: 'margin-top: .5em; padding: .5em',
        width: '150px',
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