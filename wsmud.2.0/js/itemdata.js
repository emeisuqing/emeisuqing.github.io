
// 装备、物品

function Item(name, color) {
    this.name = name;
    this.color = color;
    this.description = description;

    this.html = "<span class='color_"+this.color+"'></span>";
}

// 颜色(白0绿1蓝2黄3紫4橙5红6)
// 星级(0~12)

const 杨不悔的项链 = new Item("杨不悔的项链", 4);

const itemdata = {
    "杨不悔的项链" : [
        {color:4,star:10,gg:168,wx:196,sf:196,rm:9,},
    ]
}


/*

攻击 gj gj_percent
命中 mz mz_percent
防御 fy fy_percent
招架 zj zj_percent

臂力 bl
根骨 gg
身法 sf
悟性 wx
容貌 rm

年龄 ln

*/