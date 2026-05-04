import { default模型 } from "../core/chat/openai";
import { OptionGroup } from "../core/options/option-group";

export const parameterOptions: OptionGroup = {
    id: 'parameters',
    options: [
        {
            id: "model",
            defaultValue: default模型,
            resettable: false,
            scope: "user",
            displayOn设置Screen: "chat",
            displayAsSeparateSection: true,
            displayInQuick设置: {
                name: "模型",
                displayByDefault: true,
                label: (value) => value,
            },
            renderProps: (value, options, context) => ({
                type: "select",
                label: "模型",
                description: value?.includes('32') && context.intl.formatMessage(
                    {
                        defaultMessage: "否te: This model will only work if your OpenAI account has been granted you have been given access to it. <a>Request access here.</a>",
                    },
                    { 
                        a: (text: string) => <a href="https://openai.com/waitlist/gpt-4-api" target="_blank" rel="noreferer">{text}</a> 
                    } as any,
                ),
                options: [
                    {
                        label: "GPT 3.5 Turbo (default)",
                        value: "gpt-3.5-turbo",
                    },
                    {
                        label: "GPT 3.5 Turbo 16k",
                        value: "gpt-3.5-turbo-16k",
                    },
                    {
                        label: "GPT 4",
                        value: "gpt-4",
                    },
                    {
                        label: "GPT 4 32k (requires invite)",
                        value: "gpt-4-32k",
                    },
                    {
                        label: "GPT 4 Snapshot (June 13, 2023)",
                        value: "gpt-4-0613",
                    },
          
                    {
                        label: "GPT 4 32k Snapshot (June 13, 2023)",
                        value: "gpt-4-32k-0613",
                    },
  
                    {
                        label: "GPT 3.5 Turbo Snapshot (June 13, 2023)",
                        value: "gpt-3.5-turbo-0613",
                    },
                    {
                        label: "GPT 3.5 Turbo 16k Snapshot (June 13, 2023)",
                        value: "gpt-3.5-turbo-16k-0613",
                    },
                ],
            }),
        },
        {
            id: "temperature",
            defaultValue: 0.5,
            resettable: true,
            scope: "chat",
            displayOn设置Screen: "chat",
            displayAsSeparateSection: true,
            displayInQuick设置: {
                name: "Temperature",
                displayByDefault: false,
                label: (value) => "Temperature: " + value.toFixed(1),
            },
            renderProps: (value, options, context) => ({
                type: "slider",
                label: "Temperature: " + value.toFixed(1),
                min: 0,
                max: 1,
                step: 0.1,
                description: context.intl.formatMessage({ defaultMessage: "The temperature parameter controls the randomness of the AI's responses. Lower values will make the AI more predictable, while higher values will make it more creative." }),
            })
        }
    ]
};