Ext.define('Ark.views.CustomerPanels', {});

Ark.views.CustomerPanels.addStatics({
	
	namePanel: function(customer){
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
		return panel;
	},
	addressPanel: function(address){
		var panel = new Ext.Panel({title:"address"});
		var builder = new Ext.ux.desktop.HtmlBuilder();
		
		builder.add(address.address1);
		builder.add(address.address2);
		builder.add(address.province);
		builder.add(address.city);
		builder.add(address.zip);
		builder.add(address.country);
		
		panel.update(builder.html());
		return panel;
	},
	orderPanel: function(order){
		var panel = new Ext.Panel({title:"order"});
		var builder = new Ext.ux.desktop.HtmlBuilder();
		builder.add("Order");
		
		panel.update(builder.html());
		return panel;
	}
	
})

