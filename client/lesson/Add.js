import React, {useState} from 'react';
import AddPresentation from '../helpers/AddPresentation'

export default function() {
    const obj = {
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
    const [lesson, setLesson] = useState(obj);

    return <AddPresentation lesson={lesson}/>
}