var fruit = new Vue({
    el: "#fruit",
    data: {
        // 水果列表
        list: [],
        // 大型水果
        blist: [],
        bprice: null,
        bg: null,
        bid: 0,
        btext: null,
        bnum: 3,
        bget: 0,
        // 中型水果
        mlist: [],
        mprice: null,
        mg: null,
        mid: 0,
        mtext: null,
        mnum: 60,
        mget: 0,
        // 小型水果
        slist: [],
        sprice: null,
        sg: null,
        snum: 2,
        sid: 0,
        stext: null,
        sget: 0,
        // 总和
        tprice: null,
        tg: null,
        ttext: null,
        budget: 220,
        // 其他
        otext: null,
        og: null,
        // 随机水果循环次数
        beginFruitTimes: 0,
    },
    methods: {
        beginFruit() {
            this.beginFruitTimes = this.beginFruitTimes + 1;
            this.otext = null;
            this.bigFruit();
            this.middleFruit();
            this.smallFruit();
            this.totalMoney();
        },
        bigFruit() {
            if (this.bget == 1) {
                return;
            }
            if (this.bnum == 0) {
                this.btext = "0元";
                this.bprice = 0;
                this.bg = 0;
                return;
            } else {
                var id = parseInt(Math.random() * this.blist.length);
                // 大型水果价格约:一个大型水果约重*价格*个数
                this.bprice = this.blist[id].weight * this.blist[id].price * this.bnum;
                this.btext =
                    this.blist[id].name +
                    ",价格为:" +
                    this.blist[id].price +
                    "元/斤,总计约:" +
                    this.bprice +
                    "元,共" +
                    this.blist[id].weight * this.bnum +
                    "斤";
                this.bg = this.blist[id].weight * this.bnum;
            }
        },
        middleFruit() {
            if (this.mget == 1) {
                return;
            }
            if (this.mnum == 0) {
                this.mtext = "0元";
                this.mprice = 0;
                this.mg = 0;
                return;
            } else {
                var id = parseInt(Math.random() * this.mlist.length);
                // 中型水果价格约:（中型水果个数/2）*价格
                this.mprice = (this.mnum / 2) * this.mlist[id].price;
                this.mg = this.mnum / 2;
                this.mtext =
                    this.mlist[id].name +
                    ",价格为:" +
                    this.mlist[id].price +
                    "元/斤,总计约:" +
                    this.mprice +
                    "元,共" +
                    this.mg +
                    "斤";
            }
        },
        smallFruit() {
            if (this.sget == 1) {
                return;
            }
            if (this.snum == 0) {
                this.stext = "0元";
                this.sprice = 0;
                this.sg = 0;
                return;
            } else {
                var id = parseInt(Math.random() * this.slist.length);
                // 小型水果价格约:小型水果斤数*价格
                this.sprice = this.slist[id].price * this.snum;
                this.sg = parseInt(this.snum);
                this.stext =
                    this.slist[id].name +
                    ",价格为:" +
                    this.slist[id].price +
                    "元/斤,总计约:" +
                    this.sprice +
                    "元，共" +
                    this.sg +
                    "斤";
            }
        },
        totalMoney() {
            try {
                this.tg = 0;
                this.tprice = this.bprice + this.mprice + this.sprice;
                if (this.tprice > this.budget) {
                    console.log(this.tprice + "超出预算了")
                    this.ttext = "超出预算了";
                    this.otext = "不能买其他小型水果了";
                    this.tg = 0;
                    this.tprice = null;
                    if (this.beginFruitTimes >= 500) {
                        this.ttext = "你想购买的水果，随机搭配均超出预算。请重新设置水果";
                        return;
                    }
                    this.beginFruitTimes = this.beginFruitTimes + 1;
                    this.beginFruit();
                    return;
                } else {
                    this.beginFruitTimes=0;
                    this.tg = 0;
                    console.log(this.bg + "+" + this.mg + "+" + this.sg)
                    this.tg = this.bg + this.mg + this.sg;
                    console.log(this.tg);
                    this.ttext = this.tprice + "元，" + this.tg + "斤";
                    this.otherSmall();
                }
            } catch (error) {}
        },
        otherSmall() {
            if (this.ttext == "超出预算了") {
                this.otext = "不能买其他小型水果了";
                return;
            } else {
                this.og = 0;
                this.otext = "不能买其他小型水果了";
                var lastprice = this.budget - this.tprice;
                var id = parseInt(Math.random() * this.slist.length);
                // 没有超出预算还能购买小型水果是::（预算减去约价格）\小型水果价格
                this.og = parseInt(lastprice / this.slist[id].price);
                try {
                    if (this.og <= 1) {
                        this.otext = "不能买其他小型水果了";
                        this.otherSmall();
                        return;
                        // 因为一直在随机，没有得出结果来，就一直在随机。会报错
                    } else {
                        this.otext =
                            "可再买：约" +
                            this.og +
                            "斤的" +
                            this.slist[id].name +
                            ",价格为:" +
                            this.slist[id].price +
                            "元/斤,总计约:" +
                            this.slist[id].price * this.og +
                            "元";
                    }
                } catch (error) {}
            }
        },
        wantIt(fruitType, ifget) {
            console.log(fruitType)
            if (fruitType == 1) {
                this.bget = ifget;
            }
            if (fruitType == 2) {
                this.mget = ifget;
            }
            if (fruitType == 3) {
                this.sget = ifget;
            }

        }
    },
    mounted() {
        var vm = this;
        var dataUrl = __uri("data/fruit/fruit.json");
        $(document).ready(function () {
            $.getJSON(
                dataUrl + "?tempstamp=" + +new Date(),
                function (res) {
                    vm.list = res;
                    vm.blist = vm.list[0].fruit;
                    vm.mlist = vm.list[1].fruit;
                    vm.slist = vm.list[2].fruit;
                }
            );
        });
    }
});