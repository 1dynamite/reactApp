import React, {useState} from 'react';
import AddPresentation from '../helpers/AddPresentation'

export default function() {
    const values = {
        _id: '',
        sections: {
            introduction: {
                carousel: [{
                    imagePath: '',
                    title: '',
                    description: ''
                }],
                exercises: [{
                    header: '',
                    body: ''
                }]
            },
            listening: {
                video: '',
                exercises: [{
                    header: '',
                    body: ''
                }]
            },
            vocabulary: {
                vocabPanel: {
                    words: [''],
                    definitions: [{
                        word: '',
                        definition: ''
                    }]
                },
                exercises: [{
                    header: '',
                    body: ''
                }]
            },
            reading: {
                passage: {
                    title: '',
                    subtitle: '',
                    body: ''
                },
                exercises: [{
                    header: '',
                    body: ''
                }]
            }
        }
    };
    const labels = {
        _id: 'Lesson ID',
        sections: {
            introduction: {
                carousel: {
                    imagePath: 'Image path',
                    title: 'Title',
                    description: 'Description'
                }
            },
            listening: {
                video: 'Media path'
            },
            vocabulary: {
                vocabPanel: {
                    words: 'A word',
                    definitions: {
                        word: 'A word',
                        definition: 'Definition'
                    }
                }
            },
            reading: {
                passage: {
                    title: 'Title',
                    subtitle: 'Subtitle',
                    body: 'Body'
                }
            },
            exercises: {
                header: 'Header',
                body: 'Body'
            }
        }
    };
    const [lesson, setLesson] = useState(values);

    return <AddPresentation lesson={lesson} labels={labels}/>
}