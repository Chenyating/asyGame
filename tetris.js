var app = new Vue({
    el: "#teris",
    data: {
        scope: 10,
        v: 10,
        radomID: null, //图像编号
        shap: [], //存放图形
        all: [], //存放所有已经内容
        context: null, //画布
        direction: 1, //方块移动方向
        pushAll: 0,
        rotateID: 0, //旋转的状态,
        testArr: [],
        shapName: null,
    },
    methods: {
        //绘制
        pain() {
            var c = document.getElementById("stage");
            this.context = c.getContext("2d");
            this.context.fillStyle = "#8A3324";
            // this.context.clearRect(0, 0, 800, 60);
        },
        //绘制图像
        painShap() {
            for (var i = 0; i < this.shap.length; i++) {
                for (var j = 0; j < this.shap[i].length; j++) {
                    if (this.shap[i][j][2] == 1) {
                        this.context.fillRect(this.shap[i][j][0], this.shap[i][j][1], 20, 20); //绘制
                        console.log("[" + i + "," + j + "]" + ":" + "[" + this.shap[i][j][0] + "," + this.shap[i][j][1] + "," + this.shap[i][j][2] + "]")
                    }
                }
            }
            console.log("--------------")
        },
        //随机绘制图形
        radomShap() {
            this.pain();
            this.radomID = parseInt(Math.random() * 7);
            this.deleteShap();
            this.shap.splice(0, this.shap.length); //清空存放图形的数组 
            //开始存储不同形状的数组
            switch (this.radomID) {
                case 0:
                    //长条
                    let defaultX = 400;
                    let defaultY = 0;
                    for (var i = 0; i < 4; i++) {
                        defaultX = 400;
                        if (i == 0) {
                            this.$set(this.shap, i, [
                                [defaultX, defaultY, 1],
                                [defaultX += 20, defaultY, 1],
                                [defaultX += 20, defaultY, 1],
                                [defaultX += 20, defaultY, 1]
                            ]);
                        } else {
                            this.$set(this.shap, i, [
                                [defaultX, defaultY, 0],
                                [defaultX += 20, defaultY, 0],
                                [defaultX += 20, defaultY, 0],
                                [defaultX += 20, defaultY, 0]
                            ]);

                        }
                        defaultY += 20;
                    }
                    this.shapName = "长条";
                    break;
                case 1:
                    //正方形
                    this.$set(this.shap, 0, [
                        [400, 0, 1],
                        [400, 20, 1]
                    ]);
                    this.$set(this.shap, 1, [
                        [420, 0, 1],
                        [420, 20, 1]
                    ]);
                    this.shapName = "正方形";
                    break;
                case 2:
                    //正7
                    this.$set(this.shap, 0, [
                        [400, 0, 1],
                        [420, 0, 1],
                        [440, 0, 0],
                    ]);
                    this.$set(this.shap, 1, [
                        [400, 20, 0],
                        [420, 20, 1],
                        [440, 20, 0],
                    ]);
                    this.$set(this.shap, 2, [
                        [400, 40, 0],
                        [420, 40, 1],
                        [440, 40, 0],
                    ]);
                    this.shapName = "正7";
                    break;
                case 3:
                    //反7
                    this.$set(this.shap, 0, [
                        [400, 0, 0],
                        [420, 0, 1],
                        [440, 0, 1],
                    ]);
                    this.$set(this.shap, 1, [
                        [400, 20, 0],
                        [420, 20, 1],
                        [440, 20, 0],
                    ]);
                    this.$set(this.shap, 2, [
                        [400, 40, 0],
                        [420, 40, 1],
                        [440, 40, 0],
                    ]);
                    this.shapName = "反7";
                    break;
                case 4:
                    //正2
                    this.$set(this.shap, 0, [
                        [400, 0, 1],
                        [420, 0, 1],
                        [440, 0, 0],
                    ]);
                    this.$set(this.shap, 1, [
                        [400, 20, 0],
                        [420, 20, 1],
                        [440, 20, 1],
                    ]);
                    this.$set(this.shap, 2, [
                        [400, 40, 0],
                        [420, 40, 0],
                        [440, 40, 0],
                    ]);
                    this.shapName = "正2";
                    break;
                case 5:
                    //反2
                    this.$set(this.shap, 0, [
                        [400, 0, 0],
                        [420, 0, 1],
                        [440, 0, 1],
                    ]);
                    this.$set(this.shap, 1, [
                        [400, 20, 1],
                        [420, 20, 1],
                        [440, 20, 0],
                    ]);
                    this.$set(this.shap, 2, [
                        [400, 40, 0],
                        [420, 40, 0],
                        [440, 40, 0],
                    ]);
                    this.shapName = "反2";
                    break;
                case 6:
                    //土
                    this.$set(this.shap, 0, [
                        [400, 0, 0],
                        [420, 0, 1],
                        [440, 0, 0],
                    ]);
                    this.$set(this.shap, 1, [
                        [400, 20, 1],
                        [420, 20, 1],
                        [440, 20, 1],
                    ]);
                    this.$set(this.shap, 2, [
                        [400, 40, 0],
                        [420, 40, 0],
                        [440, 40, 0],
                    ]);
                    this.shapName = "土";
                    break
                default:
                    break;
            }
            console.log("this ramdomID is" + this.shapName)
            this.painShap();
        },
        deleteShap(){
            for (let i = 0; i < this.shap.length; i++) {
                for (let j = 0; j < this.shap[i].length; j++) {
                    this.context.clearRect(this.shap[i][j][0], this.shap[i][j][1], 20, 20);
                }
            }
        },
        //旋转90度的方法
        rotate() {
            this.deleteShap();
            let shap1 = [];
            // 深拷贝
            shap1 = JSON.parse(JSON.stringify(this.shap));
            //行变列。列变行,把结果先存在shap1里；
            for (let i = 0; i < this.shap.length; i++) {
                for (let j = this.shap[i].length - 1; j >= 0; j--) {
                   shap1[i][j][2] = this.shap[this.shap[i].length - 1 - j][i][2]
                }
            }
            //判断一下，改变方向以后，会不会超出墙（验证最左边和最右边就可以了）,可以允许正好等于边界；
            for (let i = 0; i < shap1.length; i++) {
                if ((shap1[i][0][0] < 0 && shap1[i][0][2] == 1)|| (shap1[i][shap1.length-1][0] > 780 && shap1[i][shap1.length-1][2] == 1)) {
                    //两个同时成立退出；
                    console.log("变化会超过墙")
                    this.painShap();
                    return
                }
            }
            //那么就把shap1的值赋给shap
            this.shap = JSON.parse(JSON.stringify(shap1));
            this.painShap();
        },
        //向下移动
        down() {
            for (let i = 0; i < this.shap.length; i++) {
                for (let j = 0; j < this.shap[i].length; j++) {
                    this.context.clearRect(this.shap[i][j][0], this.shap[i][j][1], 20, 20);
                    this.shap[i][j][1] += 20;
                }
            }
            this.painShap()
        },
        // 向左
        left() {
            //先判断最左边的数值and有上色的。有没有靠墙。每一行的第0个判断一下。
            for (let i = 0; i < this.shap.length; i++) {
                if (this.shap[i][0][0] <= 0 && this.shap[i][0][2] == 1) {
                    //两个同时成立退出；
                    return
                }
            }
            //判断完之后开始对向左进行操作；
            for (let i = 0; i < this.shap.length; i++) {
                for (let j = 0; j < this.shap[i].length; j++) {
                    //还是都先判断一下，每一个的数值and有上色的。有没有靠墙
                    if (this.shap[i][j][0] <= 0 && this.shap[i][j][2] == 1) {
                        //两个同时成立退出；
                        return
                    }
                    this.context.clearRect(this.shap[i][j][0], this.shap[i][j][1], 20, 20);
                    this.shap[i][j][0] -= 20;
                }
            }
            this.painShap();
        },
        // 向右
        right() {
            //先判断最左边的数值and有上色的。有没有靠墙,每一行的最后一个；
            for (let i = 0; i < this.shap.length; i++) {
                if (this.shap[i][this.shap.length-1][0] >= 780 && this.shap[i][this.shap.length-1][2] == 1) {
                    //两个同时成立退出；
                    return
                }
            }
            for (let i = 0; i < this.shap.length; i++) {
                for (let j = 0; j < this.shap[i].length; j++) {
                    //还是都先判断一下，每一个的数值and有上色的。有没有靠墙
                    if (this.shap[i][j][0] >= 780 && this.shap[i][j][2] == 1) {
                        //两个同时成立退出；
                        return
                    }
                    this.context.clearRect(this.shap[i][j][0], this.shap[i][j][1], 20, 20);
                    this.shap[i][j][0] += 20;
                }
            }
            this.painShap();
        },
        //旋转
        //是否重叠
        ifOverlap() {
            for (var i = this.shap.length - 1; i > 0; i--) {
                if (this.shap[0][0] == this.shap[i][0] && this.shap[0][1] == this.shap[i][1]) {
                    alert("游戏结束，你撞到你自己啦！")
                    this.gameOver();
                }
            }
        }
    },
    mounted() {

    },
})