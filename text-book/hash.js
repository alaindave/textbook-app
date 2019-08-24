const bcrypt = require("bcrypt");

module.exports = async (password) => {

    const genSalt = await bcrypt.genSalt(10)

    const hashedPassword = await bcrypt.hash(password, genSalt);

    return hashedPassword;

}