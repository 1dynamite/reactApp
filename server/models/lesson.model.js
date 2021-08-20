import mongoose from 'mongoose';
import { SectionSchema } from '../schemas/lesson.schemas';

const validator = function(val){
  try{
    const hasVideo = val.listening.video.length !== 0;
    let hasVocab = false;
    for(const i of val.vocabulary.vocabPanel.words)
    {
      hasVocab = hasVocab || i.length !== 0;
      if(hasVocab)
        return true;
    }
    
    const hasPassage = val.reading.passage.body.length !== 0;
    return (hasVideo || hasVocab || hasPassage);
  } catch(err){
    return false;
  }
  
  
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
