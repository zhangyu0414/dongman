require('./../less/chuncai.less');  // 加载样式

var $ = require('jquery');

var Chuncai = require('./Chuncai');

$.chuncai = function (option) {
    var defaults = {
        menu: {
            "key": "你想要做什么呢？",
            "显示公告": function () {
                this.dynamicSay(this.opt.words[0]);
            },
            "存活时间": function () {
                this.dynamicSay("咱已经和主人共同度过了 " + Math.floor((+new Date - 1456998485780) / (1000 * 60 * 60 * 24)) + "天 的人生了哦~   我是不是很棒呢~");
            },
            "拍打喂食": {
                "key": "要来点什么呢？",
                "小饼干": "嗷呜~ 多谢款待  >ω<",
                "胡萝卜": "人家又不是小兔子 QwQ",
                "秋刀鱼": "大哥哥这是什么？呀！好长！诶？！好滑哦(๑• . •๑)！阿呜～",
                "胖次": "哇~ 好可爱的胖次~~~",
                "淡定红茶": "喝完了，ˊ_>ˋ和我签订契约成为淡定少女吧！"
            },
            "传送门": {
                "天天动漫": function () {
                    window.open("http://tiantian.applinzi.com/main.html");
                },
                "哔哩哔哩": function () {
                    window.open("http://www.bilibili.com/");
                },
                "嘀哩嘀哩": function () {
                    window.open("http://www.dilidili.wang/");
                }
            },
            "隐藏春菜": function () {
                this.hide();
            }
        },
        words: ["为了我们和大家的持续发展，请不要对本站进行任何和谐行为(灬ºωº灬)",
            "咦你想做什么 oAo",
            "「不要啊」你以为我会这么说么噗噗~",
            "一起组团烧烤秋刀鱼",
            "白日依山尽，黄河入海流，欲穷千里目，更上 .. .. 一层楼?",
            "啊啦今天想吃点什么呢~",
            "据说点赞的都找到女朋友了~"]
    };
    option && $.extend(defaults.menu, option.more);
    return new Chuncai($.extend({}, defaults, option));
}