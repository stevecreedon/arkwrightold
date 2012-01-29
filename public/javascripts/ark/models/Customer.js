Ext.define('Ark.models.Customer', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'key',  type: 'string'},
        {name: 'name',  type: 'string'},
        {name: 'email',   type: 'string'},
        {name: 'created',   type: 'date'},
        {name: 'orders_count',   type: 'float'},
        {name: 'total_spent',   type: 'float'},
 		{name: 'country_code',   type: 'string'} 
    ]	
});

Ark.models.Customer.addStatics({
	
	find: function(key, handler){
		Ext.Ajax.request({
		    url: 'customers/' + key,
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

Ext.create('Ext.data.Store', {
    model: 'Ark.models.Customer',
    proxy: {
	        type: 'ajax',
	        url : '/customers',
	        reader: {
	            type: 'json',
	            root: 'customers'
	        }
	},
    autoLoad: true,
	storeId: 'customers_index'
})