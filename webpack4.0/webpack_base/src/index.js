// Tree Shaking 只支持 ES Module
// import './index.css';
// import './index1.css';

// function getComponent(){
//     // 异步代码分割 
//     return import(/*webpackChunkName:"lodash" */'lodash').then(({ default: _ }) => {
//         var element = document.createElement('div');
//         element.innerHTML = _.join(['Dell', 'Lee'], '-');
//         return element;
//     })
// }

import _ from 'lodash';
import $ from 'jquery';
import React from 'react';
import ReactDom from 'react-dom';

// async function getComponent() {
//     const { default: _ } = await import(/*webpackChunkName:"lodash" */'lodash');
//     const element = document.createElement('div');
//     element.innerHTML = _.join(['Dell', 'Lee'], '-');
//     return element;
// }

// document.addEventListener('click', () => {
//     getComponent().then(element => {
//         document.body.appendChild(element);
//     })

// const element = document.createElement('div');
// element.innerHTML = "wuhan";
// document.body.appendChild(element);

// import(/* webpackPrefetch: true */ './click').then(({default: func}) => {
//     func();
// })
// })

const dom = $('<div>');
dom.html(_.join(['Dell', 'Lee11——22'], '-'));
$('body').append(dom);

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/service-worker.js').then((registration) => {
//             console.log(registration);
//         }).catch(error => {
//             console.log(error);
//         })
//     })
// }
console.log(11);
class App extends React.Component {
    render(){
        return (
            <div>

                hello world
            </div>
        )
    }
}


ReactDom.render(<App />, document.getElementById('nav'));