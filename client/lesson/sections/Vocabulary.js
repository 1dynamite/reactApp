import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Exercise from './components/Exercise'
import VocabPanel from './components/VocabPanel'

export default ({vocabulary}) => {
    return (
        <>
        <VocabPanel vocabPanel={vocabulary.vocabPanel}/>
        {
            vocabulary.exercises.map((el, index) => {
                return (
                    <Exercise 
                        key={index}
                        heading={el.header}
                        body={el.body}
                    />
                )
            })
        }
        </>
    )
}