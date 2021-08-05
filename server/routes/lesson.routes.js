import express from 'express'
import lessonCtrl from '../controllers/lesson.controller'
import authCtrl from '../controllers/auth.controller'

const router = express.Router();

router.route('/api/topics')
  .get(lessonCtrl.list)
  .post(authCtrl.requireSignin, authCtrl.isAdmin, lessonCtrl.create);

router.route('/api/topics/:lessonId')
  .get(lessonCtrl.read)
  .put(authCtrl.requireSignin, authCtrl.isAdmin, lessonCtrl.update)
  .delete(authCtrl.requireSignin, authCtrl.isAdmin, lessonCtrl.remove);



router.param('lessonId', lessonCtrl.lessonById);

export default router