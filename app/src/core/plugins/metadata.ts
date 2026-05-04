import type { Plugin描述 } from "./plugin-description";
import TTSPlugin from "../tts/tts-plugin";
import { registeredPlugins } from "../../plugins";

export const pluginMetadata: Array<Plugin描述> = registeredPlugins.map(p => new p().describe());
export const pluginIDs: string[] = pluginMetadata.map(d => d.id);

export const ttsPlugins = registeredPlugins.filter(p => {
    const instance = new p();
    return instance instanceof TTSPlugin;
});

export function getPluginBy名称(name: string) {
    return registeredPlugins.find(p => new p().describe().name === name);
}
