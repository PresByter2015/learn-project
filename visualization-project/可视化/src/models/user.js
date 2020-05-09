import Model from 'modules/model';
import urls from 'config/urls';
import { prefix as urlPrefix } from 'config/urls';

class User extends Model {
  constructor() {
    super(urls.get('user'));
  }

  fetchCookies() {
    let url = `${urlPrefix}/verify?time=` + new Date().getTime();

    return super.get(url);
  }
}

export default new User;
