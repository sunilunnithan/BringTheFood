Ext.setup({
    onReady : function(){
        var loginPanel = new Ext.form.FormPanel({
            title: 'Login',
            id: 'loginform',
            
            fullscreen: true,
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
                    name: 'pass',
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
                    //do stuff here
                    }
                }
            ]
        });

        loginPanel.render('login');
    }
});