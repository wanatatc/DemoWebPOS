export const validateThaiCitizenID = (id) => {
  //todo replace -
  if (id) {
    id = id.replaceAll("-", "").trim();
    if (id.length !== 13 || id.charAt(0).match(/[09]/)) return false;

    var sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(id.charAt(i)) * (13 - i);
    }

    if ((11 - (sum % 11)) % 10 !== parseInt(id.charAt(12))) {
      return false;
    }

    return true;
  } else {
    return false;
  }
};

export const validatePhoneNumber = (id) => {
  //replace -
  if (id) {
    id = id.replaceAll("-", "").trim();
    //เช็คหลักว่าครบ 10
    if (id.length !== 10) {
      return false;
    } else {
      //ขึ้นต้นด้วย 0 ไหม
      var pattern = new RegExp(/^0\d{9}$/);
      if (!pattern.test(id)) {
        //if found charactor will return false
        return false;
      }
      return true; //มี 10 หลักและขึ้นต้นด้วย 0
    }
  } else {
    return false;
  }
};
