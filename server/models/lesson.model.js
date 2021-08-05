import mongoose from 'mongoose';
import { SectionSchema } from '../schemas/lesson.schemas';

const validator = function(val){
  const hasVideo = val.listening && val.listening.video && (val.listening.video.length != 0 );
  const hasVocab = val.vocabulary && val.vocabulary.vocabPanel && val.vocabulary.vocabPanel.words && 
    (val.vocabulary.vocabPanel.words.length != 0 );
  const hasPassage = val.reading && val.reading.passage && val.reading.passage.body && 
    (val.reading.passage.body.length != 0 );

  return Boolean(hasVideo || hasVocab || hasPassage);
};

const LessonSchema = new mongoose.Schema({
  sections: {
    type: SectionSchema,
    required: '"sections" is a required field',
    validate: [
      validator, 
      "You must provide at least one of either a link to a video, words for a vocabulary box, or a reading passage"
    ]
  },
  _id: {
    type: String,
    required: '_id is required',
    lowercase: true,
    trim: true,
    unique: '_id must be unique'
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Lesson', LessonSchema)
