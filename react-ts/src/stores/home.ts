// home.ts
import { action, observable } from 'mobx';

export default class HomeStore {
    @observable name = 'Clint';

    @observable token = '';

    @observable id = '';

    @observable email = '';

    constructor(initialState: any = { name: 'store' }) {
        this.name = initialState.name;
    }

    @action
    public setName = (name: string) => {
        // console.log(name, this);
        this.name = name;
    };
    async signIn(data: any) {
        try {
            // const { data: res } = await api.signIn(data);
            // this.id = res.data.id;
            // this.token = res.data.token;
            // this.email = res.data.email;
            // this.setLocalStorage({
            //   id: this.id,
            //   token: this.token,
            //   email: this.email
            // });
            // return res;
        } catch (error) {
            return error;
        }
    }
}
