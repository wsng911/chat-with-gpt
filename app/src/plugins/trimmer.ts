import Plugin from "../core/plugins";
import { Plugin描述 } from "../core/plugins/plugin-description";
import { OpenAIMessage, Parameters } from "../core/chat/types";
import { maxTokensBy模型 } from "../core/chat/openai";
import { countTokens, runChatTrimmer } from "../core/tokenizer/wrapper";

export interface ContextTrimmerPluginOptions {
    maxTokens: number;
    maxMessages: number | null;
    preserveSystemPrompt: boolean;
    preserveFirstUserMessage: boolean;
}

export class ContextTrimmerPlugin extends Plugin<ContextTrimmerPluginOptions> {
    describe(): Plugin描述 {
        return {
            id: "context-trimmer",
            name: "Message Context",
            options: [
                {
                    id: 'maxTokens',
                    displayOn设置Screen: "chat",
                    defaultValue: 2048,
                    scope: "chat",
                    renderProps: (value, options) => ({
                        label: `Include a maximum of ${value} tokens`,
                        type: "slider",
                        min: 512,
                        max: maxTokensBy模型[options.getOption('parameters', 'model')] || 2048,
                        step: 64,
                    }),
                    validate: (value, options) => {
                        const max = maxTokensBy模型[options.getOption('parameters', 'model')] || 2048;
                        return value <= max;
                    },
                    displayInQuick设置: {
                        name: "Max Tokens",
                        displayByDefault: false,
                        label: value => `Max tokens: ${value}`,
                    },
                },
                // {
                //     id: 'maxMessages',
                //     displayOn设置Screen: "chat",
                //     defaultValue: null,
                //     scope: "chat",
                //     renderProps: (value) => ({
                //         label: `Include only the last ${value || 'N'} messages (leave blank for all)`,
                //         type: "number",
                //         min: 1,
                //         max: 10,
                //         step: 1,
                //     }),
                //     displayInQuick设置: {
                //         name: "Max Messages",
                //         displayByDefault: false,
                //         label: value => `Include ${value ?? 'all'} messages`,
                //     },
                // },
                {
                    id: 'preserveSystemPrompt',
                    displayOn设置Screen: "chat",
                    defaultValue: true,
                    scope: "chat",
                    renderProps: {
                        label: "Try to always include the 系统提示词",
                        type: "checkbox",
                    },
                },
                {
                    id: 'preserveFirstUserMessage',
                    displayOn设置Screen: "chat",
                    defaultValue: true,
                    scope: "chat",
                    renderProps: {
                        label: "Try to always include your first message",
                        type: "checkbox",
                    },
                },
            ],
        };
    }

    async preprocess模型Input(messages: OpenAIMessage[], parameters: Parameters): Promise<{ messages: OpenAIMessage[]; parameters: Parameters; }> {
        const before = await countTokens(messages);

        const options = this.options;

        const trimmed = await runChatTrimmer(messages, {
            maxTokens: options?.maxTokens ?? 2048,
            nMostRecentMessages: options?.maxMessages ?? undefined,
            preserveFirstUserMessage: options?.preserveFirstUserMessage || true,
            preserveSystemPrompt: options?.preserveSystemPrompt || true,
        });

        const after = await countTokens(trimmed);

        const diff = after - before;
        console.log(`[context trimmer] trimmed ${diff} tokens from context`);

        return {
            messages: trimmed,
            parameters,
        };
    }
}