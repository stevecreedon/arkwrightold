// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
Ext.Loader.setConfig({enabled: true});

Ext.Loader.setPath({
      'Ext': 'javascripts/ext',
      'Ext.ux.desktop': 'javascripts/extjs',
	   'Ark': 'javascripts/ark'
});

requires: [
    'Ext.ux.desktop.HtmlBuilder',
    'Ext.data.JsonStore',
    'Ext.util.Format',
    'Ext.grid.Panel',
    'Ext.grid.RowNumberer',
    'Ark.models.Customer',
	'Ext.data.Store',
]

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

Ext.require('Ark.App');

  var myDesktopApp;
  Ext.onReady(function () {
      myDesktopApp = new Ark.App();
  });






