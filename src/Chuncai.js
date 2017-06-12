var drag = require('./drag');
var $ = require('jquery');

$.fn.will = function (callback, type) {
    return this.queue(type || "fx", function (next) {
        callback.call(this);
        next();
    });
};

class Chuncai {
    constructor(option) {
        this.opt = option;
        this.init();
    }

    init() {
        this.fill();
        drag(this.ele.children(".chuncai-face"), this.ele, this.savePos.bind(this));  //可移动  

        this.bindMenuEvents(); //菜单事件绑定
        this.show();
    }

    fill() {   //填充dom元素
        $('<a class="chuncai-zhaohuan" href="javascript:;">召唤春菜</a>').appendTo($("body"));


        var content = `
            <div class="chuncai-main">
                <div class="chuncai-face chuncai-face-00">
                    <div class="chuncai-face-eye"></div>
                </div>
                <div class="chuncai-chat">
                    <div class="chuncai-word"></div>
                    <div class="chuncai-menu"></div>
                    <div class="chuncai-menu-btn">menu</div>
                </div>
            </div>`;

        this.ele = $(content);
        $("body").append(this.ele);   //添加元素          
    }

    show() {
        if (sessionStorage["chuncai"]) {   //从storage中获取位置
            var pos = JSON.parse(sessionStorage["chuncai"]);
            this.ele.css({
                left: pos.x,
                top: pos.y
            });
        }
        var self = this;
        self.ele.find(".chuncai-word").empty();
        this.ele.fadeIn().will(function () {
            self.freeSay(1); //开始说闲话                
        });
        $(".chuncai-zhaohuan").hide();
    }

    hide() {
        this.dynamicSay("记得叫我出来哦~");
        this.ele.delay(1000).fadeOut().will(function () {
            $(".chuncai-zhaohuan").show();
        });
    }

    freeSay(ifFirst) {   //开启说闲话模式
        var self = this;
        clearInterval(this.freeSayTimer);
        if (ifFirst) {
            self.dynamicSay(self.opt.words[Math.floor(Math.random() * self.opt.words.length)]);
            self.ele.find(".chuncai-face").attr("class", "chuncai-face chuncai-face-0" + Math.floor(Math.random() * 3));
        }
        this.freeSayTimer = setInterval(function () {
            self.ele.find(".chuncai-menu").slideUp();
            self.dynamicSay(self.opt.words[Math.floor(Math.random() * self.opt.words.length)]);
            self.ele.find(".chuncai-face").attr("class", "chuncai-face chuncai-face-0" + Math.floor(Math.random() * 3));
        }, 10000);
    }

    bindMenuEvents() {  //菜单事件
        var self = this, opt = this.opt, menu = self.ele.find(".chuncai-menu");
        self.ele.find(".chuncai-menu-btn").click(function () {
            var btn = $(this),
                ifOn = !!self.menuOn; //是否已开启菜单
            self.menuOn = !ifOn;
            if (ifOn) self.closeMenu(1);
            else {
                self.fillMenu(opt.menu);
                menu.slideDown();
            }
        });
        $(".chuncai-zhaohuan").click(function () {
            self.show();
        });
    }

    closeMenu(first) {           //关闭菜单 
        this.ele.find(".chuncai-menu").slideUp();
        this.menuOn = false;
        this.freeSay(first);
    }

    fillMenu(obj) {        //填充菜单
        clearInterval(this.freeSayTimer);   //停止说闲话
        clearTimeout(this.menuTimer);    //闲置统计时
        var self = this;
        this.menuTimer = setTimeout(function () {
            self.menuOn && self.closeMenu(1);
        }, 10000);

        var type = $.type(obj);

        var dict = {
            "string": function () {   //直接输出文字
                this.dynamicSay(obj);
                this.closeMenu();
            },
            "function": function () {  //执行函数
                obj.call(this);
                this.closeMenu();
            },
            "object": function () {  //填充
                var menu = this.ele.find(".chuncai-menu"), self = this;
                menu.slideUp().will(function () {
                    menu.empty();
                    $.each(obj, function (k, v) {
                        if (k == "key") {
                            self.dynamicSay(v);
                            return true;
                        }
                        var item = $(`<a>${k}</a>`).click(function () {
                            self.fillMenu(v);  //递归填充菜单
                        });
                        menu.append(item);
                    });
                }).slideDown();
            }
        };
        dict[type] && dict[type].call(this);
    }

    dynamicSay(word) {   //动态输入文字
        this.ele.stop(true, false);
        var wordBox = this.ele.find(".chuncai-word"), self = this;
        for (let i = 0, len = word.length; i < len; i++) {
            self.ele.will(function () {
                wordBox.html(word.substr(0, i + 1));
            }).delay(100);
        }
    }

    savePos(x, y) {   //函数节流保存位置
        clearTimeout(this.saveTimer);
        this.saveTimer = setTimeout(function () {
            sessionStorage["chuncai"] = JSON.stringify({ x: x, y: y });
        }, 500);
    }
}

module.exports = Chuncai;