import { OptionGroup } from "../core/options/option-group";

export const autoScrollOptions: OptionGroup = {
    id: 'auto-scroll',
    name: "Autoscroll",
    options: [
        {
            id: 'auto-scroll-when-opening-chat',
            defaultValue: false,
            displayOn设置Screen: "ui",
            displayAsSeparateSection: false,
            renderProps: {
                type: "checkbox",
                label: "Auto-scroll to the bottom of the page when opening a chat",
            },
        },
        {
            id: 'auto-scroll-while-generating',
            defaultValue: true,
            displayOn设置Screen: "ui",
            displayAsSeparateSection: false,
            renderProps: {
                type: "checkbox",
                label: "Auto-scroll while generating a response",
            },
        },
    ],
}

export const inputOptions: OptionGroup = {
    id: 'input',
    name: "Message Input",
    options: [
        {
            id: 'submit-on-enter',
            defaultValue: true,
            displayOn设置Screen: "ui",
            displayAsSeparateSection: false,
            displayInQuick设置: {
                name: "Enable/disable submit message when Enter is pressed",
                displayByDefault: false,
                label: (value) => value ? "Disable submit on Enter" : "Enable submit on Enter",
            },
            renderProps: {
                type: "checkbox",
                label: "提交 message when Enter is pressed",
            },
        },
    ],
}

export const markdownOptions: OptionGroup = {
    id: 'markdown',
    name: "Markdown",
    options: [
        {
            id: 'katex',
            defaultValue: false,
            displayOn设置Screen: "ui",
            renderProps: {
                type: "checkbox",
                label: "Enable Katex math rendering (experimental)",
            },
        },
    ],
}