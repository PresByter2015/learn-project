import HomeStore from './home';
import DetailStore from './detail';
import UserStore from './user';
export default {
    userStore: new UserStore(),
    homeStore: new HomeStore(),
    detailStore: new DetailStore(),
};
