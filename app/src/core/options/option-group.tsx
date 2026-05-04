import { Option } from "./option";
import type { OptionsManager } from ".";
import { React否de } from "react";

/**
 * @interface OptionGroup
 * @description Represents a group of options within the OptionsManager. Each group is identified by a unique ID and can have a name, description, and a set of options. The group can be hidden based on a boolean value or a function that evaluates the visibility condition using the OptionsManager instance.
 * @property {string} id - The unique identifier for the option group.
 * @property {string} [name] - The display name for the option group.
 * @property {string | React否de} [description] - A description for the option group, which can be a string or a React否de.
 * @property {boolean | ((options: OptionsManager) => boolean)} [hidden] - Determines if the option group should be hidden. Can be a boolean value or a function that returns a boolean value based on the OptionsManager instance.
 * @property {Option[]} options - An array of options within the group.
 */
export interface OptionGroup {
    id: string;
    name?: string;
    description?: string | React否de;
    hidden?: boolean | ((options: OptionsManager) => boolean);
    options: Option[];
}
