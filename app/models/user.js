var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var userSchema = mongoose.Schema({
	linkedin: {
		id: String,
		emailAddress: String,
		firstName: String,
		headline: String,
		lastName: String,
		token: String,
		tokenSecret: String
	}
});

userSchema.methods.generateHash = function (password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function (password) {
	return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', userSchema);