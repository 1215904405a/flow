# flow
flow check

Flow就是JavaScript的静态类型检查工具

flow注意点： facebook开发（默认支持react）vue和react支持   看源码必备
# 1、静态类型检查  flow-bin
# 2、注释转换成浏览器识别的代码 babel-preset-flow 
# 3、eslint支持flow  eslint-plugin-flowtype
参考链接： https://zhuanlan.zhihu.com/p/26204569   https://zhuanlan.zhihu.com/p/24649359 https://flow.org


配置文件：
[ignore]
<PROJECT_ROOT>/mock/.*
<PROJECT_ROOT>/node_modules/.*

[include] /*如果我们想对当前 Flow 项目以外的文件或者目录进行检查，需要把它们写在 include配置项中。*/

[libs]
./flow

[lints]

[options]
module.file_ext=.less

[strict]

[version]
0.66.0

