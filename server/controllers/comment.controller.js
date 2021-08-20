import Comment from '../models/comment.model'
import errorHandler from '../helpers/dbErrorHandler'
import User from '../models/user.model'

const fetch = async (req, res) => {
    try {
        const { limitValue, skipValue, lessonId } = req.query;
        const comments = await Comment.find({lessonId: lessonId}).sort({created: -1}).skip(+skipValue).limit(+limitValue);
        if (!comments)
          return res.status('400').json({
            error: "Comments not found"
          });
        return res.json(comments);

      } catch (err) {
        return res.status('400').json({
          error: "Could not retrieve comments"
        });
      }
};

const create = async (req, res) => {
    let comment = new Comment(req.body)
    comment.userId = req.auth._id;
    let user = await User.findById(req.auth._id)
    comment.username = user.name;
    try {
      await comment.save()
      return res.json(comment)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
};



export default {
    fetch,
    create
}