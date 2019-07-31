# Emoji Tools

*Tools to help with common emoji issues on the web*

## Discord Emoji Shortcode Converter

The main (and currently only) tool for this site. When text is copied from Discord all emojis are automatically converted to shortcodes like this: `:joy:`

This tool will take any inputted text and convert shortcodes back to unified emojis.

#### Usage

Enter or paste text into the textarea input. Converted text will appear below the box. Clicking on the text will copy it to your clipboard.

#### Options

* *Aggressive* - First converts any text in shortcode format. Then attempts to match remaining text against shortcodes, without colons, and converts to emojis. This is useful for pasting from Discord on mobile as it does not preserve colons.

#### Aliases

Shortcodes that are not included in emoji-js can be added to [extraShortcodeAliases.js](https://github.com/FoxxMD/discord-emoji-shortcode-converter/blob/master/src/extraShortcodeAliases.js)

## Contributing

Make a PR for some extra functionality and I will happily accept it :)

## License

This package is licensed under the [MIT license](https://github.com/FoxxMD/discord-emoji-shortcode-converter/blob/master/LICENSE).
