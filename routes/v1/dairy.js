const express = require('express');
const router = express.Router();

const {check } = require('express-validator')

const {
    save_dairy,
    delete_dairy
} = require('../../controllers/dairy');

const {
    publish_dairy,
    show_published_dairy
} = require('../../controllers/publish')
const auth = require('../../middleware/auth');

const {
    show_draft_dairy
} = require('../../controllers/draft')
const {
    bookmark_dairy,
    show_bookmark_dairy
} = require('../../controllers/bookmark')

router.post("/save_dairy", auth,
[check('content', 'Your dairy cant be this short')
.isLength({ min: 20 })
],save_dairy);

router.delete('/delete_dairy/:dairyId',auth,delete_dairy)

router.get('/publish_dairy/:dairyId',auth,publish_dairy)

router.get('/bookmark_dairy/:dairyId',auth,bookmark_dairy)

router.get('/show_bookmark_dairy',auth,show_bookmark_dairy)

router.get('/show_draft_dairy',auth,show_draft_dairy)

router.get('/show_published_dairy',auth,show_published_dairy)

module.exports = router;