that = this;
class Tab {
    constructor(id) {
        that = this;
        this.main = document.querySelector(id);
        //获取ul
        this.ul = this.main.querySelector(".fisrstnav ul:first-child")
        //获取 加号
        this.tabadd = this.main.querySelector(".tabadd");
        //获取 tabscon 大盒子 为了让你们追加
        this.tabscon = this.main.querySelector(".tabscon");
        this.init();
    }

    //获取所有的li和section
    undataNode() {
        this.lis = this.main.querySelectorAll("li");
        this.sections = this.main.querySelectorAll("section");
        this.remove = this.main.querySelectorAll(".icon-guanbi");
        this.spans = this.main.querySelectorAll(".fisrstnav li span:first-child");
    }

    // 给每个li 做绑定事件
    init() {
        this.undataNode();
        this.tabadd.onclick = this.addTab;
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.removeTab;
            // this.tabadd.onclick = this.
            // console.log(this.lis[i]);
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab
        }
    }

    // 清除所有的li 和 section
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            that.lis[i].className = '';
            that.sections[i].className = '';
        }
    }

    // 切换
    toggleTab() {
        that.clearClass();
        this.className = "liactive";
        that.sections[this.index].className = "conactive";
    }
    // 添加功能  li 和section
    addTab() {
        that.clearClass();
        var li = '<li class="liactive"><span>测试1</span><span class="iconfont icon-guanbi"></span></li>';
        var section = '<section class="conactive">' + Math.random() + '</section>';
        that.ul.insertAdjacentHTML("beforeend", li);
        that.tabscon.insertAdjacentHTML("beforeend", section);
        that.init()

    }
    // 删除
    removeTab(e) {
        e.stopPropagation();
        var index = this.parentNode.index;
        console.log(index);
        that.lis[index].remove();
        that.sections[index].remove()
        if (document.querySelector(".liactive")) return
        index--;
        that.lis[index] && that.lis[index].click();

    }

    //editTab 编辑功能
    editTab() {
        var str = this.innerHTML;
        window.getSelection ? window.getSelection().removeAllRanges() : document.section.empty();
        this.innerHTML = '<input type= "text"/>'
        var input = this.children[0];
        input.value = str;
        input.select();
        input.onblur = function () {
            this.parentNode.innerHTML = this.value
        };
        input.onkeyup = function (e) {
            if (e.keyCode === 13) {
                this.blur();
            }
        }
    }






    // editTab() {
    //     var str = this.innerHTML;
    //     window.getSelection ? window.getSelection().removeAllRanges() : document.section.empty();
    //     // console.log("1");
    //     this.innerHTML = '<input type = "text"/>'
    //     var input = this.children[0];
    //     input.value = str;
    //     input.select();
    //     input.onblur = function () {
    //         this.parentNode.innerHTML = this.value
    //     }
    // }
}
new Tab("#tab")
