import { Chat, OpenAIMessage, Parameters } from "../chat/types";
import { OptionsManager } from "../options";

export interface PluginContext {
    getOptions(): any;
    getCurrentChat(): Chat;
    createChatCompletion(messages: OpenAIMessage[], parameters: Parameters): Promise<string>;
    setChat标题(title: string): Promise<void>;
}

export function createBasicPluginContext(pluginID: string, pluginOptions: OptionsManager, chatID?: string | null, chat?: Chat | null) {
    return {
        getOptions: (_pluginID = pluginID) => pluginOptions.getAllOptions(_pluginID, chatID),
        getCurrentChat: () => chat,
        createChatCompletion: async () => '',
        setChat标题: async (title: string) => { },
    } as PluginContext;
}
