export default {
  getInitialState: function () {
    return {
      visible: false
    };
  },

  show() {
    this.setState({
      visible: true
    });
  },

  hide() {
    this.setState({
      visible: false
    });
  },

  handleCancel() {
    this.hide();
  }
};
