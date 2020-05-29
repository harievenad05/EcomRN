const Helpers = {
  maxTextLength: function (str, maxLength) {
    let title;
    let newArr = str.split('');
    if (newArr.length > maxLength) {
      title = `${newArr.splice(0, maxLength).join('')}...`;
    } else {
      title = newArr.splice(0, maxLength).join('');
    }
    return title;
  },
};

export default Helpers;
