let cache = {};

export default {
  has(id) {
    return !!(id && this.get(id));
  },

  set(id, data) {
    cache[id] = JSON.stringify(data);
  },

  get(id) {
    if (!(id in cache)) {
      return false;
    }

    return JSON.parse(cache[id]);
  }
};
