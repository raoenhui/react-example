
//px转化为rem
export const toRem = (v) => {
    if (isNumber(v)) {
      return (v / 50)
    }
    return v;
  }
  //判断是否为数字
export const isNumber = (v) => {
    if (typeof v === 'number' && !isNaN(v)) {
      return true
    }
    return false;
  }