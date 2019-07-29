class CopyrightWebpackPlugin {
    constructor(options) {
        console.log("插件被使用了");
        console.log(options);
    }

    // compiler 是 webpack 的实例
    apply(compiler) {
        // compilation 本次打包的所有参数配置
        compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
            // console.log(compilation.assets);
            console.log('emit 异步 ... going ');
            debugger;
            compilation.assets['copyright.txt'] = {
                source: function(){
                    return 'copyright by dell lee'
                },
                size: function(){
                    return 21;
                }
            }
            cb();
        })

        compiler.hooks.compile.tap('CopyrightWebpackPlugin', () => {
            console.log('compile 同步 。。。 going');
        })
    }
}

module.exports = CopyrightWebpackPlugin;