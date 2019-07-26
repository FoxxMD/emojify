import React from 'react';
import Textarea from 'react-textarea-autosize';
import {CopyToClipboard} from "react-copy-to-clipboard";
import './App.css';
// https://gist.github.com/oliveratgithub/0bf11a9aff0d6da7b46f1490f86a71eb
import emojis from './emojisShort';

const shortcodeRegex = new RegExp(/:\S*?:/, 'g');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            convertedValue: null,
            copyClass: null
        };
    }

    convertText = (e) => {
        const replacedText = e.target.value.replace(shortcodeRegex, (match) => {
            const lowerMatch = match.toLowerCase();
            const val = emojis.find(val => lowerMatch === val.shortcode);
            if (val !== undefined) {
                return val.emoji;
            }
            return match;
        });
        this.setState({
            convertedValue: replacedText
        });
    };

    copyText = () => {
        // this.textArea.select();
        // document.execCommand('copy');
        this.setState({...this.state, copyClass: 'show'});
        setTimeout(() => this.setState({...this.state, copyClass: null}), 2000);
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <div className="content">
                        <h2>Discord Emoji Shortcode Converter</h2>
                        <p>Paste text from discord with shortcodes to convert them back to regular emojis</p>
                        <Textarea minRows={3} maxRows={20} className="rawText" onChange={this.convertText}/>
                        {/*<textarea ref={(textarea) => this.textArea = textarea}*/}
                        {/*          style={{display:'none'}} value={this.state.convertedValue}/>*/}
                        <CopyToClipboard
                            text={this.state.convertedValue}
                            onCopy={this.copyText}>
                            <div className="convertedText">{this.state.convertedValue}</div>
                        </CopyToClipboard>
                        {/*<div id="convertedTextTarget"*/}
                        {/*     className="convertedText"*/}
                        {/*     onClick={this.copyText}>*/}
                        {/*    {this.state.convertedValue}*/}
                        {/*</div>*/}
                    </div>
                    <div className="footer">Made hastily by <a href="https://matthewfoxx.com">Matthew Foxx</a></div>
                </header>
                <div id="snackbar" className={this.state.copyClass}>Copied!</div>
            </div>
        );
    }
}

// :.*?:
export default App;
