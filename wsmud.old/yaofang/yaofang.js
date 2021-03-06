function CaiLiao(color, name) {
	this.color = color;
	this.name = name;

}
CaiLiao.prototype.output = function() {
	var string = '<span class=\"'+this.color+'\">'+this.name+'</span>';
	return string;
};


var 当归 = new CaiLiao('白', '当归');
var 芦荟 = new CaiLiao('白', '芦荟');
var 柴胡 = new CaiLiao('绿', '柴胡');
var 沉香 = new CaiLiao('蓝', '沉香');
var 茯苓 = new CaiLiao('蓝', '茯苓');
var 人参 = new CaiLiao('紫', '人参');
var 灵芝 = new CaiLiao('橙', '灵芝');
var 山楂叶 = new CaiLiao('白', '山楂叶');
var 金银花 = new CaiLiao('绿', '金银花');
var 石楠叶 = new CaiLiao('绿', '石楠叶');
var 熟地黄 = new CaiLiao('蓝', '熟地黄');
var 九香虫 = new CaiLiao('黄', '九香虫');
var 络石藤 = new CaiLiao('黄', '络石藤');
var 凌霄花 = new CaiLiao('紫', '凌霄花');
var 何首乌 = new CaiLiao('紫', '何首乌');
var 盘龙参 = new CaiLiao('橙', '盘龙参');
var 冬虫夏草 = new CaiLiao('黄', '冬虫夏草');
//var 橙色药材 = new CaiLiao('橙色', '');

var 草鱼 = new CaiLiao('白', '草鱼');
var 鲤鱼 = new CaiLiao('白', '鲤鱼');
var 鲢鱼 = new CaiLiao('白', '鲢鱼');
var 鲮鱼 = new CaiLiao('绿', '鲮鱼');
var 鳊鱼 = new CaiLiao('绿', '鳊鱼');
var 鲂鱼 = new CaiLiao('绿', '鲂鱼');
var 虹鳟 = new CaiLiao('黄', '虹鳟');
var 黄金鳉 = new CaiLiao('蓝', '黄金鳉');
var 黄颡鱼 = new CaiLiao('蓝', '黄颡鱼');
var 孔雀鱼 = new CaiLiao('黄', '孔雀鱼');
var 反天刀 = new CaiLiao('黄', '反天刀');
var 黑龙鱼 = new CaiLiao('紫', '黑龙鱼');
var 银龙鱼 = new CaiLiao('紫', '银龙鱼');
var 罗汉鱼 = new CaiLiao('紫', '罗汉鱼');
var 太湖银鱼 = new CaiLiao('蓝', '太湖银鱼');
//var 橙鱼 = new CaiLiao('橙色', '');
//var 橙鱼 = new CaiLiao('橙色', '');
//var 橙鱼 = new CaiLiao('橙色', '');

function Yao() {
this.绿 = [];
this.蓝 = [];
this.黄 = [];
this.紫 = [];
this.橙 = [];
}

var 大还丹 = new Yao();
var 大力丸 = new Yao();
var 凝神丹 = new Yao();
var 归心散 = new Yao();
var 石龟丹 = new Yao();
var 风行散 = new Yao();
var 风雷丹 = new Yao();
var 赤火丹 = new Yao();
var 赤血丹 = new Yao();
var 玄武丹 = new Yao();
var 破军丹 = new Yao();
var 风神丹 = new Yao();
var 生机丸 = new Yao();
var 玄冰丹 = new Yao();
var 玄灵丹 = new Yao();
var 归元散 = new Yao();
var 风行丹 = new Yao();
var 造化丹 = new Yao();
var 无常丹 = new Yao();
var 清心丹 = new Yao();
var 冰心丹 = new Yao();
var 蕴象丹 = new Yao();
var 突破丹 = new Yao();

