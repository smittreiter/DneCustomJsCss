Ext.define('Shopware.apps.DneCustomJsCss.store.JsCss', {
    extend: 'Ext.data.Store',
    remoteFilter: true,
    autoLoad: false,
    model: 'Shopware.apps.DneCustomJsCss.model.JsCss',
    pageSize: 20,
    proxy: {
        type: 'ajax',
        url: '{url controller="DneCustomJsCss" action="list"}',
        reader: {
            type: 'json',
            root: 'data',
            totalProperty: 'total'
        }
    }
});
