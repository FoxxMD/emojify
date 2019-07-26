import React, {Component} from 'react';

class Checkbox extends Component {

    constructor(props) {
        super(props);
        const {defaultVal = false} = props;
        this.state = {
            isChecked: defaultVal,
        }
    }


    toggleCheckboxChange = () => {
        const {handleCheckboxChange, label} = this.props;

        this.setState(({isChecked}) => (
            {
                isChecked: !isChecked,
            }
        ));

        handleCheckboxChange(label);
    }

    render() {
        const {label} = this.props;
        const {isChecked} = this.state;

        return (
            <div className="checkbox">
                <label>
                    <input
                        type="checkbox"
                        value={label}
                        checked={isChecked}
                        onChange={this.toggleCheckboxChange}
                    />

                    {label}
                </label>
            </div>
        );
    }
}

export default Checkbox;
