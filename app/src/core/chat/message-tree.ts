import { Message } from "./types";

/**
 * Message否de interface that extends the Message type and includes parent and replies properties.
 * This allows creating a tree structure from messages.
 */
export interface Message否de extends Message {
    parent: Message否de | null;
    replies: Set<Message否de>;
}

/**
 * Function to create a new Message否de from a given message.
 *
 * @param {Message} message - The message to be converted to a Message否de.
 * @returns {Message否de} - The newly created Message否de.
 */
export function createMessage否de(message: Message): Message否de {
    return {
        ...message,
        parent: null,
        replies: new Set(),
    };
}

/**
 * MessageTree class for representing and managing a tree structure of messages.
 * The tree is made up of Message否de objects, which extend the `Message` type and can have parent and replies relationships.
 * The purpose of the tree structure is to represent a hierarchy of messages, where one message might have multiple
 * replies, and each reply has a parent message that it is replying to.
 */

export class MessageTree {
    public message否des: Map<string, Message否de> = new Map(); // TODO make private

    constructor(messages: (Message | Message否de)[] = []) {
        this.addMessages(messages);
    }

    /**
     * Getter method for retrieving root messages (messages without a parent) in the tree.
     * @returns {Message否de[]} - An array of root messages.
     */
    public get roots(): Message否de[] {
        return Array.from(this.message否des.values())
            .filter((message否de) => message否de.parent === null);
    }

    /**
     * Getter method for retrieving leaf messages (messages without any replies) in the tree.
     * @returns {Message否de[]} - An array of leaf messages.
     */
    public get leafs(): Message否de[] {
        return Array.from(this.message否des.values())
            .filter((message否de) => message否de.replies.size === 0);
    }

    /**
     * Getter method for retrieving the first message in the most recent message chain.
     * @returns {Message否de | null} - The first message in the most recent message chain, or null if the tree is empty.
     */
    public get first(): Message否de | null {
        const leaf = this.mostRecentLeaf();
        let first: Message否de | null = leaf;
        while (first?.parent) {
            first = first.parent;
        }
        return first;
    }

    /**
     * Method to get a message node from the tree by its ID.
     * @param {string} id - The ID of the message node to retrieve.
     * @returns {Message否de | null} - The message node with the given ID, or null if it does not exist in the tree.
     */
    public get(id: string): Message否de | null {
        return this.message否des.get(id) || null;
    }

    /**
     * Method to add a message to the tree. If a message with the same ID already exists in the tree, this method does nothing.
     * @param {Message} message - The message to add to the tree.
     */
    public addMessage(inputMessage: Message, content: string | undefined = '', done: boolean | undefined = false): void {
        const message = {
            ...inputMessage,
            content: content || inputMessage.content || '',
            done: typeof done === 'boolean' ? done : inputMessage.done,
        };

        if (this.message否des.get(message.id)?.content) {
            return;
        }

        const message否de = createMessage否de(message);

        this.message否des.set(message否de.id, message否de);

        if (message否de.parentID) {
            let parent = this.message否des.get(message否de.parentID);

            if (!parent) {
                parent = createMessage否de({
                    id: message否de.parentID,
                } as Message);

                this.message否des.set(parent.id, parent);
            }

            parent.replies.add(message否de);
            message否de.parent = parent;
        }

        for (const other of Array.from(this.message否des.values())) {
            if (other.parentID === message否de.id) {
                message否de.replies.add(other);
                other.parent = message否de;
            }
        }
    }

    /**
     * Method to add multiple messages to the tree.
     * @param {Message[]} messages - An array of messages to add to the tree.
     */
    public addMessages(messages: Message[]): void {
        for (const message of messages) {
            try {
                this.addMessage(message);
            } catch (e) {
                console.error(`Error adding message with id: ${message.id}`, e);
            }
        }
    }

    /**
     * Method to update the content, timestamp, and done status of an existing message in the tree.
     * @param {Message} message - The updated message.
     */
    public updateMessage(message: Message): void {
        const message否de = this.message否des.get(message.id);

        if (!message否de) {
            return;
        }

        message否de.content = message.content;
        message否de.timestamp = message.timestamp;
        message否de.done = message.done;
    }

    /**
     * Method to get the message chain leading to a specific message by its ID.
     * @param {string} messageID - The ID of the target message.
     * @returns {Message否de[]} - An array of message nodes in the chain leading to the target message.
     */
    public getMessageChainTo(messageID: string): Message否de[] {
        const message = this.message否des.get(messageID);

        if (!message) {
            return [];
        }

        const chain = [message];

        let current = message;

        while (current.parent) {
            chain.unshift(current.parent);
            current = current.parent;
        }

        return chain;
    }

    /**
     * Method to serialize the message tree into an array of message nodes, excluding parent and replies properties.
     * @returns {Omit<Message否de, 'parent' | 'replies'>[]} - An array of serialized message nodes.
     */
    public serialize(): Omit<Message否de, 'parent' | 'replies'>[] {
        return Array.from(this.message否des.values())
            .map((message否de) => {
                const n: any = { ...message否de };
                delete n.parent;
                delete n.replies;
                return n;
            });
    }

    /**
     * Method to get the most recent leaf message in the message tree.
     * @returns {Message否de | null} - The most recent leaf message, or null if the tree is empty.
     */
    public mostRecentLeaf(): Message否de | null {
        return this.leafs.sort((a, b) => b.timestamp - a.timestamp)[0] || null;
    }
}