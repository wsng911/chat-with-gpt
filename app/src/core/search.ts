import Mini搜索, { 搜索Result } from 'minisearch'
import { ellipsize } from './utils';
import { ChatManager } from '.';
import { Chat, Message } from './chat/types';

export class 搜索 {
    private index = new Mini搜索({
        fields: ['value'],
        storeFields: ['id', 'value'],
    });

    constructor(private context: ChatManager) {
    }

    public update(id: string) {
        const chat = this.context.get(id);
        if (!chat) {
            return;
        }
        const messages = chat.messages.serialize();
        const contents = messages.map((m: Message) => m.content).join('\n\n');
        const doc = {
            id,
            value: chat.title ? (chat.title + '\n\n' + contents) : contents,
        };
        if (!this.index.has(id)) {
            this.index.add(doc);
        } else {
            this.index.replace(doc);
        }
    }

    public delete(id: string) {
        if (this.index.has(id)) {
            this.index.discard(id);
            this.index.vacuum();
        }
    }

    public query(query: string) {
        if (!query?.trim().length) {
            const searchResults = this.context.all()
                .sort((a, b) => b.updated - a.updated)
                .slice(0, 10);
            const results = this.process搜索Results(searchResults);
            return results;
        }

        let searchResults = this.index.search(query, { fuzzy: 0.2 });
        let output = this.process搜索Results(searchResults);

        if (!output.length) {
            searchResults = this.index.search(query, { prefix: true });
            output = this.process搜索Results(searchResults);
        }

        return output;
    }

    private process搜索Results(searchResults: 搜索Result[] | Chat[]) {
        const output: any[] = [];
        for (const item of searchResults) {
            const chatID = item.id;
            let chat = this.context.get(chatID);
            if (!chat) {
                continue;
            }

            chat = { ...chat };

            let description = chat.messages?.first?.content || '';
            description = ellipsize(description, 400);

            if (!chat.title) {
                chat.title = ellipsize(description, 100);
            }

            if (!chat.title || !description) {
                continue;
            }

            output.push({
                chatID,
                title: chat.title,
                description,
            });
        }
        return output;
    }
}
