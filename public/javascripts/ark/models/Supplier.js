Ext.define('Ark.models.Supplier', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'name',  type: 'string'},
        {name: 'email',   type: 'string'},
        {name: 'www',   type: 'string'},
        {name: 'contact',   type: 'string'},
        {name: 'telephone',   type: 'string'}
    ]
});