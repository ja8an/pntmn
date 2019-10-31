import { firebaseRef } from "../services/firebase";
import Entity from "../entities/entity";

export default class Repository<T extends Entity> {

    private _path: string;
    private _ref: firebase.database.Reference;

    constructor(path: string) {
        this._path = path;
        this._ref = firebaseRef.child(path);
    }

    async create(entity: T): Promise<T> {
        const ref = await this._ref.push(entity);
        entity._key = ref.key;
        return await Promise.resolve(entity);
    }

    save(entity: T): T {
        delete entity._key;
        // Save
        return entity;
    }

    delete(entity: T): boolean {
        // Delete
        return false;
    }

    async findByKey(key: string): Promise<T> {
        const ref = await this._ref.orderByKey().equalTo(key).once('value');
        return await Promise.resolve(this._convert(ref));
    }

    async findBy(key: string, value: any): Promise<Array<T>> {
        const ref = await this._ref.orderByChild(key).equalTo(value).once('value');
        return await Promise.resolve(this._convert<Array<T>>(ref));
    }

    async findOneBy(key: string, value: any): Promise<T> {
        return await this.findBy(key, value)[0];
    }

    _convert<E>(source: any): E {
        return <E>source;
    }

}