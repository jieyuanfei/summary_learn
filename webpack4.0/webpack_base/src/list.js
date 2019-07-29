import React from 'react';
import ReactDom from 'react-dom';

class List extends React.Component {
    render() {
        return (
            <div>
                hello world
                <h1>wuhan</h1>
            </div>
        )
    }
}


ReactDom.render(<List />, document.getElementById('root'));