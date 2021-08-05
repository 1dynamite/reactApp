import mongoose from 'mongoose';

const DefPanelSchema = new mongoose.Schema({
    word: String,
    definition: String
}, {_id: false});

const CardSchema = new mongoose.Schema({
    imagePath: String,
    title: String,
    description: String
}, {_id: false});
const ExerciseSchema = new mongoose.Schema({
    header: String,
    body: String
}, {_id: false});

const VocabPanelSchema = new mongoose.Schema({
    words: [String],
    definitions: [DefPanelSchema]
}, {_id: false});

const ReadingPassageSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    body: String
}, {_id: false});

const IntroductionSchema = new mongoose.Schema({
    carousel: [CardSchema],
    exercises: [ExerciseSchema]
}, {_id: false});

const ListeningSchema = new mongoose.Schema({
    video: String,
    exercises: [ExerciseSchema]
}, {_id: false});

const VocabularySchema = new mongoose.Schema({
    vocabPanel: VocabPanelSchema,
    exercises: [ExerciseSchema]
}, {_id: false});

const ReadingSchema = new mongoose.Schema({
    passage: ReadingPassageSchema,
    exercises: [ExerciseSchema]
}, {_id: false});

const SectionSchema = new mongoose.Schema({
    introduction: IntroductionSchema,
    listening: ListeningSchema,
    vocabulary: VocabularySchema,
    reading: ReadingSchema
  }, {_id: false});

export {
    SectionSchema
}