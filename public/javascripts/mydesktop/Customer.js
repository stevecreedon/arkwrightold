Ext.define('MyDesktop.Customer', {
    extend: 'Ext.ux.desktop.Module',

    requires: [
        'Ext.data.ArrayStore',
        'Ext.util.Format',
        'Ext.grid.Panel',
        'Ext.grid.RowNumberer',
		'Ext.Date'
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

    createWindow : function(email){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow('customer');
        var setCustomer = function(result, request){
			var json = Ext.decode(result.responseText);
	        namePanel(json.customer);
			for(i in json.customer.addresses){
				var address = json.customer.addresses[i];
				addressPanel(address);
			}
		};
		var namePanel = function(customer){
			var panel = new Ext.Panel({title:"customer"})
			var created = new Date(customer.created_at);
			var builder = new Ext.ux.desktop.HtmlBuilder();
			
			builder.add(customer.first_name + " " + customer.last_name, "h1");
			builder.add(customer.addresses[0].city + ", " + customer.addresses[0].country);
			builder.add("<a href='mailto:" + customer.email + "'>" + customer.email + "</a>");
			builder.add("accepts marketing? " + customer.accepts_marketing);
			builder.add("became customer on " + Ext.Date.format(created, Ext.Date.format(created, 'd-m-Y')));
			builder.add("Orders: " + customer.orders_count);
			builder.add("Spent: £" + customer.total_spent);
			
			panel.update(builder.html());
			win.add(panel);
		};
		
		var addressPanel = function(address){
			var panel = new Ext.Panel({title:"address"});
			var builder = new Ext.ux.desktop.HtmlBuilder();
			
			builder.add(address.address1);
			builder.add(address.address2);
			builder.add(address.province);
			builder.add(address.city);
			builder.add(address.zip);
			builder.add(address.country);
			
			panel.update(builder.html());
			win.add(panel);
		}
		
        if(!win){
            win = desktop.createWindow({
                id: 'customer' + email,
				email: email,
                title:'Customer: ' + email,
                width:370,
                height:400,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
				listeners: {
					show: function(){
						Ext.Ajax.request({
						    url: 'customers/' + email.replace(/\./g,"_DOT_"),
						    method: 'GET',
						    success: setCustomer,
						    failure: function(result, request) {
						        Ext.Msg.alert('Error!', 'There was a problem while loading the data...');
						    }
						});
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


