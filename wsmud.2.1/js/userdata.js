class Userdata {
    constructor() {
        this.index = 0;
        this.roleArray = [];
    }
    // userdata.role = userdata.roleArray[userdata.index];
    // userdata.skillArray = userdata.roleArray[userdata.index].skillArray;
    get role() {
        return this.roleArray[this.index];
    }
    get skillArray() {
        return this.roleArray[this.index].skillArray;
    }
    // get lingwuArray() {
    //     return this.role.lingwuArray;
    // }
    

    save() {
        savedata("index", userdata.index);
        // savedata("count", userdata.roleArray.length);
        // localStorage.setItem("roleArray", JSON.stringify(userdata.roleArray));
        // userdata.roleArray.forEach((role, index) => {
        //     savedata("role" + index, role);
        //     savedata("skillArray" + index, role.skillArray);
        // });
        // console.log("Save userdata.");
        savedata("roleArray", userdata.roleArray);

        function savedata(key, data) {
            localStorage.setItem(key, JSON.stringify(data));
            // console.log("SAVE: " + key + " => ", JSON.stringify(data));
        }
    }
    load() {
        var index = loaddata("index");
        userdata.index = index;
        var array = loaddata("roleArray");
        array.forEach((temp, index) => {
            var role = new Role();
            role.getDataFromObject(temp);
            userdata.roleArray.push(role);
        });

        // userdata.roleArray = loaddata("roleArray");
        function loaddata(key) {
            var string = localStorage.getItem(key);
            var object = JSON.parse(string);
            console.log("Load: ", object);
            return object;
        }
    }
    clear() {
        localStorage.clear();
        console.log("Clear localStorage.");
    }

    addRole(role) {
        allSkillData["基础技能"].forEach(skill => {
            skill.category = "基础技能";
            role.skillArray.push(skill);
        });
        this.roleArray.push(role);
        this.save();
        console.log("Add a new role.");
    }
    deleteRoleByIndex(index) {
        if (this.index === index) {
            this.index = 0;
        } else if (this.index > index) {
            this.index -= 1;
        }
        this.roleArray.splice(index, 1);
        this.save();
        console.log("Delete a role by index: " + index);
    }

    addSkillById(id) {
        var skill = Skill.getSkillById(id);
        this.skillArray.push(skill);
        this.save();
        console.log("Add a skill by id: " + id);
    }
    deleteSkillById(id) {
        // var skill = Skill.getSkillById(id);
        var n = null;
        this.skillArray.forEach((skill, index) => {
            if (id === skill.id) n = index;
        });
        this.skillArray.splice(n, 1);
        this.save();
        console.log("Delete a skill by id: " + id);
    }
    

    getSkillById(id) {
        var skill = null;
        this.skillArray.forEach(element => {
            if (element.id === id) skill = element;
        });
        return skill;
    }
    setSkillLevelById(id, level) {
        var skill = this.getSkillById(id);
        skill.level = level;
        this.save();
        console.log("Set skill(id:" + id + ") level = " + level);
    }
    setSkillLevelToById(id, levelTo) {
        var skill = this.getSkillById(id);
        skill.levelTo = levelTo;
        this.save();
        console.log("Set skill(id:" + id + ") levelTo = " + levelTo);
    }
    setSkillPractice(skill, bool) {
        skill.needPractice = bool;
        this.save();
    }
    
    sortSkillArray() {
        console.log("技能排序 - 执行");
        var a = this.skillArray;
        var n = this.skillArray.length;
        for (let j = 0; j < n - 1; j++) {
            for (let i = 0; i < n - j - 1; i++) {
                if (a[i].color > a[i + 1].color) {
                    var temp = a[i];
                    a[i] = a[i + 1];
                    a[i + 1] = temp;
                }
            }
        }
        console.log("技能排序 - 完毕");
    }
}

var userdata = new Userdata();
// console.dir(userdata);
// var skillArray = userdata.skillArray;


console.log("Check: window.localStorage");
if (window.localStorage) {
    console.log("Support: window.localStorage");
    if (localStorage.getItem("index")) {
        userdata.load();
    } else {
        userdata.save();
    }
} else {
    console.log("Nonsupport: window.localStorage");
    alert("请退出浏览器的隐私模式，否则无法使用本地缓存！");
}