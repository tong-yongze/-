that = this
class Tab {
    constructor(id) {
        that = this;
        //获取
        this.main = document.querySelector(id);
        this.lis = this.main.querySelectorAll("li");
        this.sections = this.main.querySelectorAll("section");
        this.init();
    }
    // 绑定事件
    init() {

        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i
            this.lis[i].onclick = this.toggleTab
        }
    }
    // 清除所有li 和section 样式
    clearClass() {
        for (var i = 0; i < this.lis.length; i++) {
            that.lis[i].className = '';
            that.sections[i].className = '';
        }
    }
    // toggleTab  切换
    toggleTab() {
        that.clearClass();
        this.className = "liactive";
        that.sections[this.index].className = "conactive";
    }
}
new Tab("#tab")