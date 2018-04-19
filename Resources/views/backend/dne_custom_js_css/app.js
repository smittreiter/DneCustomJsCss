Ext.define('Shopware.apps.DneCustomJsCss', {
    extend:'Enlight.app.SubApplication',
    name:'Shopware.apps.DneCustomJsCss',
    bulkLoad: true,
    loadPath: '{url action=load}',
    controllers: ['Main'],
    models: [ 'JsCss' ],
    views: [ 'main.Window', 'main.List', 'main.Detail' ],
    stores: [ 'JsCss' ],
 
    /** Main Function
     * @private
     * @return [object] mainWindow - the main application window based on Enlight.app.Window
     */
    launch: function() {
        var me = this;
        var mainController = me.getController('Main');
 
        return mainController.mainWindow;
    }
});
