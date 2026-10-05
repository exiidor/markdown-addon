import * as vscode from 'vscode';
import { filenamePlugin } from './filenamePlugin';

export function activate(
    context: vscode.ExtensionContext
): { extendMarkdownIt(md: any): any } {
    console.log('Markdown Filenames extension activated');

    return {
        extendMarkdownIt(md: any) {
            console.log('Markdown Filenames renderer loaded');

            filenamePlugin(md);
            return md;
        }
    };
}

export function deactivate(): void {}