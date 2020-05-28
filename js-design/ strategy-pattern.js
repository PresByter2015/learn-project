// 策略 模式
const jobList = ['FE', 'BE'];
const strategies = {
  checkRole: function (value) {
    if (value === 'registered') {
      return true;
    }
    return false;
  },
  checkGrade: function (value) {
    if (value >= 1) {
      return true;
    }
    return false;
  },
  checkJob: function (value) {
    if (jobList.indexOf (value) > 1) {
      return true;
    }
    return false;
  },
  checkType: function (value) {
    if (value === 'active user') {
      return true;
    }
    return false;
  },
};

const Validator = function () {
  // 缓存
  this.cache = [];
  // 添加缓存
  this.add = function (value, method) {
    this.cache.push (function () {
      return strategies[method] (value);
    });
  };
  // 检测是否存在缓存
  this.check = function () {
    for (let i = 0; i < this.cache.length; i++) {
      let valiFn = this.cache[i];
      var data = valiFn ();
      if (!data) {
        return false;
      }
    }
    return true;
  };
};

var compose1 = function () {
  var validator = new Validator ();
  const data1 = {
    role: 'register',
    grade: 3,
    job: 'FE',
    type: 'active user',
  };
  validator.add (data1.role, 'checkRole');
  validator.add (data1.grade, 'checkGrade');
  validator.add (data1.type, 'checkType');
  validator.add (data1.job, 'checkJob');
  const result = validator.check ();
  return result;
};
console.log(compose1())