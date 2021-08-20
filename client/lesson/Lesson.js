import React, {useState, useEffect} from 'react';
import LessonLayout from './sections/components/LessonLayout'
import {read} from './api-lesson'

export default ({match}) => {
    const [lesson, setLesson] = useState(null);

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

  return (
      <div style={{paddingRight: '1rem'}}>
          {lesson !== null ? <LessonLayout lesson={lesson}/> : ''}
      </div>
  );
}