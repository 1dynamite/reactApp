import React, {useState, useEffect} from 'react';
import AddPresentation from '../helpers/AddPresentation'
import merge from 'lodash/merge'
import {update} from './api-lesson'
import auth from './../auth/auth-helper'
import {Redirect} from 'react-router-dom'
import {read} from './api-lesson'

export default function({match}) {
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
    
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
    
        read(signal, match.params.lessonId).then((data) => {
          if (data && !data.error) {
            setLesson(data)
          }
        })
    
        return function cleanup(){
          abortController.abort()
        }
    
    }, [match.params.lessonId])

    const handleChange = (nextState) => {
        let old = {...lesson};
        setLesson(merge(old, nextState));
    }
    const handleSubmit = () => {
        setMessage({body: "Loading..."});
        update(lesson, auth.isAuthenticated().token).then((data) => {
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