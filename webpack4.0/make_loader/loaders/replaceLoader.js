const loaderUtils = require('loader-utils');

module.exports = function (source) {
    // 获取 options 中配置的参数
    const options = loaderUtils.getOptions(this);
    console.log(options);
    return source.replace('lee', options.name);

    // const result = source.replace('dell', 'ankerDell');
    // this.callback(
    //     null,
    //     result
    // );
}


// 异步回调
// module.exports = function(source){
//     const options = loaderUtils.getOptions(this);
//     const callback = this.async();

//     setTimeout(() => {
//         const result = source.replace('dell', 'ankerDell');
//         callback(null, result);
//     }, 1000)
// }