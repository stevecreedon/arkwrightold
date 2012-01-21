Ext.define('Ark.models.Supplier', {
    extend: 'Ext.data.Model',
    fields: [
		{name: 'id', type: 'string'},
        {name: 'name',  type: 'string'},
        {name: 'email',   type: 'string'},
        {name: 'www',   type: 'string'},
        {name: 'contact',   type: 'string'},
        {name: 'telephone',   type: 'string'}
    ],
	isNew: function(){
		return (this.get('id') == null || this.get('id') == '')
	}
});

Ark.models.Supplier.addStatics({
	
	find: function(email, handler){
		Ext.Ajax.request({
		    url: 'suppliers/' + email.replace(/\./g,"_DOT_"),
		    method: 'GET',
		    success: function(result, request) {
			    var json = Ext.decode(result.responseText);
				handler(json.supplier);
			},
		    failure: function(result, request) {
		        Ext.Msg.alert('Error!', 'There was a problem while loading the data...');
		    }
		});
	}
	
});