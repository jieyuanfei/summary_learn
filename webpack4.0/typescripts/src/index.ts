/**
 *  初始化 tsconfig.json
 *  tsc --init
 * 
 *  使用 lodash 
 *  npm i lodash --save-dev
 *  还要安装配置文件 
 *  npm i @types/lodash --save-dev
 * 
 *  使用 jquery
 *  npm i jquery --save-dev
 *  还要安装配置文件 
 *  npm i @types/jquery --save-dev
 * 
 *  配置文件搜索官网: 
 *  https://microsoft.github.io/TypeSearch/
 * 
 */

import * as _ from 'lodash';

class Greeter {
    greeting: string;
    constructor(message: string) {
        this.greeting = message
    }
    greet(): string {
        return `${this.greeting}, hello`;
    }

    hello(): string {
        return _.join(["tom", "wuhan"], "_");
    }
}

let greeter = new Greeter("Tom");
let btn = document.createElement('button');
btn.textContent = "Say hello";
btn.onclick = function (): void {
    console.log(greeter.greet())
}

document.body.appendChild(btn);