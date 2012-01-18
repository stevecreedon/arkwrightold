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
		};
		var namePanel = function(customer){
			var panel = win.items.items[0];
			html = [];
			console.log(customer)
			created = new Date(customer.created_at);
			console.log(created)
			html.push("<h1>" + customer.first_name + " " + customer.last_name + "</h1>");
			html.push("<div>" + customer.addresses[0].city + ", " + customer.addresses[0].country + "</div>")
			html.push("<div><a href='mailto:" + customer.email + "'>" + customer.email + "</a></div>");
			html.push("<div>accepts marketing? " + customer.accepts_marketing + "</div>");
			html.push("<div>became customer on " + Ext.Date.format(created, Ext.Date.format(created, 'd-m-Y')) + "</div>");
			html.push("<div>Orders: " + customer.orders_count + "</div>");
			html.push("<div>Spent: £" + customer.total_spent + "</div>");
			panel.update(html.join("")); 
		}
        if(!win){
            win = desktop.createWindow({
                id: 'customer',
				email: email,
                title:'Customer',
                width:740,
                height:480,
                iconCls: 'icon-grid',
                animCollapse:false,
                constrainHeader:true,
				listeners: {
					show: function(){
						Ext.Ajax.request({
						    url: 'customers/' + email.replace(/\./g,"_"),
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
				 items: [{
				        title: 'Contact',
				        html: 'Panel content!'
				    },{
				        title: 'Panel 2',
				        html: 'Panel content!'
				    },{
				        title: 'Panel 3',
				        html: 'Panel content!'
				  }],
				  //renderTo: Ext.getBody(),
				
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


