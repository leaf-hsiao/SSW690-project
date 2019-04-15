var express = require('express');
var router = express.Router();


router.get('/', (req, res) => res.render('settings', {
    welcome: "Paste your Canvas URL here:"
}));

router.post('/', (req, res) => {
    //console.log(req.body);
});

module.exports = router;