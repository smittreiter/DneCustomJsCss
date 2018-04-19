Ext.define('Shopware.apps.DneCustomJsCss.model.JsCss', {
    extend : 'Ext.data.Model', 
    fields : [ 
        {
            name: 'id', 
            type: 'integer',
            useNull: true,
            defaultValue: null
        }, 
        {
            name: 'name', 
            type: 'string'
        }, 
        {
            name: 'js',
            type: 'string'
        },
        {
            name: 'css',
            type: 'string'
        },
        {
            name: 'shopIds'
        },
        {
            name: 'active',
            type: 'boolean',
            defaultValue: 1
        },
    ],
    proxy: {
        type : 'ajax', 
        api:{
            read : '{url action=list}',
            create : '{url action="create"}',
            update : '{url action="update"}',
            destroy : '{url action="delete"}'
        },
        reader : {
            type : 'json',
            root : 'data',
            totalProperty: 'totalCount'
        }
    }
});
