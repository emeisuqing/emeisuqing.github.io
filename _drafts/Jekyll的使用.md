---
layout: post
title: test
subtitle: 副标题
---


### 全局(Global)变量

|变量|说明|
|:-:|:-|
|site|来自_config.yml文件，全站范围的信息 +配置。|
|page|页面专属的信息 + YAML 头文件信息。通过 YAML 头文件自定义的信息都可以在这里被获取。|
|content|被 layout 包裹的那些 Post 或者 Page 渲染生成的内容。但是又没定义在 Post 或者 Page 文件中的变量。|
|paginator|每当 paginate 配置选项被设置了的时候，这个变量就可用了。|

### 全站(site)变量

|变量|说明|
|:-:|:-|
|site.time|当前时间（跑jekyll这个命令的时间点）。|
|site.pages|所有 Pages 的清单。|
|site.posts|一个按照时间倒叙的所有 Posts 的清单。|
|site.related_posts|如果当前被处理的页面是一个 Post，这个变量就会包含最多10个相关的 Post。默认的情况下， 相关性是低质量的，但是能被很快的计算出来。如果你需要高相关性，就要消耗更多的时间来计算。 用jekyll 这个命令带上 --lsi (latent semantic indexing) 选项来计算高相关性的 Post。|
|site.categories.CATEGORY|所有的在 CATEGORY 类别下的帖子。|
|site.tags.TAG|所有的在 TAG 标签下的帖子。|
|site.[CONFIGURATION_DATA]|所有的通过命令行和 _config.yml 设置的变量都会存到这个 site 里面。|

### 页面(page)变量

任何你自定义的头文件信息都会在 page 中可用。

|变量|说明|
|:-:|:-|
|page.content|页面内容的源码。
|page.title|页面的标题。
|page.excerpt|页面摘要的源码。
|page.url|帖子以斜线打头的相对路径，例子： /2008/12/14/my-post.html。
|page.date|帖子的日期。日期的可以在帖子的头信息中通过用以下格式 YYYY-MM-DD HH:MM:SS (假设是 UTC), 或者 YYYY-MM-DD HH:MM:SS +/-TTTT ( 用于声明不同于 UTC 的时区， 比如 2008-12-14 10:30:00 +0900) 来显示声明其他 日期/时间 的方式被改写，
|page.id|帖子的唯一标识码（在RSS源里非常有用），比如 /2008/12/14/my-post
|page.categories|这个帖子所属的 Categories。Categories 是从这个帖子的 _posts 以上 的目录结构中提取的。距离来说, 一个在 /work/code/_posts/2008-12-24-closures.md 目录下的 Post，这个属性就会被设置成 ['work', 'code']。不过 Categories 也能在 YAML 头文件信息 中被设置。
|page.tags|这个 Post 所属的所有 tags。Tags 是在YAML 头文件信息中被定义的。
|page.path|Post 或者 Page 的源文件地址。举例来说，一个页面在 GitHub上得源文件地址。 这可以在 YAML 头文件信息 中被改写。

### 分页器(Paginator)

|变量|说明|
|:-:|:-|
|paginator.per_page|每一页Posts的数量。
|paginator.posts|这一页可用的Posts。
|paginator.total_posts|Posts 的总数。
|paginator.total_pages|Pages 的总数。
|paginator.page|当前页号。
|paginator.previous_page|前一页的页号。
|paginator.previous_page_path|前一页的地址。
|paginator.next_page|下一页的页号。
|paginator.next_page_path|下一页的地址。

### Gist

使用 gist 标签可以轻松的把 GitHub Gist 签入到网站中：`{\% gist 5555251 \%}`
你还可以配置 gist 的文件名，用以显示：`{\% gist 5555251 result.md \%}`
gist 同样支持私有的 gists ，这需要 gist 所属的 github 用户名：`{\% gist parkr/931c1c8d465a04042403 \%}`私有的 gist 同样支持文件名。


Subcommands:
  build, b              Build your site
  clean                 Clean the site (removes site output and metadata file) without building.
  doctor, hyde          Search site and print specific deprecation warnings
  help                  Show the help message, optionally for a given subcommand.
  new                   Creates a new Jekyll site scaffold in PATH
  new-theme             Creates a new Jekyll theme scaffold
  serve, server, s      Serve your site locally





### 使用 Jekyll 的分页功能报错

```ruby
$ sudo gem install jekyll_plugins
```

在Gemfile中添加:
```ruby
gem 'jekyll-paginate', group::jekyll_plugins
```


