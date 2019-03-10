class BookMark {
    constructor(title, url) {
        this.title = title;
        this.url = url;
    }

    get html() {
        return "<a></a>";
    }
}

var list = {
    "搜索": [
        new BookMark("Google", "https://google.com"),
        new BookMark("Baidu", "https://baidu.com"),
        new BookMark("Bing", "https://cn.bing.com"),
    ],
    "官方软件下载": [
        new BookMark("Sound Siphon", "https://staticz.com/soundsiphon/"),
    ],
}



for (const key in list) {
    $("#listDiv").append(
        $("<span></span>").html(key).css("font-size", "1.5em"),
        $("<div></div>").attr("id", "id" + key),
    );
    list[key].forEach(bookmark => {
        $("#id" + key).append(
            $("<a></a>").html(bookmark.title).attr("href", bookmark.url),
            $("<span></span>").html(" | ")
        );
    });
}
