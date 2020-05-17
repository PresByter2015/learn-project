import { action, observable } from 'mobx';

interface IArray {
    [key: string]: any;
}
interface Cat {
    name: string;
    age?: number | string;
    color?: string;
}
export default class DetailStore {
    @observable name = 'Clint';
    @observable arr: Cat[] = [];

    constructor(
        initialState: any = {
            name: 'detail-store',
            arr: [
                { name: 'Tom', color: 'red' },
                { name: 'Jerry', age: '3', color: 'blue' },
            ],
        },
    ) {
        this.name = initialState.name;
        this.arr = initialState.arr;
    }

    @action
    public setName = (name: string) => {
        // console.log(name, this);
        this.name = name;
    };
    public changeArray = (item: Cat) => {
        // console.log(name, this);
        this.arr.push(item);
    };
}
