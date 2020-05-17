import { action, observable } from 'mobx';
import { setCookies } from '../utils/cookies';
export interface IArray {
    [key: string]: any;
}
export interface Cat {
    name: string;
    age?: number | string;
    color?: string;
}
export interface UserInfo {
    username: string;
    password?: string;
    employeeId?: string;
    webToken?: string;
    state?: number;
}
export interface resData {
    state: number;
    name_: string;
    employee_id_: string;
    web_token: string;
}
export default class UserStore {
    @observable name = 'Clint';
    @observable arr: Cat[] = [];
    @observable userInfo: UserInfo = {
        username: '',
        password: '',
    };

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
    public handleLogin = async (res: resData) => {
        console.log(res);

        // let res = await logIn(userInfo)
        if (res.state === 1) {
            const resReq: UserInfo = {
                ...this.userInfo,
                state: res.state,
                username: res.name_,
                employeeId: res.employee_id_,
                webToken: res.web_token,
            };
            this.userInfo = resReq;
            setCookies('jiuye', res.web_token);
            localStorage.setItem('jyuser', JSON.stringify(resReq));
        }
        // console.log(this.userInfo);
        // this.arr.push(userInfo)
    };
    // public changeLogin = (item: Cat) => {
    //     // console.log(name, this);
    //     this.arr.push(item)
    // }
}
export type userStoreType = typeof UserStore;
