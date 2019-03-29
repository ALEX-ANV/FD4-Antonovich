'use strict';

export default class IndexedDbProvider {
    constructor(dbName, version = 3) {
        if (!window.indexedDB) {
            window.alert("IndexedDB doesn't work");
        }
        this.provider = window.indexedDB;
        this.dbName = dbName;
        this.version = version;
        this.key = "todo-items";
        this.indexName = "items-id";
        this.connect();
    }

    async connect() {
        this.db = await this.open();
    }

    open() {
        return new Promise((resolve, reject) => {
            let request = this.provider.open(this.dbName, this.version);
            request.onupgradeneeded = (e) => {
                const oStore = e.currentTarget.result.createObjectStore(this.key, { keyPath: 'id' });
                oStore.createIndex(this.indexName, "id", { unique: true });
            }
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
            request.onblocked = () => { console.log('blocked'); };

        });
    }

    set(value) {
        return this.action("readwrite", "put", value);
    }

    get(id) {
        return new Promise((resolve, reject) => {
            this.open().then(db => {
                const tx = db.transaction([this.key], "readonly");
                const store = tx.objectStore(this.key);
                const request = store.index(this.indexName);
                request.get(id).onsuccess = (e) => resolve(e.target.result);
                request.get(id).onerror = (e) => reject(e.target.error);
            });
        });
    }

    getAll() {
        return this.action("readwrite", "getAll");
    }

    delete(id) {
        return this.action("readwrite", "delete", id);
    }

    action(transactionType, storeMethod, arg) {
        return new Promise((resolve, reject) => {
            this.open().then(db => {
                const tx = db.transaction([this.key], transactionType);
                const store = tx.objectStore(this.key);
                const request = store[storeMethod](arg);
                request.onsuccess = (e) => resolve(e.target.result);
                request.onerror = (e) => reject(e.target.error);
            });
        });
    }
}
