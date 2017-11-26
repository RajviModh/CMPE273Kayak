import 'rc-slider/assets/index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import Slider from 'rc-slider';
const Range = Slider.Range;

const style = { width: 400, margin: 50 };

function log(value) {
    console.log(value); //eslint-disable-line
}

class CustomizedRange extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lowerBound: 20,
            upperBound: 40,
            value: [20, 40],
        };
    }
    onLowerBoundChange = (e) => {
        this.setState({ lowerBound: +e.target.value });
    };
    onUpperBoundChange = (e) => {
        this.setState({ upperBound: +e.target.value });
    };
    onSliderChange = (value) => {
        log(value);
        this.setState({
            value,
        });
    };
    handleApply = () => {
        const { lowerBound, upperBound } = this.state;
        this.setState({ value: [lowerBound, upperBound] });
    };
    render() {
        return (
            <div>
                <label>LowerBound: </label>
                <input type="number" value={this.state.lowerBound} onChange={this.onLowerBoundChange} />
                <br />
                <label>UpperBound: </label>
                <input type="number" value={this.state.upperBound} onChange={this.onUpperBoundChange} />
                <br />
                <button onClick={this.handleApply}>Apply</button>
                <br /><br />
                <Range allowCross={false} value={this.state.value} onChange={this.onSliderChange} />
            </div>
        );
    }
}

export default CustomizedRange;