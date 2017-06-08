export const utils = {
  getParaFromUrl: (para) => {
    try {
      let reg = new RegExp("(^|&)" + para + "=([^&]*)(&|$)", "i");
      let r = window.location.search.substr(1).match(reg);
      if (r != null)
        return unescape(r[2]);
      return '';
    } catch (e) {
      return '';
    }
  }
}
