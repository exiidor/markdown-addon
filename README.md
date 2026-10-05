# markdown-addon

Adds a `filename=` attribute to fenced code blocks in Markdown preview, rendering the filename as a labeled tag on a paper-card-styled code block.

## Features

Add `filename="..."` (or `filename=...` unquoted) to a fenced code block's info string:

````markdown
```js filename="index.js"
console.log('hello world');
```
````

The Markdown preview renders this as a card with the filename shown as a small tab label above the code.

## Requirements

None.

## Known Issues

None currently known.

## Release Notes

### 0.0.1

Initial release: `filename=` fenced code block support with paper-card preview styling.

