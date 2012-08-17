/** * @author xuld *//** * 所有表单输入控件实现的接口。
 */var IInput = {		setAttr: function (name, value) {		if(typeof value === 'boolean'){			this.toggleClass('x-' + this.xtype + '-' + name, value);		}		return this.base('setAttr');	},		setDisabled: function (value) {		return this.setAttr('disabled', value !== false);	},		getDisabled: function () {		return this.getAttr('disabled');	},		setReadOnly: function (value) {		return this.setAttr('readonly', value !== false);	},		getReadOnly: function () {		return this.getAttr('readonly');	},		setName: function (value) {		return this.setAttr('name', value);	},		getName: function () {		return this.getAttr('name');	},		getForm: function () {		return Dom.get(this.node.form);	},		clear: function(){		return this.setText('');	},		select: function(){		this.node.select();		return this;	}	};