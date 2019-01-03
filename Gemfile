source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve

# Jekyll 版本
gem "jekyll", "~> 3.8.5"

# 默认主题
gem "minima", "~> 2.0"

# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. 
# 升级 `bundle update github-pages`
# gem "github-pages", group: :jekyll_plugins

# 插件
group :jekyll_plugins do
  gem "jekyll-feed", "~> 0.6"
end

# Windows does not include 时区信息 files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# Performance-booster for watching directories on Windows
# 用于在 Windows 上查看目录的性能增强器
gem "wdm", "~> 0.1.0" if Gem.win_platform?

