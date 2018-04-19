//{namespace name=backend/plugins/dn/customjscss}
//
Ext.define('Shopware.apps.DneCustomJsCss.view.main.Detail', {
    extend:'Ext.form.Panel',
    alias:'widget.custom-js-css-detail',
    cls:'custom-js-css-detail',
    collapsible : false,
    bodyPadding : 10,
    split       : false,
    region      : 'center',
    defaultType : 'textfield',
    autoScroll  : true,
    layout      : {
        type: 'vbox',
        align : 'stretch',
        pack  : 'start'
    },
    items : [],

    initComponent: function() {
        var me = this;
        
        me.dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                cls: 'shopware-toolbar',
                ui: 'shopware-ui',
                items: me.getButtons()
            }
        ];
    
        me.jsField = Ext.create('Shopware.form.field.CodeMirror', {
            fieldLabel: '{s name="jsFieldLabel"}JavaScript{/s}',
            xtype: 'codemirrorfield',
            mode: 'javascript',
            labelAlign: 'top',
            anchor: '100%',
            name: 'js',
            flex: 1,
            allowBlank: true
        });

        me.cssField = Ext.create('Shopware.form.field.CodeMirror', {
            fieldLabel: '{s name="cssFieldLabel"}CSS/LESS{/s}',
            xtype: 'codemirrorfield',
            mode: 'css',
            labelAlign: 'top',
            anchor: '100%',
            name: 'css',
            flex: 1,
            allowBlank: true
        });

        me.on('resize', function(cmp, width, height) {
            me.resizeEditor(cmp, cmp.jsField, width, height);
            me.resizeEditor(cmp, cmp.cssField, width, height);
        });

        me.jsField.on('editorready', function() {
            me.resizeEditor(me, me.jsField, me.getWidth(), me.getHeight());
        });

        me.cssField.on('editorready', function() {
            me.resizeEditor(me, me.cssField, me.getWidth(), me.getHeight());
        });
        
        me.items = me.getItems();
        
        me.callParent(arguments);
        me.loadRecord(me.record);
    },

    getItems: function () {
        var me = this;
        return [
            {
                fieldLabel: '{s name="nameFieldLabel"}Name{/s}',
                name: 'name',
                labelWidth: 50,
                anchor: '100%',
                allowBlank: false
            },
            {
                xtype: 'checkbox',
                fieldLabel: '{s name="activeFieldLabel"}aktiv{/s}',
                name: 'active',
                labelWidth: 50,
                inputValue: 1,
                uncheckedValue: 0
            },
            me.getShopSelector(),
            me.jsField,
            me.cssField
        ];
    },

    getButtons: function()
    {
        var me = this;
        return [
            '->',
            {
                text    : '{s name="reset"}Reset{/s}',
                scope   : me,
                cls: 'secondary',
                action  : 'reset'
            },
            {
                text    : '{s name="save"}Save{/s}',
                action  : 'save',
                cls     : 'primary',
                formBind: true
            },
            {
                text    : '{s name="saveCompile"}Save and compile{/s}',
                action  : 'saveCompile',
                cls     : 'primary',
                formBind: true
            }
        ];
    },

    resizeEditor: function(cmp, editorField, width, height) {
        var editor = editorField.editor;

        if(!editor || !editor.hasOwnProperty('display')) {
            return false;
        }

        editor.setSize(0, 0);

        width = editorField.getEl().down('tbody').getWidth();
        height = (height / 2) - 150;

        editor.setSize(width, height);
        editor.display.scroller.style.height = height + 'px';
    },

    /**
     * @returns { Shopware.form.field.ShopGrid }
     */
    getShopSelector: function () {
        var selectionFactory = Ext.create('Shopware.attribute.SelectionFactory'),
            store = selectionFactory.createEntitySearchStore('Shopware\\Models\\Shop\\Shop');

        store.getProxy().extraParams = {
            'filters[0][property]': 'mainId'
        };

        return Ext.create('Shopware.form.field.ShopGrid', {
            name: 'shopIds',
            fieldLabel: '{s name="shopsFieldLabel"}Shops{/s}',
            editable: false,
            allowSorting: false,
            height: 130,
            labelWidth: 50,
            useSeparator: false,
            store: store,
            searchStore: store,
            createColumns: function() {
                var me = this;

                return [
                    { dataIndex: 'name', flex: 1 },
                    me.createActionColumn()
                ];
            }
        });
    }
});