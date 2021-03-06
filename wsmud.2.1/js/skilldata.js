var allSkillData = {
    "基础技能" : [
        new Skill("force", "基本内功", 0, 0, 0),
        new Skill("dodge", "基本轻功", 0, 0, 0),
        new Skill("unarmed", "基本拳脚", 0, 0, 0),
        new Skill("parry", "基本招架", 0, 0, 0),
        new Skill("blade", "基本刀法", 0, 0, 0),
        new Skill("sword", "基本剑法", 0, 0, 0),
        new Skill("club", "基本棍法", 0, 0, 0),
        new Skill("staff", "基本杖法", 0, 0, 0),
        new Skill("whip", "基本鞭法", 0, 0, 0),
        new Skill("throwing", "基本暗器", 0, 0, 0),
    ],
    "武当派" : [
        new Skill("wudangxinfa", "武当心法", 1, "内功", "无"),
        new Skill("wudangjianfa", "武当剑法", 1, "武器", "无"),
        new Skill("wudangchangquan", "武当长拳", 1, "拳脚", "无"),
        new Skill("tiyunzong", "梯云纵", 2, 0, 0),
        new Skill("taijishengong", "太极神功", 3, 0, 0),
        new Skill("taijiquan", "太极拳", 3, 0, 0),
        new Skill("taijijian", "太极剑法", 4, 0, 0),
        new Skill("taijiquan2", "太极拳(进阶)", 4, "拳脚", "招架"),
        new Skill("tiyunzong2", "梯云纵(进阶)", 4, "轻功", "无"),
        new Skill("taijijian2", "太极剑法(进阶)", 5, "无", "无"),
        new Skill("taijishengong2", "先天太极(进阶)", 5, "无", "无"),
    ],
    "少林派" : [
        new Skill("shaolinshenfa", "少林身法", 1, 0, 0),
        new Skill("ranmudao", "燃木刀法", 3, 0, 0),
        new Skill("yizhichan", "一指禅", 3, 0, 0),
        new Skill("yijinjing", "易筋经", 4, 0, 0),
        new Skill("weituogun", "韦陀棍", 1, "武器", "无"),
        new Skill("hunyuanyiqi", "混元一气", 1, "内功", "无"),
        new Skill("fuhuquan", "伏虎拳", 1, "拳脚", "无"),
        new Skill("damojian", "达摩剑", 2, "剑法", "无"),
        new Skill("jingangquan", "大力金刚拳", 2, "拳脚", "招架"),
        new Skill("shaolinshenfa2", "一苇渡江(进阶)", 4, "轻功", "无"),
        new Skill("yizhichan2", "一指禅(进阶)", 4, "拳脚", "无"),
        new Skill("ranmudao2", "燃木刀法(进阶)", 5, "无", "无"),
        new Skill("yijinjing2", "金刚不坏体(进阶)", 5, "无", "无"),
    ],
    "华山派" : [
        new Skill("poyuquan", "劈石破玉拳", 1, 0, 0),
        new Skill("zixiashengong", "紫霞神功", 3, 0, 0),
        new Skill("kuangfengkuaijian", "狂风快剑", 3, 0, 0),
        new Skill("dugujiujian", "独孤九剑", 4, 0, 0),
        new Skill("feiyanhuixiang", "飞燕回翔", 1, "轻功", "无"),
        new Skill("huashanxinfa", "华山心法", 1, "内功", "无"),
        new Skill("huashanjianfa", "华山剑法", 1, "武器", "无"),
        new Skill("huashanquanfa", "华山拳法", 1, "拳脚", "无"),
        new Skill("poyuquan2", "劈石破玉拳(进阶)", 4, "拳脚", "招架"),
        new Skill("zixiashengong2", "紫霞神功(进阶)", 4, "内功", "无"),
        new Skill("dugujiujian2", "独孤九剑(进阶)", 5, "无", "无"),
        new Skill("kuangfengkuaijian2", "狂风快剑(进阶)", 5, "无", "无"),
    ],
    "峨眉派" : [
        new Skill("zhutianbu", "诸天化身步", 1, 0, 0),
        new Skill("linjizhuang", "临济十二庄", 3, 0, 0),
        new Skill("jiuyinbaiguzhao", "九阴白骨爪", 3, 0, 0),
        new Skill("yitianjianfa", "倚天剑法", 4, 0, 0),
        new Skill("emeixinfa", "峨眉心法",1,"内功","无"),
        new Skill("jindingzhang", "金顶绵掌", 1, "拳脚", "招架"),
        new Skill("huifengjian", "回风拂柳剑", 2, "武器", "无"),
        new Skill("jiuyinbaiguzhao2", "九阴白骨爪(进阶)", 4, "拳脚", "招架"),
        new Skill("zhutianbu2", "诸天化身步(进阶)", 4, "轻功", "无"),
        new Skill("linjizhuang2", "临济十二庄(进阶)", 5, "无", "无"),
        new Skill("yitianjianfa2", "倚天剑法(进阶)", 5, "无", "无"),
    ],
    "逍遥派" : [
        new Skill("lingboweibu", "凌波微步", 3, 0, 0),
        new Skill("beimingshengong", "北冥神功", 3, 0, 0),
        new Skill("liuyangzhang", "天山六阳掌", 3, 0, 0),
        new Skill("xiaowuxianggong", "小无相功", 4, 0, 0),
        new Skill("ruyidao", "如意刀", 1, "武器", "无"),
        new Skill("xiaoyaoxinfa", "逍遥心法", 1, "内功", "无"),
        new Skill("zhemeishou", "天山折梅手", 2, "拳脚", "招架"),
        new Skill("beimingshengong2", "北冥神功(进阶)", 4, "内功", "招架"),
        new Skill("liuyangzhang2", "天山六阳掌(进阶)", 4, "拳脚", "无"),
        new Skill("lingboweibu2", "凌波微步(进阶)", 5, "无","无"),
        new Skill("xiaowuxianggong2", "小无相功(进阶)", 5, "无", "无"),
    ],
    "丐帮" : [
        new Skill("huntianqigong2", "混元天罡(进阶)", 4, "内功", "无"),
        new Skill("xiaoyaoyou2", "逍遥游(进阶)", 4, "轻功", "无"),
        new Skill("dagoubang2", "打狗棒(进阶)", 5, "无", "无"),
        new Skill("xianglongzhang2", "降龙十八掌(进阶)", 5, "无", "无"),
        new Skill("xiaoyaoyou", "逍遥游", 2, 0, 0),
        new Skill("dagoubang", "打狗棒", 3, 0, 0),
        new Skill("huntianqigong", "混天气功", 3, 0, 0),
        new Skill("xianglongzhang", "降龙十八掌", 4, 0, 0),
        new Skill("jiaohuabangfa", "叫花棒法", 1, "武器", "招架"),
        new Skill("feiyanzoubi", "飞檐走壁", 1, "轻功", "无"),
        new Skill("gaibangxinfa", "丐帮心法", 1, "内功", "无"),
        new Skill("taizuchangquan", "太祖长拳", 1, "拳脚", "无"),
    ],
    "杀手楼" : [
        new Skill("shashoubufa", "杀手步法", 1, "轻功", "无"),
        new Skill("shashouxinfa", "杀手心法", 1, "内功", "无"),
        new Skill("chuanxinzhang", "穿心掌", 2, 0, 0),
        new Skill("shashengjue", "杀生决", 3, 0, 0),
        new Skill("taxuexunmei", "踏雪寻梅", 3, 0, 0),
        new Skill("mantianhuayu", "漫天花雨", 4, 0, 0),
        new Skill("feidao", "飞刀", 1, "暗器", "无"),
        new Skill("chuanxinzhang2", "穿心掌(进阶)", 4, "拳脚", "招架"),
        new Skill("shashengjue2", "杀生决(进阶)", 4, "内功", "无"),
        new Skill("mantianhuayu2", "漫天花雨(进阶)", 5, "武器", "无"),
        new Skill("taxuexunmei2", "踏雪寻梅(进阶)", 5, "轻功", "无"),
    ],
    "公共内功" : [
        new Skill("hamagong", "蛤蟆功", 4, "内功", "拳脚"),
        new Skill("huagongdafa", "化功大法", 4, "内功", "无"),
        new Skill("mingyugong", "明玉功", 4, "内功", "轻功"),
        new Skill("kumushengong", "枯木神功", 4, "内功", "无"),
        new Skill("shenzhaojing", "神照经", 4, "内功", "拳脚"),
        new Skill("xuehaimogong", "血海魔功", 4, "内功", "无"),
        new Skill("longxianggong", "龙象般若功", 5, "内功", "无"),
        new Skill("kuihuashengong", "葵花神功", 5, "内功", "无"),
        new Skill("bahuanggong", "不老长春功", 5, "内功", "无"),
        new Skill("jiuyangshengong", "九阳神功", 5, "内功", "无"),
        new Skill("jiuyinshengong", "九阴神功", 5, "内功", "无"),
        new Skill("taixuangong", "太玄功", 5, "内功", "无"),
        new Skill("mizongxinfa", "密宗心法", 1, "内功", "无"),
        new Skill("yunlongxinfa", "云龙心法", 1, "内功", "无"),
        new Skill("lengyueshengong", "冷月神功", 1, "内功", "无"),
        new Skill("shenlongxinfa", "神龙心法", 2, "内功", "无"),
        new Skill("wudushengong", "五毒神功", 2, "内功", "无"),
        new Skill("biboshengong", "碧波神功", 2, "内功", "无"),
        new Skill("baiyunxinfa", "白云心法", 3, "内功", "无"),
        new Skill("zhenyuejue", "镇岳诀", 3, "内功", "无"),
        new Skill("shenghuoshengong", "圣火神功", 3, "内功", "无"),
        new Skill("没有数据", "寒冰真气", 4, 0, 0),
        new Skill("没有数据", "先天功", 4, 0, 0),
        new Skill("没有数据", "蒙古心法", 2, 0, 0),
        new Skill("没有数据", "磐石神功", 3, 0, 0),
        new Skill("没有数据", "玉女心经", 3, 0, 0),
        
    ],
    "公共轻功" : [
        new Skill("shenxingbaibian", "神行百变", 2, "轻功", "无"),
        new Skill("tagexing", "踏歌行", 2, "轻功", "无"),
        new Skill("tiannanbu", "天南步", 2, "轻功", "无"),
        new Skill("jinsheyoushenbu", "金蛇游身步", 3, "轻功", "无"),
        new Skill("wuduyanluobu", "五毒烟萝步", 3, "轻功", "无"),
        new Skill("anyingfuxiang", "暗影浮香", 3, "轻功", "无"),
        new Skill("xuanxubu", "玄虚步", 4, "轻功", "无"),
        new Skill("yixingbufa", "意形步法", 1, "轻功", "无"),
        new Skill("yunlongshenfa", "云龙身法", 1, "轻功", "无"),
        new Skill("jinyangong", "金雁功", 1, "轻功", "无"),
        new Skill("sixiangbu", "四象步法", 2, "轻功", "无"),
        new Skill("hengshanshenfa", "恒山身法", 2, "轻功", "无"),
        new Skill("chuanyunzong", "穿云纵", 2, "轻功", "无"),
        new Skill("chanchubufa", "蟾蜍步法", 2, "轻功", "无"),
        new Skill("qingfushenfa", "青蝠身法", 2, "轻功", "无"),
        new Skill("没有数据", "摘星功", 2, 0, 0),
        new Skill("没有数据", "身空行", 2, 0, 0),
    ],
    "公共拳脚" : [
        new Skill("yingzhuagong", "鹰爪功", 2, "拳脚", "招架"),
        new Skill("jinshezhang", "金蛇游身掌", 3, "拳脚", "无"),
        new Skill("dasongyangshenzhang", "大嵩阳神掌", 3, "拳脚", "无"),
        new Skill("qishangquan", "七伤拳", 3, "拳脚", "招架"),
        new Skill("sanyinzhua", "三阴蜈蚣爪", 3, "拳脚", "招架"),
        new Skill("tanzhishengong", "弹指神通", 4, "拳脚", "无"),
        new Skill("kongmingquan", "空明拳", 4, "拳脚", "无"),
        new Skill("canhezhi", "参合指", 4, "拳脚", "无"),
        new Skill("liumaishenjian", "六脉神剑", 5, "无","无"),
        new Skill("anranxiaohun", "黯然销魂掌", 5, "无", "无"),
        new Skill("dashouyin", "密宗大手印", 1, "拳脚", "无"),
        new Skill("houquan", "猴拳", 1, "拳脚", "无"),
        new Skill("huagumianzhang", "化骨绵掌", 2, "拳脚", "无"),
        new Skill("baguaquan", "八卦拳", 2, "拳脚", "无"),
        new Skill("liuyunzhang", "流云掌", 2, "拳脚", "无"),
        new Skill("taishanquanfa", "泰山拳法", 2, "拳脚", "招架"),
        new Skill("jueqingzhang", "绝情掌", 2, "拳脚", "无"),
        new Skill("tianchangzhang", "天长掌法", 3, "拳脚", "无"),
        new Skill("cuixinzhang", "摧心掌", 3, "拳脚", "无"),
        new Skill("没有数据", "一阳指", 4, 0, 0),
        
    ],
    "公共招架": [
        new Skill("yihuajiemu", "移花接木", 4, "招架", "无"),
        new Skill("douzhuanxingyi", "斗转星移", 5, "无", "无"),
        new Skill("qiankundanuoyi", "乾坤大挪移", 5, "无", "无"),
    ],
    "公共剑法" : [
        new Skill("hengshanwushenjian", "衡山五神剑", 3, "武器", "招架"),
        new Skill("quanzhenjianfa", "全真剑法", 3, "武器", "无"),
        new Skill("bixiejianfa", "辟邪剑法", 5, "无", "无"),
        new Skill("xuantiejianfa", "玄铁剑法", 5, "无", "无"),
        new Skill("shenlongjian", "神龙剑", 1, "武器", "无"),
        new Skill("tangshijianfa", "唐诗剑法", 1, "武器", "无"),
        new Skill("yunlongjian", "云龙剑", 2, "武器", "无"),
        new Skill("shenghuojianfa", "圣火令法", 2, "武器", "无"),
        new Skill("jinshejianfa", "金蛇剑法", 3, "武器", "无"),
        new Skill("wudugoufa", "五毒钩法", 3, "武器", "无"),
        new Skill("hengshanjianfa", "恒山剑法", 3, "武器", "无"),
        new Skill("songfengjianfa", "松风剑法", 3, "武器", "招架"),
        new Skill("songshanjianfa", "嵩山剑法", 3, "武器", "招架"),
        new Skill("luoyingshenjian", "落英神剑", 3, "武器", "无"),
        new Skill("yifengjian", "移风剑法", 3, "武器","无"),
        new Skill("tianyuqijian", "天羽奇剑", 3, "武器", "无"),
        new Skill("shenjianjue", "神剑诀", 2, "武器", "无"),
        new Skill("没有数据", "泰山剑法", 3, 0, 0),
        new Skill("没有数据", "段家剑", 3, 0, 0),
    ],
    "公共刀法": [
        new Skill("wuhuduanmendao", "五虎断门刀", 1, "武器", "无"),
        new Skill("hujiadaofa", "胡家刀法", 2, "武器", "招架"),
        new Skill("kuangfengkuaidao", "狂风快刀", 3, "武器","无"),
        new Skill("xuedao", "血刀", 5, "无", "无"),
    ],
    "公共棍法" : [
        new Skill("juemengun", "绝门棍", 1, "武器", "轻功"),
        new Skill("baguagun", "八卦棍法", 2, "武器", "无"),
        new Skill("zhongpingqiang", "中平枪法", 3, "武器", "招架"),
        new Skill("mengguqiqiang", "蒙古骑枪", 3, "武器", "无"),
    ],
    "公共杖法": [
        new Skill("shedaoqigong", "蛇岛奇功", 2, "武器", "招架"),
        new Skill("lingshezhangfa", "灵蛇杖法", 4, "武器", "招架"),
        new Skill("wuchangzhang", "", 2, "武器", "招架"),
    ],
    "公共鞭法" : [
        new Skill("yunlongbian", "云龙鞭法", 1, "武器", "无"),
        new Skill("qiufengfuchen", "秋风拂尘", 1, "武器", "无"),
        new Skill("yinsuojinling", "银索金铃", 3, "武器", "无"),
    ],
    "公共暗器": [
        new Skill("jinshezhui", "金蛇锥法", 2, "武器", "无"),
        new Skill("feixingshu", "飞星术", 2, "武器", "无"),
    ],
}