Ext.define('Ark.models.Customer', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name',  type: 'string'},
        {name: 'email',   type: 'string'},
        {name: 'created',   type: 'date'},
        {name: 'orders_count',   type: 'float'},
        {name: 'total_spent',   type: 'float'},
 		{name: 'country_code',   type: 'string'} 
    ]	
});

Ark.models.Customer.addStatics({
	
	find: function(email, handler){
		Ext.Ajax.request({
		    url: 'customers/' + email.replace(/\./g,"_DOT_"),
		    method: 'GET',
		    success: function(result, request) {
			    var json = Ext.decode(result.responseText);
				handler(json.customer);
			},
		    failure: function(result, request) {
		        Ext.Msg.alert('Error!', 'There was a problem while loading the data...');
		    }
		});
	}
	
});