var that;
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        // 获取+号
        this.tabadd = this.main.querySelector(".tabadd");
        // 获取ul 
        this.ul = this.main.querySelector(".fisrstnav ul:first-child");
        // section 父元素
        this.tabscon = this.main.querySelector('.tabscon');
        this.init();

    }
    undataNode() {
        // 获取li  页面加载时有3个li
        this.lis = this.main.querySelectorAll("li");
        // 获取section
        this.sections = this.main.querySelectorAll("section");
        // 获取删除按钮
        this.remove = this.main.querySelectorAll(".icon-guanbi");
        // 获取li 中所有的span
        this.spans = this.main.querySelectorAll(".fisrstnav li span:first-child");

    }


    // 给每个li 做绑定事件
    init() {
        this.undataNode();
        // init 初始化操作让相关的元素绑定事件
        this.tabadd.onclick = this.addTab;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;

        }
    }
    // clearClass 清除所有li 和section
    clearClass() {
        // this 的指向永远取决于调用者
        // 在方法中 指向调用者 
        for (var i = 0; i < this.lis.length; i++) {
            that.lis[i].className = '';
            that.sections[i].className = '';
        }
    }
    // 切换
    toggleTab() {
        that.clearClass();
        this.className = 'liactive';
        that.sections[this.index].className = 'conactive';
    }

    // 添加
    addTab() {
        that.clearClass();
        // alert(1);
        // 1.创建li元素和seciton 元素
        var random = Math.random();
        var li = '<li class="liactive"><span>测试1</span><span class="iconfont icon-guanbi"></span></li>'
        var section = '<section class="conactive">测试' + random + '</section>';
        // 2.把这两个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML('beforeend', li);
        that.tabscon.insertAdjacentHTML('beforeend', section);
        that.init();
    }

    removeTab(e) {
        e.stopPropagation(); //阻止冒泡  防止触发li 的切换点击事件
        var index = this.parentNode.index; // 找到父元素的索引
        console.log(index);
        // 根据索引号删除对应的li和section  remove() 可以直接删除指定地元素
        that.lis[index].remove();  //自杀
        that.sections[index].remove();
        that.init();  // 只要删除了  就代表li减少  需要再去调用 最新的 lis
        // 当删除后 页面上还有已经选中状态的tab栏 不希望执行触发前一个tab切换事件操作
        if (document.querySelector('.liactive')) return
        // 当删除某一个li  让前一个tab选中
        index--;
        // 手动调用  默认选中
        that.lis[index].click();
        // if(index <0) return
        that.lis[index] && that.lis[index].click();
    }
    // 修改功能
    editTab() {
        var str = this.innerHTML;
        // 双击禁止选中文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.section.empty();
        // console.log('被双击了');
        // 获取span的内容
        var spanContent = this.innerHTML
        //创建文本框  让当前的this输入input    
        this.innerHTML = '<input type="text">'
        // 将span的内容 设置给文本框
        var inp = this.children[0]
        inp.select()
        inp.onblur = function () {
            // 当失去焦点时  获取inp的value 设置给span
            this.parentNode.innerHTML = this.value;
        }
        inp.onkeyup = function (e) {
            if (e.keyCode === 13) {
                this.blur();
            }
        }

    }
}
new Tab("#tab")