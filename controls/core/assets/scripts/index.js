/** * @author  xuld */imports("Controls.Core.ScrollableControl");using("System.Data.Collection");using("Controls.Core.Base");/** * 表示一个含有滚动区域的控件。 * @class ScrollableControl * @extends Control * @abstract * @see ScrollableControl.ControlCollection * @see ListControl * @see ContainerControl * <p> * {@link ScrollableControl} 提供了完整的子控件管理功能。 * {@link ScrollableControl} 通过 {@link ScrollableControl.ControlCollection} 来管理子控件。 * 通过 {@link#controls} 属性可以获取其实例对象。 * </p> * * <p> * 通过 {@link ScrollableControl.ControlCollection#add} * 来增加一个子控件，该方法间接调用 {@link ScrollableControl.ControlCollection#onControlAdded}，以 * 让 {@link ScrollableControl} 有能力自定义组件的添加方式。 * </p> * * <p> * 如果需要创建一个含子控件的控件，则可以 继承 {@link ScrollableControl} 类创建。 * 子类需要重写 {@link #initChildControl} 方法用于对子控件初始化。 * 重写 {@link #onControlAdded}实现子控件的添加方式（默认使用 appendChild 到跟节点）。 * 重写 {@link #onControlRemoved}实现子控件的删除方式。 * 重写 {@link #createChildCollection} 实现创建自定义的容器对象。 * </p> * * <p> * 最典型的 {@link ScrollableControl} 的子类为 {@link ListControl} 和 {@link ContainerControl} 提供抽象基类。 * </p> */var ScrollableControl = Control.extend({	/**	 * 当新控件被添加时执行。	 * @param {Object} childControl 新添加的元素。	 * @param {Number} index 元素被添加的位置。	 * @protected virtual	 */	onControlAdded: function(childControl, index) {
		index = this.controls[index];		assert(childControl && childControl.attach, "Control.prototype.onControlAdded(childControl, index): {childControl} \u5FC5\u987B\u662F\u63A7\u4EF6\u3002", childControl);		childControl.attach(this.container.node, index ? index.node : null);
	},	/**	 * 当新控件被移除时执行。	 * @param {Object} childControl 新添加的元素。	 * @param {Number} index 元素被添加的位置。	 * @protected virtual	 */	onControlRemoved: function(childControl, index) {
		assert(childControl && childControl.detach, "Control.prototype.onControlRemoved(childControl, index): {childControl} \u5FC5\u987B\u662F\u63A7\u4EF6\u3002", childControl);		childControl.detach(this.container.node);
	},	/**	 * 当被子类重新时，实现创建一个子控件列表。	 * @return {ScrollableControl.ControlCollection} 子控件列表。	 * @protected virtual	 */	createControlsInstance: function() {
		return new ScrollableControl.ControlCollection(this);
	},	// /**	// * 获取当前控件用于存放子节点的容器控件。	// * @protected virtual	// */	// getContainer: function(){	// return this;	// },	/**	 * 从 DOM 树更新 controls 属性。	 * @protected virtual	 */	init: function() {
		this.container = Dom.get(this.container.node);
	},	/**	 * 根据用户的输入创建一个新的子控件。	 * @param {Object} item 新添加的元素。	 * @return {Control} 一个控件，根据用户的输入决定。	 * @protected virtual	 * 默认地，如果输入字符串和DOM节点，将转为对应的控件。	 */	initChild: Dom.parse,	removeChild: function(childControl) {
		return this.controls.remove(childControl);
	},	insertBefore: function(newControl, childControl) {
		return childControl === null ? this.controls.add(newControl) : this.controls.insert(this.controls.indexOf(childControl), newControl);
	},	/**	 * 获取目前所有子控件。	 * @type {Control.ControlCollection}	 * @name controls	 */	constructor: function() {
		this.container = this;		this.controls = this.createControlsInstance();		//   this.loadControls();		Control.prototype.constructor.apply(this, arguments);
	},	empty: function() {
		this.controls.clear();		return this;
	}
});///  #region ControlCollection/** * 存储控件的集合。 * @class * @extends Collection */ScrollableControl.ControlCollection = Collection.extend({	/**	 * 初始化 Control.ControlCollection 的新实例。	 * @constructor	 * @param {ScrollableControl} owner 当前集合的所属控件。	 */	constructor: function(owner) {
		this.owner = owner;
	},	/**	 * 当被子类重写时，初始化子元素。	 * @param {Object} item 添加的元素。	 * @return {Object} 初始化完成后的元素。	 */	initItem: function(item) {
		return this.owner.initChild(item);
	},	/**	 * 通知子类一个新的元素被添加。	 * @param {Object} childControl 新添加的元素。	 * @param {Number} index 元素被添加的位置。	 */	onInsert: function(childControl, index) {		// 如果控件已经有父控件。		if (childControl.parentControl) {
			childControl.parentControl.controls.remove(childControl);
		}		childControl.parentControl = this.owner;		// 执行控件添加函数。		this.owner.onControlAdded(childControl, index);
	},	/**	 * 通知子类一个元素被移除。	 * @param {Object} childControl 新添加的元素。	 * @param {Number} index 元素被添加的位置。	 */	onRemove: function(childControl, index) {
		this.owner.onControlRemoved(childControl, index);		childControl.parentControl = null;
	}
});/// #endregion