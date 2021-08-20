import React from 'react';
import Carousel from './components/Carousel'
import Exercise from './components/Exercise'

export default ({intro}) => {
    return (
        <>
        <Carousel items={intro.carousel}/>
        {
            intro.exercises.map((el, index) => {
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