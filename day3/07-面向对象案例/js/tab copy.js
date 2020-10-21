class Tab {
    constructor(id) {
        // 获取元素 
        this.main = document.querySelector(id);
        this.lis = this.main.querySelectorAll("li");
        this.sections = this.main.querySelectorAll("section");
        // 调用初始化方法  绑定点击事件
        this.init();
    }


    init() {
        // 绑定点击事件
        for (var i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;  //不加括号 不然会被调用函数
        }
    }
    // 1. 切换功能
    toggleTab() {
        this.className = "liactive";
        this.sections[this.index].className = "conactive";
    }
    // 2.添加功能
    addTab() { }
}

new Tab('#tab');