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