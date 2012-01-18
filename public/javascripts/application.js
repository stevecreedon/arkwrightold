// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
Ext.Loader.setConfig({enabled: true});

Ext.Loader.setPath({
      'Ext': 'javascripts/src',
      'Ext.ux.desktop': 'javascripts/extjs',
       MyDesktop: 'javascripts/mydesktop'
});

Ext.override(Ext.ZIndexManager, { 

    tempHidden: [], 

    show: function() { 
        var comp, x, y; 

        while (comp = this.tempHidden.shift()) { 

            x = comp.x; 
            y = comp.y; 

            comp.show(); 
            comp.setPosition(x, y); 

        } 

    } 

});

Ext.define('Customer', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name',  type: 'string'},
        {name: 'email',   type: 'string'},
        {name: 'created',   type: 'date'}
    ]
});


