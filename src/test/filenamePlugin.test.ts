import * as assert from 'assert';
import MarkdownIt from 'markdown-it';
import { filenamePlugin } from '../filenamePlugin';

suite('filenamePlugin', () => {
    function render(markdown: string): string {
        const md = new MarkdownIt();
        filenamePlugin(md);
        return md.render(markdown);
    }

    test('wraps fenced code blocks that declare a filename', () => {
        const html = render('```js filename="index.js"\nconsole.log(1);\n```\n');

        assert.match(html, /<div class="code-block-with-filename">/);
        assert.match(html, /<div class="code-filename">index\.js<\/div>/);
        assert.match(html, /<\/div>\s*$/);
    });

    test('supports unquoted filenames', () => {
        const html = render('```ts filename=app.ts\nconst x = 1;\n```\n');

        assert.match(html, /<div class="code-filename">app\.ts<\/div>/);
    });

    test('leaves fenced code blocks without a filename untouched', () => {
        const html = render('```js\nconsole.log(1);\n```\n');

        assert.doesNotMatch(html, /code-block-with-filename/);
        assert.match(html, /<pre><code class="language-js">/);
    });

    test('does not leak the filename attribute into subsequent renders', () => {
        render('```js filename="index.js"\nconsole.log(1);\n```\n');
        const html = render('```js\nconsole.log(2);\n```\n');

        assert.doesNotMatch(html, /code-block-with-filename/);
    });
});
