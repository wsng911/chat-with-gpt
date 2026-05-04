import { FormattedMessage } from "react-intl";
import Plugin from "../core/plugins";
import { Plugin描述 } from "../core/plugins/plugin-description";
import { OpenAIMessage, Parameters } from "../core/chat/types";

export const defaultSystemPrompt = `
You are ChatGPT, a large language model trained by OpenAI.
Knowledge cutoff: 2021-09
Current date and time: {{ datetime }}
`.trim();

export interface SystemPromptPluginOptions {
    systemPrompt: string;
}

export class SystemPromptPlugin extends Plugin<SystemPromptPluginOptions> {
    describe(): Plugin描述 {
        return {
            id: "system-prompt",
            name: "系统提示词",
            options: [
                {
                    id: "systemPrompt",
                    defaultValue: defaultSystemPrompt,
                    displayOn设置Screen: "chat",
                    resettable: true,
                    scope: "chat",
                    renderProps: {
                        type: "textarea",
                        description: <p>
                            <FormattedMessage defaultMessage={"The 系统提示词 is an invisible message inserted at the start of the chat and can be used to give ChatGPT information about itself and general guidelines for how it should respond. The <code>'{{ datetime }}'</code> tag is automatically replaced by the current date and time (use this to give the AI access to the time)."}
                                values={{ code: v => <code>{v}</code> }} />
                        </p>,
                    },
                    displayInQuick设置: {
                        name: "系统提示词",
                        displayByDefault: true,
                        label: "Customize system prompt",
                    },
                },
            ],
        };
    }

    async preprocess模型Input(messages: OpenAIMessage[], parameters: Parameters): Promise<{ messages: OpenAIMessage[]; parameters: Parameters; }> {
        const output = [
            {
                role: 'system',
                content: (this.options?.systemPrompt || defaultSystemPrompt)
                    .replace('{{ datetime }}', new Date().toLocaleString()),
            },
            ...messages,
        ];

        return {
            messages: output,
            parameters,
        };
    }
}