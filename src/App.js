import React from 'react';
import Textarea from 'react-textarea-autosize';
import {CopyToClipboard} from "react-copy-to-clipboard";
import './App.css';
// https://gist.github.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb
import isMobile from './mobileDetection';
import Checkbox from "./Checkbox";
import emojis from './emojisShort';

const shortcodeRegex = new RegExp(/:\w*?:/, 'g');
const aggroRegex = new RegExp(/\w+|:\w+:/, 'g');
const colonReg = new RegExp(/:/, 'g');

const matchEmoji = (shortCode) => {
    const lowerMatch = shortCode.toLowerCase();
    const val = emojis.find(val => lowerMatch === val.shortcode || lowerMatch === val.shortcode.replace(colonReg, ''));
    if (val !== undefined) {
        return val;
    }
    return undefined;
};

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rawValue: null,
            convertedValue: null,
            copyClass: null,
            options: {
                aggressive: isMobile()
            }
        }
    };

    convertText = (rawText, convertAggro = false) => {
        const regex = convertAggro ? aggroRegex : shortcodeRegex;

        return rawText.replace(regex, (match) => {
            const foundMatch = matchEmoji(match);
            if (foundMatch !== undefined) {
                return foundMatch.emoji;
            }
            return match;
        });
    };

    convertOnInput = (e) => {

        const rawValue = e.target.value;

        const convertedValue = this.convertText(e.target.value, this.state.options.aggressive);

        this.setState({
            ...this.state,
            rawValue,
            convertedValue
        });
    };

    handleCheck = (name) => {
        const newState = {
            ...this.state,
            options: {
                ...this.state.options,
                [name]: !this.state.options[name]
            }
        };
        if (name === 'aggressive') {
            newState.convertedValue = this.convertText(this.state.rawValue, !this.state.options.aggressive);
        }
        this.setState(newState);
    };


    copyText = () => {
        this.setState({...this.state, copyClass: 'show'});
        setTimeout(() => this.setState({...this.state, copyClass: null}), 2000);
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="content">
                        <h2>Discord Emoji Shortcode Converter</h2>
                        <p>Paste text from discord with shortcodes to convert them back to regular emojis</p>
                        <div className="optionsContainer">
                            <h3 style={{textAlign: 'left'}}>Options</h3>
                            <Checkbox label={'Aggressive (Match any words)'}
                                      defaultVal={this.state.options.aggressive}
                                      handleCheckboxChange={() => this.handleCheck('aggressive')}/>
                        </div>
                        <Textarea minRows={3} maxRows={20} className="rawText" onChange={this.convertOnInput}/>
                        <CopyToClipboard
                            text={this.state.convertedValue}
                            onCopy={this.copyText}>
                            <div className="convertedText">{this.state.convertedValue}</div>
                        </CopyToClipboard>
                    </div>
                    <div className="footer">Made hastily by <a href="https://matthewfoxx.com">Matthew Foxx</a></div>
                </header>
                <div id="snackbar" className={this.state.copyClass}>Copied!</div>
            </div>
        );
    }
}

export default App;
