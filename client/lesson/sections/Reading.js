import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Exercise from './components/Exercise'
import Passage from './components/Passage'

export default ({reading}) => {
    return (
        <>
        <Passage passage={reading.passage}/>
        {
            reading.exercises.map((el, index) => {
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