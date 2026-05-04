import { OpenAIMessage, Parameters } from "../chat/types";
import { PluginContext } from "./plugin-context";
import { Plugin描述 } from "./plugin-description";

export default class Plugin<T=any> {
    constructor(public context?: PluginContext) {
    }

    async initialize() {
    }

    describe(): Plugin描述 {
        throw new Error('not implemented');
    }

    get options(): T | undefined {
        return this.context?.getOptions();
    }

    async preprocess模型Input(messages: OpenAIMessage[], parameters: Parameters): Promise<{
        messages: OpenAIMessage[],
        parameters: Parameters,
    }> {
        return { messages, parameters };
    }

    async postprocess模型Output(message: OpenAIMessage, context: OpenAIMessage[], parameters: Parameters, done: boolean): Promise<OpenAIMessage> {
        return message;
    }
}