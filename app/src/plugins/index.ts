import Plugin from "../core/plugins";

import { SystemPromptPlugin } from "./system-prompt";
import { 标题Plugin } from "./titles";
import { ContextTrimmerPlugin } from "./trimmer";

import ElevenLabsPlugin from "../tts-plugins/elevenlabs";
import WebSpeechPlugin from "../tts-plugins/web-speech";

export const registeredPlugins: Array<typeof Plugin<any>> = [
    SystemPromptPlugin,
    ContextTrimmerPlugin,
    标题Plugin,
    WebSpeechPlugin,
    ElevenLabsPlugin,
];