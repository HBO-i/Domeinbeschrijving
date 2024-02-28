import React, {FunctionComponent} from 'react';

export interface HighlightProps {
    highlight?: string;
}

interface Props extends HighlightProps {
    children: string;
}

const HighlightText: FunctionComponent<Props> = (props) => {

    const highlightText = (fullText: string, textToHighlight: string): string => {
        const sanitizedTextToHighlight = sanitizeHtml(fullText).trim();

        if (!sanitizedTextToHighlight)
            return sanitizedTextToHighlight;

        const regex = new RegExp(`(${textToHighlight})`, 'gi');

        return sanitizedTextToHighlight.replace(regex, '<span class="text-highlight">$1</span>');
    }

    const sanitizeHtml = (text: string) => {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    };

    return (
        <span dangerouslySetInnerHTML={{ __html: highlightText(props.children, props.highlight ?? '') }} />
    );
};

export default HighlightText;
