---
layout: post 
title:  "Welcome to Jekyll!"
date:   2018-09-21 10:45:33 +0800
categories: jekyll update
---

## 头信息

　　你可以在页面或者博客的头信息处使用一些已经预定义好的全局变量。

- 预定义的全局变量
  - `layout: `
  　　使用 _layouts_ 目录下，指定的模板文件。
  - `permalink: `
  　　自定义文章的`URL`地址，默认值是`/year/month/day/title.html`。
  - `published: `
  　　不常用。当站点生成的时候，如果你不需要展示一个具体的博文，可以设置这个变量为`false`。
  - `categories: `
  　　设置文章的分类属性。如果有多个分类属性，请用空格隔开。
  - `tags: `
  　　设置文章的标签属性。类似分类，多个标签请用空格隔开。

- 自定义变量






You’ll find this post in your `_posts` directory. Go ahead and edit it and re-build the site to see your changes. You can rebuild the site in many different ways, but the most common way is to run `jekyll serve`, which launches a web server and auto-regenerates your site when a file is updated.

To add new posts, simply add a file in the `_posts` directory that follows the convention `YYYY-MM-DD-name-of-post.ext` and includes the necessary front matter. Take a look at the source for this post to get an idea about how it works.

Jekyll also offers powerful support for code snippets:

{% highlight ruby %}
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
{% endhighlight %}

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll Talk][jekyll-talk].

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
