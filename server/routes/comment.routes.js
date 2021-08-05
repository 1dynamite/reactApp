import express from 'express'
import commentCtrl from '../controllers/comment.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router();

router.route('/api/comments')
  .get(commentCtrl.fetch)
  .post(authCtrl.requireSignin, commentCtrl.create);

export default router