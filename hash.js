const bcrypt = require("bcrypt");

const getSalt = async () => {
    const salt = await bcrypt.genSalt(10) //random string before and after the pwd to throw off hackers
    const hash = await bcrypt.hash("1234", salt);
    console.log(salt);
    console.log(hash);
}
getSalt();