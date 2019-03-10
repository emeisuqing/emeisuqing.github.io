class Role {
    /**
     * 
     * @param {String} name 角色名
     * @param {String} level 境界
     * @param {String} school 门派
     * @param {String} server 服务器
     */
    constructor(name, level, school, server) {
        this.name = name;
        this.level = level;
        this.school = school;
        this.server = server;

        this.gohome = true;
        this.wakuang = true;

        this.IQ = 50;
        this.IQ2 = 1000;
        this.efficiency = 100;

        this.skillArray = [];
        // this.lingwuDic = {
        //     "force": 
        // };

        this.log = new Array();
    }
    // parseObject(object) {
    //     for (var key in object) {
    //         if (key = "skillArray") {
    //             object.skillArray.forEach(value => {
    //                 var skill = new Skill();
    //                 skill.parseObject(value);
    //                 this.skillArray.push(skill);
    //             });
    //         } else {
    //             this[key] = object[key];
    //         }
    //     }
    // }
    getDataFromObject(object) {
        console.log(object);
        for (const key in object) {
            if (key == "skillArray") {
                console.log("key=skillArray");
                continue;
            }
            this[key] = object[key];
        }
        // this.name = object.name;
        // this.level = object.level;
        // this.school = object.school;
        // this.server = object.server;

        // this.iq = object.iq;
        // this.iq2 = object.iq2;
        // this.efficiency = object.efficiency;

        // this.skillArray = object.skillArray;
        object.skillArray.forEach(value => {
            var skill = new Skill();
            skill.getDataFromObject(value);
            this.skillArray.push(skill);
        });
        console.log(this);
        // this.wudaoArray = object.wudaoArray;
    }

    static checkName(string) {
        console.log("Check name: " + string);
        var regular = /^[\u4e00-\u9fa5]+$/;
        if (string && string.length > 0 && string.length < 7 && regular.test(string)) {
            console.log("=> true.");
            return true;
        } else {
            console.log("=> false.");
            return false;
        }
    }
    static getLevelArray() {
        return ["百姓", "武士", "武师", "宗师", "武圣", "武帝", "武神"];
    }
    static getSchoolArray() {
        return ["无门无派", "武当派", "少林派", "华山派", "峨眉派", "逍遥派", "丐帮", "杀手楼"];
    }
    static getServerArray() {
        return ["一区", "二区", "三区", "四区"];
    }
}