var that;
class Tab {
    // 用来接收我们传递过来的参数
    constructor(id) {
        // 获取元素
        that = this;
        this.main = document.querySelector(id);
        this.lis = this.main.querySelectorAll("li");
        this.sections = this.main.querySelectorAll("section");
        this.add = this.main.querySelector(".tabadd");
        this.remove = this.main.querySelectorAll(".icon-guanbi");
        //  li 的父元素
        this.ul = this.main.querySelector(".fisrstnav ul:first-child");
        // section 父元素
        this.fsection = this.main.querySelector('.tabscon');
        this.init();

    }
    // 所有的事件绑定
    init() {
        this.updateNode();
        // init 初始化操作让相关的元素绑定事件
        this.add.onclick = this.addTab;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    // 获取所有的 小li 和section
    // 因为我们动态添加元素 需要重新获取对应的元素
    updateNode() {
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.remove = this.main.querySelectorAll(".icon-guanbi");
        this.spans = this.main.querySelectorAll(".fisrstnav li span:first-child");
    }
    // 1.切换功能
    toggleTab() {
        // console.log(this.index);
        that.clearClass();
        this.className = "liactive";
        that.sections[this.index].className = 'conactive';
    }
    // 清除所有li he section 的类
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    // 2.添加功能
    addTab() {
        that.clearClass();
        // alert(1);
        // 1.创建li元素和seciton 元素
        var random = Math.random();
        var li = '<li class="liactive"><span>测试1</span><span class="iconfont icon-guanbi"></span></li>'
        var section = '<section class="conactive">测试' + random + '</section>';
        // 2.把这两个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML('beforeend', li);
        that.fsection.insertAdjacentHTML('beforeend', section);
        that.init();
    }
    // 3.删除功能
    removeTab(e) {
        e.stopPropagation();  //阻止冒泡  防止触发li 的切换点击事件
        var index = this.parentNode.index;
        console.log(index);
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();   // 重新再调用一下函数   然后会重新执行updateNode  获取最新的元素  再绑定事件
        // 当我们删除的不是选中状态的 li 原来被选中的li  保持不变
        if (document.querySelector(".liactive")) return;
        //  当我们删除了选中状态的这个 li  让他前一个li 处于选中状态
        index--;
        // 手动调用 点击事件 不需要鼠标触发
        that.lis[index] && that.lis[index].click();
    }
    // 4. 修改功能
    editTab() {
        var str = this.innerHTML;
        // 双击禁止选定文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.section.empty();
        // alert(1);
        this.innerHTML = '<input type = "text" />';
        var input = this.children[0];
        input.value = str;
        input.select(); //文本框里面的文字处于选定状态
        // 当我们离开文本框就把文本框里面的值给 span
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        };
        // 按下回车 可以把文本框里面的值给 span
        input.onkeyup = function (e) {
            if (e.keyCode === 13) {
                // 手动调用表单失去焦点事件 不需要鼠标离开操作
                this.blur();
            }
        }
    }

}
new Tab('#tab');
