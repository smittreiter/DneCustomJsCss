//{namespace name=backend/plugins/dn/customjscss}
//
Ext.define('Shopware.apps.DneCustomJsCss.controller.Main', {
    /**
     * Extend from the standard ExtJS 4 controller
     * @string
     */
    extend: 'Ext.app.Controller',
    mainWindow: null,
    /**
     * Creates the necessary event listener for this
     * specific controller and opens a new Ext.window.Window
     * to display the subapplication
     *
     * @return void
     */
    init: function() {
        var me = this;

        me.getStore('JsCss').load({
            scope: this,
            callback: function(records, operation, success) {
                me.mainWindow = me.getView('main.Window').create({
                    mainStore: me.getStore('JsCss'),
                    record: Ext.create('Shopware.apps.DneCustomJsCss.model.JsCss')
                });
            }
        });        

        me.callParent(arguments);
        me.control({
            'custom-js-css-detail button[action=save]' : {
                'click' : function(btn) {
                    this.onSave(btn);
                }
            },
            'custom-js-css-detail button[action=saveCompile]' : {
                'click' : function(btn) {
                    this.onSaveCompile(btn);
                }
            },
            'custom-js-css-detail button[action=reset]' : {
                'click' : function(btn) {
                    this.onReset(btn);
                }
            },
            'custom-js-css-list button[action=addJs]' : {
                'click' : function (btn) {
                    this.addJs(btn);
                }
            },
            'custom-js-css-list':{
                openJsDetail: me.openJsDetail,
                deleteJs: me.deleteJs
            }
        });
    },

    onSaveCompile: function(btn) {
        var me = this;

        me.onSave(btn);

        Shopware.app.Application.fireEvent('shopware-theme-cache-warm-up-request');
    },

    onSave: function(btn) {
        var win     = btn.up('window'), 
        form    = win.down('form'), 
        formBasis = form.getForm(), 
        me      = this,             
        store   = me.getStore('JsCss'),
        record  = form.getRecord();  
        if (!(record instanceof Ext.data.Model)){
            record = Ext.create('Shopware.apps.DneCustomJsCss.model.JsCss');
        }
        
        formBasis.updateRecord(record);

        if (formBasis.isValid()) {
            record.save({
                params: {
                    id: record.get("id")
                },
                success: function(rec, op) {
                    var newId = op.request.scope.reader.jsonData["id"];
                    if(newId){
                        record.set("id", newId);
                    }
                    store.load();
                    Shopware.Msg.createGrowlMessage('','{s name="jsSaveSuccess"}JavaScript/CSS wurde erfolgreich gespeichert{/s}', '');
                },
                failure: function(rec, op) {
                    store.load();
                    Shopware.Msg.createGrowlMessage('','{s name="jsSaveError"}Fehler beim Speichern des JavaScript/CSS: {/s}'+op.request.scope.reader.jsonData["message"], '');
                    
                }
            });
        }
    },

    onReset: function(btn) {
        var win     = btn.up('window'), 
        form    = win.down('form'), 
        formBasis = form.getForm(), 
        me      = this,             
        store   = me.getStore('JsCss'),
        record  = form.getRecord();  
        if (!(record instanceof Ext.data.Model)){
            record = Ext.create('Shopware.apps.DneCustomJsCss.model.JsCss');
        }
        
        form.loadRecord(record);
    },

    openJsDetail:function (view, rowIndex) {
        var me = this,
        record = me.getStore('JsCss').getAt(rowIndex);
        me.record = record;
        me.detailStore = new Ext.data.Store({
            extend:'Ext.data.Store',
            remoteFilter : true,
            model:'Shopware.apps.DneCustomJsCss.model.JsCss'
        });
        me.detailStore.load({
            params : {
                id: record.get("id")
            },
            callback: function(records, operation) {
                if (operation.success !== true || !records.length) {
                    return;
                }
                me.detailRecord = records[0];
                var win = view.up('window'), 
                form = win.down('form');
                form.loadRecord(me.detailRecord);
            }
        });     
        
    },

    addJs:function (btn) {
        var me = this,
        win = btn.up('window'), 
        form = win.down('form');   
        me.detailRecord = Ext.create('Shopware.apps.DneCustomJsCss.model.JsCss');
        form.loadRecord(me.detailRecord);
    },

    deleteJs: function (view, rowIndex) {
        var me = this,
        store = me.getStore('JsCss'),
        record = store.getAt(rowIndex);
        me.record = record;

        if (me.record instanceof Ext.data.Model && me.record.get('id') > 0) {
            Ext.MessageBox.confirm('Js löschen?', '{s name="jsDeleteAlert"}Sind Sie sicher, dass Sie das JavaScript/CSS löschen wollen?{/s}' , function (response) {
                if ( response !== 'yes' ) {
                    return;
                }
                me.record.destroy({
                    callback: function(operation) {
                        Shopware.Msg.createGrowlMessage('','{s name="jsDeleted"}JavaScript/CSS wurde erfolgreich gelöscht{/s}', 'CustomJsCss');
                        store.load();
                        var win = view.up('window'), 
                        form = win.down('form');   
                        me.detailRecord = Ext.create('Shopware.apps.DneCustomJsCss.model.JsCss');
                        form.loadRecord(me.detailRecord);
                    }
                });
            });
        }
    }
});
 
