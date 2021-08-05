import Comment from '../models/comment.model'
import errorHandler from '../helpers/dbErrorHandler'

const fetch = async (req, res) => {
    try {
        const { limitValue, skipValue } = req.query;
        const comments = await Comment.find({}).sort({created: -1}).skip(+skipValue).limit(+limitValue);
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
    try {
      await comment.save()
      return res.status(200).json({
        message: "Successfully created!"
      })
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