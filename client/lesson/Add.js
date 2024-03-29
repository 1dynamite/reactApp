import React, {useState} from 'react';
import AddPresentation from '../helpers/AddPresentation'
import merge from 'lodash/merge'
import {create} from './api-lesson'
import auth from './../auth/auth-helper'
import {Redirect} from 'react-router-dom'

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
    const [message, setMessage] = useState({
        body: "You've reached the end - you can now submit!", 
        color:'initial'
    })
    const [redirectTrue, setRedirect] = useState(false);

    const handleChange = (nextState) => {
        let old = {...lesson};
        setLesson(merge(old, nextState));
    }
    const handleSubmit = () => {
        setMessage({body: "Loading..."});
        create(lesson, auth.isAuthenticated().token).then((data) => {
            if(data && data.error)
                setMessage({body: data.error, color:'secondary'})
            else setRedirect(true);

        })
    }
    if (redirectTrue) {
        return (<Redirect to={'/topics/'}/>)
    }
    return (
        <AddPresentation 
            lesson={lesson} 
            labels={labels} 
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            message={message}
        />
    )
}