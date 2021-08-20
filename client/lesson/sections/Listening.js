import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import Exercise from './components/Exercise'

const useStyles = makeStyles(theme => ({
    aspectRatio: {
        position: 'relative',
        width: '100%',
        height: '0',
        paddingBottom: '50%'
      },
      
      iframe: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: '0',
        top: '0',
      }
}))
let a = "<li>International trade routes, migration, <input data-correctvalue='media'>and IT communication expand across <input data-correctvalue='traditional'>borders.</li>"
a += "<li>Different cultures interact more, with a flow of goods, <input data-correctvalue='labour'>and ideas.</li>"
a += "<li>Globalization is common all over the world but there are certain cities where this is more<input data-correctvalue='obvious'>than others.</li>"
a += "<li>The best example of a city where different<input data-correctvalue='cultures'>have come together through globalization.</li>"
a += "<li>A center for<input data-correctvalue='migration'>for hundreds of years.</li>"
a += "<li>Home to many<input data-correctvalue='ethnic groups'>groups.</li>"
a += "<li>Huge<input data-correctvalue='variety'>of world food on sale.</li>"
a += "<li>Took immigrant food and changed it to create a new American<input data-correctvalue='identity'>.</li>"
let arr = [
    {
        heading: 'Complete the sentences below with words from the video',
        body: `<GapFill><Questions>${a}</Questions></GapFill>`
    }
]

export default ({listening}) => {
    const classes = useStyles();
    return (
        <>
        <div className={classes.aspectRatio}>
        <iframe className={classes.iframe}
            src={listening.video}>
        </iframe>
        </div>
        <div style={{marginTop: '3rem'}}>
        {
            listening.exercises.map((el, index) => {
                return (
                    <Exercise 
                        key={index}
                        heading={el.header}
                        body={el.body}
                    />
                )
            })
        }
        </div>
        </>
    )
}