大还丹.绿 = ['大还丹', '5%气血',石楠叶,金银花,金银花,金银花,当归];
大力丸.绿 = ['大力丸', '3%攻击',山楂叶,当归,山楂叶,当归,金银花];
凝神丹.绿 = ['凝神丹', '3%命中',当归,柴胡,柴胡,柴胡,芦荟];
归心散.绿 = ['归心散', '3%招架',芦荟,山楂叶,柴胡,柴胡,柴胡];
石龟丹.绿 = ['石龟丹', '3%防御',山楂叶,芦荟,柴胡,石楠叶,山楂叶];
风行散.绿 = ['风行散', '3%躲闪',当归,柴胡,芦荟,芦荟,金银花];
风雷丹.绿 = ['风雷丹', '3%暴击',石楠叶,石楠叶,芦荟,柴胡,金银花];
赤火丹.绿 = ['赤火丹', '5%爆伤',柴胡,山楂叶,山楂叶,石楠叶,金银花];
赤血丹.绿 = ['赤血丹', '3%终伤',石楠叶,柴胡,山楂叶,山楂叶,山楂叶];
玄武丹.绿 = ['玄武丹', '3%减伤',石楠叶,石楠叶,芦荟,鲢鱼,石楠叶];
破军丹.绿 = ['破军丹', '3%无视防御',金银花,柴胡,当归,金银花,草鱼];
风神丹.绿 = ['风神丹', '10%攻速',金银花,当归,石楠叶,金银花,金银花];
生机丸.绿 = ['生机丸', '3%内力消耗降低',金银花,山楂叶,石楠叶,石楠叶,金银花];
玄冰丹.绿 = ['玄冰丹', '3%绝招释放速度',山楂叶,当归,柴胡,芦荟,石楠叶];
玄灵丹.绿 = ['玄灵丹', '3%绝招冷却',芦荟,石楠叶,柴胡,芦荟,柴胡];
归元散.绿 = ['归元散', '5%忙乱',柴胡,石楠叶,石楠叶,柴胡,柴胡];
风行丹.绿 = ['风行丹', '5%忽视忙乱',当归,芦荟,山楂叶,金银花,金银花];
造化丹.绿 = ['造化丹', '5%负面效果抵抗',山楂叶,山楂叶,当归,山楂叶,芦荟];
无常丹.绿 = ['无常丹', '5%内力',芦荟,芦荟,石楠叶,金银花,金银花];
清心丹.绿 = ['清心丹', '10%学习',山楂叶,石楠叶,柴胡,芦荟,山楂叶];
冰心丹.绿 = ['冰心丹', '10%练习',当归,金银花,金银花,当归,芦荟];
蕴象丹.绿 = ['蕴象丹', '10%打坐',当归,石楠叶,柴胡,山楂叶,金银花];
突破丹.绿 = ['突破丹', '快速升级技能',当归,芦荟,山楂叶,鲤鱼,金银花,石楠叶,柴胡,黑龙鱼];

大还丹.蓝 = ['大还丹', '15%气血',柴胡,熟地黄,柴胡,石楠叶,石楠叶,茯苓];
大力丸.蓝 = ['大力丸', '5%攻击',茯苓,黄金鳉,金银花,熟地黄,柴胡,熟地黄];
凝神丹.蓝 = ['凝神丹', '5%命中',沉香,熟地黄,金银花,黄金鳉,熟地黄,金银花];
归心散.蓝 = ['归心散', '5%招架',金银花,熟地黄,沉香,茯苓,石楠叶,金银花];
石龟丹.蓝 = ['石龟丹', '5%防御',柴胡,金银花,沉香,茯苓,熟地黄,茯苓];
风行散.蓝 = ['风行散', '5%躲闪',金银花,柴胡,茯苓,沉香,石楠叶,沉香];
风雷丹.蓝 = ['风雷丹', '5%暴击',沉香,熟地黄,柴胡,石楠叶,熟地黄,沉香];
赤火丹.蓝 = ['赤火丹', '10%爆伤',茯苓,茯苓,柴胡,沉香,金银花,熟地黄];
赤血丹.蓝 = ['赤血丹', '5%终伤',茯苓,金银花,黄金鳉,茯苓,鳊鱼,柴胡];
玄武丹.蓝 = ['玄武丹', '5%减伤',石楠叶,沉香,柴胡,鲂鱼,石楠叶,沉香];
破军丹.蓝 = ['破军丹', '5%无视防御',石楠叶,茯苓,熟地黄,柴胡,黄颡鱼,鲮鱼];
风神丹.蓝 = ['风神丹', '20%攻速',沉香,柴胡,茯苓,金银花,茯苓,金银花];
生机丸.蓝 = ['生机丸', '5%内力消耗降低',茯苓,沉香,茯苓,熟地黄,熟地黄,沉香];
玄冰丹.蓝 = ['玄冰丹', '5%绝招释放速度',柴胡,熟地黄,柴胡,石楠叶,黄颡鱼,茯苓];
玄灵丹.蓝 = ['玄灵丹', '5%绝招冷却',石楠叶,柴胡,熟地黄,金银花,石楠叶,金银花];
归元散.蓝 = ['归元散', '10%忙乱',柴胡,茯苓,柴胡,柴胡,金银花,熟地黄];
风行丹.蓝 = ['风行丹', '10%忽视忙乱',金银花,石楠叶,茯苓,石楠叶,沉香,石楠叶];
造化丹.蓝 = ['造化丹', '10%负面效果抵抗',沉香,黄金鳉,茯苓,茯苓,熟地黄,太湖银鱼];
无常丹.蓝 = ['无常丹', '15%内力',金银花,茯苓,石楠叶,金银花,石楠叶,金银花];
清心丹.蓝 = ['清心丹', '20%学习',柴胡,茯苓,熟地黄,石楠叶,金银花,柴胡];
冰心丹.蓝 = ['冰心丹', '20%练习',沉香,茯苓,石楠叶,熟地黄,石楠叶,沉香];
蕴象丹.蓝 = ['蕴象丹', '20%打坐',柴胡,金银花,沉香,金银花,熟地黄,沉香];
突破丹.蓝 = ['突破丹', '快速升级技能',石楠叶,茯苓,沉香,茯苓,石楠叶,罗汉鱼,沉香,鲂鱼];

