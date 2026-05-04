import { pluginMetadata } from "../core/plugins/metadata";
import { Option } from "../core/options/option";
import { OptionGroup } from "../core/options/option-group";
import { openAIOptions } from "./openai";
import { parameterOptions } from "./parameters";
import { ttsServiceOptions } from "./tts-service";
import { autoScrollOptions, inputOptions, markdownOptions } from "./ui";
import { whisperOptions } from "./whisper";

export const globalOptions: OptionGroup[] = [
    openAIOptions,
    autoScrollOptions,
    parameterOptions,
    inputOptions,
    markdownOptions,
    whisperOptions,
    ttsServiceOptions,
];

const optionsForQuick设置: Option[] = [];
[...globalOptions, ...pluginMetadata].forEach(plugin => {
    plugin.options.forEach(option => {
        if (option.displayInQuick设置) {
            optionsForQuick设置.push({
                id: plugin.id + "--" + option.id,
                defaultValue: !!option.displayInQuick设置?.displayByDefault,
                displayOn设置Screen: "ui",
                displayAsSeparateSection: false,
                renderProps: {
                    type: 'checkbox',
                    label: option.displayInQuick设置?.name || option.id,
                },
            });
        }
    });
})

export const quick设置: OptionGroup = {
    id: 'quick-settings',
    name: "Quick 设置",
    options: optionsForQuick设置,
}

globalOptions.push(quick设置);