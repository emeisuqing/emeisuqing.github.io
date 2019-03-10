class Skill {
    /**
     * @param {String} id
     * @param {String} name
     * @param {Number} color 白:0,绿:1,蓝:2,黄:3,紫:4,橙:5,红:6
     */
    constructor(id, name, color, typeOne, typeTwo) {
        this.id = id;
        this.name = name;
        this.color = color;
        this.typeOne = typeOne;
        this.typeTwo = typeTwo;

        this.upgradeCount = 0; // 进阶次数 // count
        // this.lingwu = [];
        this.upLog = new Array();

        this.needPractice = false;

        this.level = 0;
        this.levelTo = 0;
        this.category = "";
        this.description = "description";
    }
    get count() {
        return this.upLog.length;
    }
    get couldUp() {
        return this.color + this.count < 5 ? true : false;
    }
    // parseObject(object) {
    //     for (var key in object) {
    //         this[key] = object[key];
    //     }
    // }
    getDataFromObject(object) {
        for (const key in object) {
            if (key == "upLog") {
                object.upLog.forEach(value => {
                    var lingwu = new Lingwu();
                    lingwu.parseObject(value);
                    this[key].push(lingwu);
                });
            } else {
                this[key] = object[key];
            }
        }
        console.log(this);
    }
    
    get k() {
        var k = this.color + this.upgradeCount + 1;
        console.log("{Skill} get k: " + k);
        return k;
    }
    get cost() {
        if (this.level > this.levelTo) {
            console.log("{Skill} get cost: 0");
            return 0;
        } else {
            var cost = 2.5 * this.k * (this.levelTo * this.levelTo - this.level * this.level);
            console.log("{Skill} get cost: " + cost);
            return cost;
        }
    }
    static getSkillById(id) {
        console.log("getSkillById:" + id);
        var skill = null;
        for (const key in allSkillData) {
            allSkillData[key].forEach(value => {
                if (id === value.id) {
                    skill = value;                    
                }
            });
        }
        return new Skill(skill.id, skill.name, skill.color, skill.typeOne, skill.typeTwo);
    }
}