大还丹.黄 = ['大还丹', '20%气血',冬虫夏草,熟地黄,络石藤,茯苓,熟地黄,九香虫,络石藤];
大力丸.黄 = ['大力丸', '10%攻击',熟地黄,茯苓,熟地黄,冬虫夏草,茯苓,络石藤,黄金鳉];
凝神丹.黄 = ['凝神丹', '10%命中',沉香,络石藤,九香虫,太湖银鱼,熟地黄,九香虫,九香虫];
归心散.黄 = ['归心散', '10%招架',熟地黄,沉香,冬虫夏草,熟地黄,九香虫,冬虫夏草,熟地黄];
石龟丹.黄 = ['石龟丹', '10%防御',沉香,茯苓,熟地黄,络石藤,冬虫夏草,冬虫夏草,络石藤];
风行散.黄 = ['风行散', '10%躲闪',络石藤,熟地黄,冬虫夏草,茯苓,冬虫夏草,沉香,络石藤];
风雷丹.黄 = ['风雷丹', '10%暴击',络石藤,九香虫,茯苓,沉香,沉香,络石藤,络石藤];
赤火丹.黄 = ['赤火丹', '20%爆伤',茯苓,九香虫,茯苓,冬虫夏草,沉香,络石藤,沉香];
赤血丹.黄 = ['赤血丹', '10%终伤',熟地黄,冬虫夏草,反天刀,虹鳟,沉香,九香虫,络石藤];
玄武丹.黄 = ['玄武丹', '10%减伤',九香虫,冬虫夏草,络石藤,九香虫,熟地黄,九香虫,熟地黄];
破军丹.黄 = ['破军丹', '10%无视防御',茯苓,熟地黄,太湖银鱼,茯苓,九香虫,虹鳟,沉香];
风神丹.黄 = ['风神丹', '30%攻速',沉香,九香虫,络石藤,络石藤,沉香,沉香,沉香];
生机丸.黄 = ['生机丸', '10%内力消耗降低',九香虫,熟地黄,九香虫,冬虫夏草,茯苓,络石藤,沉香];
玄冰丹.黄 = ['玄冰丹', '10%绝招释放速度',茯苓,熟地黄,冬虫夏草,九香虫,熟地黄,黄金鳉,茯苓];
玄灵丹.黄 = ['玄灵丹', '10%绝招冷却',冬虫夏草,冬虫夏草,络石藤,络石藤,络石藤,茯苓,沉香];
归元散.黄 = ['归元散', '20%忙乱',沉香,沉香,冬虫夏草,茯苓,冬虫夏草,茯苓,熟地黄];
风行丹.黄 = ['风行丹', '20%忽视忙乱',茯苓,络石藤,熟地黄,熟地黄,熟地黄,冬虫夏草,九香虫];
造化丹.黄 = ['造化丹', '20%负面效果抵抗',络石藤,沉香,熟地黄,茯苓,黄颡鱼,九香虫,太湖银鱼];
无常丹.黄 = ['无常丹', '20%内力',沉香,沉香,络石藤,冬虫夏草,茯苓,沉香,茯苓];
清心丹.黄 = ['清心丹', '30%学习',茯苓,熟地黄,九香虫,冬虫夏草,沉香,络石藤,沉香];
冰心丹.黄 = ['冰心丹', '30%练习',熟地黄,沉香,冬虫夏草,沉香,九香虫,络石藤,茯苓];
蕴象丹.黄 = ['蕴象丹', '30%打坐',沉香,冬虫夏草,冬虫夏草,沉香,熟地黄,九香虫,茯苓];
突破丹.黄 = ['突破丹', '快速升级技能',熟地黄,熟地黄,熟地黄,太湖银鱼,络石藤,孔雀鱼,九香虫,银龙鱼,冬虫夏草];

