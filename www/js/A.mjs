import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class  hello extends React.Component{

    render() {
        return(<div>Hello world</div>)
    }

}

ReactDOM.create(hello,document.getElementById("map"));