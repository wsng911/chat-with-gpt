import Plugin from "../core/plugins";
import { Plugin描述 } from "../core/plugins/plugin-description";
import { OpenAIMessage, Parameters } from "../core/chat/types";
import { countTokens, runChatTrimmer } from "../core/tokenizer/wrapper";
import { default模型 } from "../core/chat/openai";

export const systemPrompt = `
Please read the following exchange and write a short, concise title describing the topic (in the user's language).
If there is no clear topic for the exchange, respond with: N/A
`.trim();

export const systemPromptForLongExchanges = `
Please read the following exchange and write a short, concise title describing the topic (in the user's language).
`.trim();

export interface 标题PluginOptions {
}

const userPrompt = (messages: OpenAIMessage[]) => {
    return messages.map(m => `${m.role.toLocaleUpperCase()}:\n${m.content}`)
        .join("\n===\n")
        + "\n===\n标题:";
}

export class 标题Plugin extends Plugin<标题PluginOptions> {
    describe(): Plugin描述 {
        return {
            id: "titles",
            name: "标题 Generator",
            options: [],
        };
    }

    async postprocess模型Output(message: OpenAIMessage, contextMessages: OpenAIMessage[], parameters: Parameters, done: boolean): Promise<OpenAIMessage> {
        if (done && !this.context?.getCurrentChat().title) {
            (async () => {
                let messages = [
                    ...contextMessages.filter(m => m.role === 'user' || m.role === 'assistant'),
                    message,
                ];

                const tokens = await countTokens(messages);

                messages = await runChatTrimmer(messages, {
                    maxTokens: 1024,
                    preserveFirstUserMessage: true,
                    preserveSystemPrompt: false,
                });

                messages = [
                    {
                        role: 'system',
                        content: tokens.length > 512 ? systemPromptForLongExchanges : systemPrompt,
                    },
                    {
                        role: 'user',
                        content: userPrompt(messages),
                    },
                ]

                const output = await this.context?.createChatCompletion(messages, {
                    model: default模型,
                    temperature: 0,
                });
                
                if (!output || output === 'N/A') {
                    return;
                }

                this.context?.setChat标题(output);
            })();
        }
        return message;
    }
}