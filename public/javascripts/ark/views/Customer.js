Ext.define('Ark.views.Customer', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
		'Ext.Date',
		'Ark.views.CustomerPanels'
    ],

    id:'customer',

    init : function(){
        this.launcher = {
            text: 'Customer',
            iconCls:'icon-grid',
            handler : this.createWindow,
            scope: this
        };
    },

    createWindow : function(args){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('customer');
        var setCustomer = function(customer){
			win.setTitle('Customer: ' + customer.first_name + " " + customer.last_name)
	        win.add(Ark.views.CustomerPanels.namePanel(customer)) //namePanel(customer);
			for(i in customer.addresses){
				var address = customer.addresses[i];
				win.add(Ark.views.CustomerPanels.addressPanel(address));
			}
		};
				
        if(!win){
            win = desktop.createWindow({
                id: 'customer:' + args.key,
                title:'Customer:',
                width:370,
                height:400,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
				listeners: {
					show: function(){
					   Ark.models.Customer.find(args.key, setCustomer);
					}
				},
                layout: 'accordion',
                defaults: {
				        // applied to each contained panel
				        bodyStyle: 'padding:15px'
				},
				layoutConfig: {
				        // layout-specific configs go here
				        titleCollapse: false,
				        animate: true,
				        activeOnTop: true
				 },
                tbar:[{
                    text:'Add Something',
                    tooltip:'Add a new row',
                    iconCls:'add'
                }, '-', {
                    text:'Options',
                    tooltip:'Blah blah blah blaht',
                    iconCls:'option'
                },'-',{
                    text:'Remove Something',
                    tooltip:'Remove the selected item',
                    iconCls:'remove'
                }]
            });
        }
        win.show();
        return win;
    }
});


