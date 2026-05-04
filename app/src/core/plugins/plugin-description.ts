import type { Command } from "./command";
import type { OptionGroup } from "../options/option-group";


export interface Plugin描述 extends OptionGroup {
    name: string;
    commands?: Command[];
    category?: "internal" | "knowledge-sources" | "tts";
}
