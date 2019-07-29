const loaderUtils = require('loader-utils');

module.exports = function(source){
    const options = loaderUtils.getOptions(this);
    console.log('*****');
    console.log(options);
    console.log('******')
    const callback = this.async();

    setTimeout(() => {
        const result = source.replace('dell', options.name);
        callback(null, result);
    }, 1000)
}