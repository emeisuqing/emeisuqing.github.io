class Skill {
    constructor(id, name, color, typeOne, typeTwo) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.typeOne = typeOne;
        this.typeTwo = typeTwo;

        this.level = 0;     // 当前等级
        this.levelTo = 0;   // 目标等级
        this.doExe = false; // 是否需要练习
        this.upLogs = [];
        this.family = "";
        // this.description = "description";
    }
    parseObject(object) {
        for (var key in object) {
            if (key == "upLogs") {
                object.upLogs.forEach(value => {
                    var wd = new WuDao();
                    wd.parseObject(value);
                    this[key].push(wd);
                });
            } else {
                this[key] = object[key];
            }
        }
    }
    // class = "color1"
    get colorStyle() {
        return "color" + (this.color + this.upLogs.length);
    }
    // 是否能够进阶 0白1绿2蓝3黄4紫
    get upable() {
        return (this.color + this.upCount) < 5 ? true : false;
    }
    // 进阶次数
    get upCount() {
        return this.upLogs.length;
    }
    // 系数
    get k() {
        return this.color + this.upLogs.length + 1;
    }
    // 消耗潜能
    get cost() {
        // console.log("Skill - skill.cost");
        if (this.level > this.levelTo) {
            return 0;
        } else {
            var cost = 2.5 * this.k * (this.levelTo * this.levelTo - this.level * this.level);
            return cost;
        }
    }
}