export function filenamePlugin(md: any): void {
    const originalFence =
        md.renderer.rules.fence?.bind(md.renderer.rules) ??
        ((tokens: any[], idx: number, options: any, env: any, self: any) =>
            self.renderToken(tokens, idx, options));

    md.renderer.rules.fence = (
        tokens: any[],
        idx: number,
        options: any,
        env: any,
        self: any
    ): string => {
        const token = tokens[idx];
        const originalInfo = token.info ?? '';

        const filenameMatch = originalInfo.match(
            /(?:^|\s)filename=(?:"([^"]+)"|'([^']+)'|([^\s]+))/
        );

        if (!filenameMatch) {
            return originalFence(tokens, idx, options, env, self);
        }

        const filename =
            filenameMatch[1] ??
            filenameMatch[2] ??
            filenameMatch[3];

        try {
            token.info = originalInfo
                .replace(filenameMatch[0], ' ')
                .trim();

            const renderedCode = originalFence(
                tokens,
                idx,
                options,
                env,
                self
            );

            return [
                '<div class="code-block-with-filename">',
                `<div class="code-filename">${md.utils.escapeHtml(filename)}</div>`,
                renderedCode,
                '</div>'
            ].join('\n');
        } finally {
            // Avoid modifying the token for other renderers.
            token.info = originalInfo;
        }
    };
}