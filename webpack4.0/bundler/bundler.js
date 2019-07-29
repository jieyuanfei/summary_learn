const fs = require('fs');
const path = require('path');
const parser = require('@babel/parser');
// 默认导出 es module, 添加 default 则导出 exports.default
const traverse = require('@babel/traverse').default;
const babel = require('@babel/core');

/**
 *  解析单个文件
 *  把单个文件的 文件路径, 文件依赖关系, 代码返回出来
 */
const moduleAnalyser = (filename) => {
    const content = fs.readFileSync(filename, 'utf-8');
    let ast = parser.parse(content, {
        sourceType: 'module'
    });
    const dependencies = {};
    traverse(ast, {
        ImportDeclaration({node}) {
            const dirname = path.dirname(filename);
            const newFile = "./" + path.join(dirname, node.source.value);
            dependencies[node.source.value] = newFile;
        }
    });

    const { code } = babel.transformFromAst(ast, null, {
        presets: ["@babel/preset-env"]
    });

    return {
        filename,
        dependencies,
        code
    }
}

/**
 *  依赖图谱
 *  返回 src 文件下所有文件之间的依赖关系图谱
 */
const makeDependenciesGraph = (entry) => {
    const entryModule = moduleAnalyser(entry);
    const graphArray = [ entryModule ];
    for (let i = 0; i < graphArray.length; i++) {
        const item = graphArray[i];
        const { dependencies } = item;
        if(dependencies){
            for (const key in dependencies) {
                graphArray.push(
                    moduleAnalyser(dependencies[key])
                )
            }
        } 
    }
    
    const graph = {};
    graphArray.forEach(item => {
        graph[item.filename] = {
            dependencies: item.dependencies,
            code: item.code
        }
    });
    return graph;
}

const generateCode = (entry) => {
    const graph = JSON.stringify(makeDependenciesGraph(entry));
    return `
        (function(graph){
            function require(module){
                function localRequire(relatviePath){
                    return require(graph[module].dependencies[relatviePath]);
                }
                var exports = {};
                (function(require, exports, code){
                    eval(code)
                })(localRequire, exports, graph[module].code);
                return exports;
            }
            require('${entry}')
        })(${graph})
    `;
}

const code = generateCode('./src/index.js');
console.log(code);