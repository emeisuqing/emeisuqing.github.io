function main() {
    var time = new Date();
    var year = time.getFullYear();    // 年：1234
    var month = time.getMonth();      // 月：0~11
    var date = time.getDate();       // 日期：1~31
    var week = time.getDay();        // 星期：0~6（星期0就是星期日）

    // 表格标题
    document.getElementById("caption").innerHTML = year+"年"+(month+1)+"月";

    // 日历格子 6*7 二维数组
    var calendar = new Array();
    for (var i = 0; i < 6; i++) {
        calendar[i] = new Array();
        for (var j = 0; j < 7; j++) {
            calendar[i][j] = 0;
        }
    }

    // 本月的第一天
    var firstDayThisMonth = new Date(year, month, 1); 
    // 第一天的星期
    var week0 = firstDayThisMonth.getDay();
    calendar[0][week0] = 1;

    for (var i = week0 + 1; i < 7; i++) {
        calendar[0][i] = calendar[0][i-1] + 1;
    }

    var preMonthMaxDate = maxDateOfYearAndMounth(year, month);
    for (var i = 0; i < week0; i++) {
        calendar[0][i] = preMonthMaxDate-i;
    }
    var thisMonthMaxDate = maxDateOfYearAndMounth(year, month+1);
    for (var j = 1; j < 6; j++) {
        var temp = calendar[j-1][6];
        for (var i = 0; i < 7; i++) {
            calendar[j][i] = ++temp;
            if (temp==thisMonthMaxDate) temp = 0;
        }
    }

    var updateCount = 0;

    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 7; j++) {
            var innerText = "" + calendar[i][j];
            var idText = "calendar" + (++updateCount);
            document.getElementById(idText).innerText = innerText;
        }
    }


}

// 指定月份的天数是多少？
function maxDateOfYearAndMounth(y, m) {
    if (m==1||m==3||m==5||m==7||m==8||m==10||m==12) {
        return 31;
    } else if (m==4||m==6||m==9||m==11) {
        return 30;
    } else if (m==2) {
        // 2月的闰年判断 四年一闰 百年不闰
        if (y % 4 == 0 && y % 100 != 0) {
                return 29;
            } else {
                return 28;
            }
    } else {
        return daysOfYearAndMounth(y - 1, 12);
    }
}