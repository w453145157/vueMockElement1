export function saveToLocal(id, key, value) {
  // 设置商家ID，字段， 值
  let seller = window.localStorage.__seller__;
  if (!seller) {
    seller = {};
    seller[id] = {};
    seller[id][key] = value;
  } else {
    seller = JSON.parse(seller);
    if (!seller.id) {
      seller[id] = {};
    }
    seller[id][key] = value;
  }
  window.localStorage.__seller__ = JSON.stringify(seller);
}

export function loadFromLocal(id, key, def) {
  //读取id，值，默认值
  let seller = window.localStorage.__seller__;
  if (!seller) {
    return def;
  }
  seller = JSON.parse(seller)[id];
  if (!seller) {
    return def;
  }
  let ret = seller[key];
  return ret || def;
}