大还丹.紫 = ['大还丹', '40%气血',九香虫,凌霄花,九香虫,络石藤,人参,九香虫,人参,冬虫夏草];
大力丸.紫 = ['大力丸', '20%攻击',九香虫,九香虫,人参,何首乌,银龙鱼,凌霄花,冬虫夏草,黑龙鱼];
凝神丹.紫 = ['凝神丹', '20%命中',何首乌,人参,人参,人参,九香虫,凌霄花,罗汉鱼,络石藤];
归心散.紫 = ['归心散', '20%招架',何首乌,九香虫,九香虫,九香虫,九香虫,人参,冬虫夏草,何首乌];
石龟丹.紫 = ['石龟丹', '20%防御',人参,人参,九香虫,何首乌,络石藤,凌霄花,凌霄花,何首乌];
风行散.紫 = ['风行散', '20%躲闪',何首乌,人参,冬虫夏草,冬虫夏草,何首乌,冬虫夏草,凌霄花,人参];
风雷丹.紫 = ['风雷丹', '20%暴击',人参,人参,冬虫夏草,络石藤,凌霄花,黑龙鱼,络石藤,何首乌];
赤火丹.紫 = ['赤火丹', '40%爆伤',何首乌,何首乌,络石藤,凌霄花,络石藤,银龙鱼,人参,何首乌];
赤血丹.紫 = ['赤血丹', '20%终伤',凌霄花,九香虫,黑龙鱼,冬虫夏草,虹鳟,络石藤,冬虫夏草,孔雀鱼];
玄武丹.紫 = ['玄武丹', '20%减伤',罗汉鱼,九香虫,九香虫,九香虫,络石藤,冬虫夏草,九香虫,九香虫];
破军丹.紫 = ['破军丹', '20%无视防御',人参,凌霄花,九香虫,络石藤,反天刀,九香虫,罗汉鱼,何首乌];
风神丹.紫 = ['风神丹', '40%攻速',人参,络石藤,九香虫,何首乌,何首乌,络石藤,何首乌,络石藤];
生机丸.紫 = ['生机丸', '20%内力消耗降低',冬虫夏草,何首乌,冬虫夏草,何首乌,人参,九香虫,冬虫夏草,人参];
玄冰丹.紫 = ['玄冰丹', '20%绝招释放速度',冬虫夏草,人参,九香虫,九香虫,反天刀,人参,冬虫夏草,络石藤];
玄灵丹.紫 = ['玄灵丹', '20%绝招冷却',人参,何首乌,黑龙鱼,络石藤,络石藤,络石藤,络石藤,孔雀鱼];
归元散.紫 = ['归元散', '30%忙乱',人参,九香虫,络石藤,罗汉鱼,络石藤,冬虫夏草,凌霄花,冬虫夏草];
风行丹.紫 = ['风行丹', '30%忽视忙乱',凌霄花,何首乌,凌霄花,冬虫夏草,九香虫,冬虫夏草,人参,凌霄花];
造化丹.紫 = ['造化丹', '30%负面效果抵抗',九香虫,冬虫夏草,络石藤,何首乌,反天刀,冬虫夏草,络石藤,孔雀鱼];
无常丹.紫 = ['无常丹', '40%内力',凌霄花,凌霄花,络石藤,冬虫夏草,九香虫,络石藤,凌霄花,凌霄花];
清心丹.紫 = ['清心丹', '40%学习',冬虫夏草,九香虫,九香虫,络石藤,人参,人参,何首乌,凌霄花];
冰心丹.紫 = ['冰心丹', '40%练习',人参,何首乌,凌霄花,络石藤,人参,凌霄花,凌霄花,冬虫夏草];
蕴象丹.紫 = ['蕴象丹', '40%打坐',人参,凌霄花,冬虫夏草,冬虫夏草,何首乌,何首乌,九香虫,人参];
突破丹.紫 = ['突破丹', '快速升级技能',冬虫夏草,九香虫,冬虫夏草,虹鳟,虹鳟,孔雀鱼,络石藤,何首乌,凌霄花,黑龙鱼];

