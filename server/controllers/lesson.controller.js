import Lesson from '../models/lesson.model'
import extend from 'lodash/extend'
import errorHandler from '../helpers/dbErrorHandler'

const lessonById = async (req, res, next, id) => {
    try {
        let lesson = await Lesson.findById(id);
        if (!lesson)
          return res.status('400').json({
            error: "Lesson not found"
          });
        req.lesson = lesson;
        next();
      } catch (err) {
        return res.status('400').json({
          error: "Could not retrieve lesson"
        });
      }
};

const read = (req, res) => {
    return res.json(req.lesson);
};

const create = async (req, res) => {
    const lesson = new Lesson(req.body)
    try {
      await lesson.save()
      return res.status(200).json({
        message: "Successfully created!"
      })
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
};

const list = async (req, res) => {
    try {
      let lessons = await Lesson.find().select('updated created _id')
      res.json(lessons)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
};
  
  const update = async (req, res) => {
    try {
      let lesson = req.lesson
      lesson = extend(lesson, req.body)
      lesson.updated = Date.now()
      await lesson.save()
      res.json(lesson)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  };
  
  const remove = async (req, res) => {
    try {
      let lesson = req.lesson
      let deletedLesson = await lesson.remove()
      res.json(deletedLesson)
    } catch (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      })
    }
  };
  
  export default {
    create,
    lessonById,
    read,
    list,
    remove,
    update
  }

