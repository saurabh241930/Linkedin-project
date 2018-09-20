var User = require('./models/user');
var cors = require('cors')

module.exports = function (app, passport) {
	app.get('/', function (req, res) {
		res.render('index.ejs');
	});

	

	app.get('/profile', isLoggedIn, function (req, res) {
		res.render('profile.ejs', { user: req.user });
	});

	




	app.get('/auth/linkedin',
		passport.authenticate('linkedin', {
			scope: ['r_basicprofile', 'r_emailaddress']
		}), function (req, res) {
			console.log(req.user)
			res.send(req.user)
		}
	);




	app.get('/auth/linkedin/callback',
		passport.authenticate('linkedin', {
			successRedirect: '/profile',
			failureRedirect: '/'
		})
	);









	app.get('/logout', function (req, res) {
		req.logout();
		res.redirect('/');
	})
};

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}

	res.redirect('/');
}