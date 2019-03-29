'use strict';

import DbProvider from './IndexedDBProvider';

export default class TODOList {
    constructor() {
        this.provider = new DbProvider("todo-list");
    }

    async add(title, date) {
        let createAt = new Date().getTime().toString();
        let dateAt = Date.parse(date);
        let item = { title: title, date: dateAt, id: createAt, isChecked: false };
        await this.provider.set(item);
        return item;
    }

    async changeChecked(id) {
        const item = await this.provider.get(id);
        item.isChecked = !item.isChecked;
        await this.provider.set(item);
    }

    async delete(id) {
        await this.provider.delete(id);
    }

    async get() {
        return (await this.provider.getAll()).sort((a, b) => {
            return b.id - a.id;
        });
    }
}