大还丹.橙 = ['大还丹', '50%气血',何首乌,灵芝,灵芝,盘龙参,何首乌,凌霄花,人参,盘龙参,凌霄花];
大力丸.橙 = ['大力丸'];
凝神丹.橙 = ['凝神丹'];
归心散.橙 = ['归心散'];
石龟丹.橙 = ['石龟丹'];
风行散.橙 = ['风行散'];
风雷丹.橙 = ['风雷丹'];
赤火丹.橙 = ['赤火丹'];
赤血丹.橙 = ['赤血丹'];
玄武丹.橙 = ['玄武丹'];
破军丹.橙 = ['破军丹'];
风神丹.橙 = ['风神丹'];
生机丸.橙 = ['生机丸'];
玄冰丹.橙 = ['玄冰丹'];
玄灵丹.橙 = ['玄灵丹'];
归元散.橙 = ['归元散'];
风行丹.橙 = ['风行丹'];
造化丹.橙 = ['造化丹'];
无常丹.橙 = ['无常丹'];
清心丹.橙 = ['清心丹'];
冰心丹.橙 = ['冰心丹'];
蕴象丹.橙 = ['蕴象丹'];
突破丹.橙 = ['突破丹'];

var LIST = [大还丹, 大力丸, 凝神丹, 归心散, 石龟丹, 风行散, 风雷丹, 赤火丹, 赤血丹, 玄武丹, 破军丹, 风神丹, 生机丸, 玄冰丹, 玄灵丹, 归元散, 风行丹, 造化丹, 无常丹, 清心丹, 冰心丹, 蕴象丹, 突破丹];
var color = ['绿','蓝','黄','紫','橙'];
function start() {
	for (var i = 0; i < color.length; i++) {
		var button = document.createElement('button');
		document.getElementById('buttonArea').appendChild(button);
		var div = document.createElement('div');
		document.getElementById('buttonArea').appendChild(div);
		button.type = 'button';
		button.innerHTML = '查看' + color[i] + '色药方';
		button.value = color[i];
		button.onclick = 点击查看药方;
	}
}

function 点击查看药方() {
	var table = document.createElement('table');
	document.getElementById('tableArea').innerHTML = null;
	document.getElementById('tableArea').appendChild(table);
	// var 颜色 = this.value;
	for (var i = 0; i < LIST.length; i++) {
		var tr = document.createElement('tr');
		table.appendChild(tr);
		for (var j = 0; j < 3; j++) {
			var td = document.createElement('td');
			tr.appendChild(td);

			switch (j) {
				case 0:
					td.innerHTML = LIST[i][this.value][j];
					td.className = this.value;
					td.style.width = "4em";
					break;
				case 1:
					if (LIST[i][this.value][j]) {
						td.innerHTML = LIST[i][this.value][j];
						td.className = "green";
					}
					break;
				case 2:
					for (var index = 2; index < LIST[i][this.value].length; index++) {
						if (index == 2) {
							td.innerHTML = LIST[i][this.value][index].output();
						} else {
							td.innerHTML = td.innerHTML+','+LIST[i][this.value][index].output();
						}
					}
					break;
			}
		}
	}
}




