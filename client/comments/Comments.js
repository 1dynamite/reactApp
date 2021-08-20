import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles'
import CommentOne from './CommentOne'
import Post from './Post'
import CommentIcon from '@material-ui/icons/Comment';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    div: {
        display: 'flex',
        marginBottom: theme.spacing(4),
        marginTop: theme.spacing(10)
    },
    icon: {
        marginRight: theme.spacing(1),
        alignSelf: 'center'
    }
    
}))

function fetchComments(lessonId, skipValue) {
    let data = fetch(`/api/comments/?lessonId=${lessonId}&limitValue=12&skipValue=${skipValue}`, {
        method: 'GET',
    })
    .then((data) => data.json());
    return data;
}

export default ({lessonId}) => {
    const classes = useStyles();
    const [comments, setComments] = useState([]);
    const [posted, setPosted] = useState([]);
    const [skipValue, setSkipValue] = useState(0);
    const controller = new AbortController();

    useEffect(() => {
        let x = document.documentElement.scrollHeight - window.scrollY;
        if (x === document.documentElement.clientHeight) {
            fetchComments(lessonId, skipValue).then((data) => {
                if(data && !data.error)
                {
                    setComments([...comments, ...data])
                    setSkipValue(12)
                    controller.abort()
                }
            });
        }
    }, [])
    useEffect(() => {
        window.addEventListener('scroll', () => {
           
            let x = document.documentElement.scrollHeight - window.scrollY;
            if (x === document.documentElement.clientHeight) {
                controller.abort();
                fetchComments(lessonId, skipValue).then((data) => {
                    if(data && !data.error && data.length !== 0)
                    {
                        setComments([...comments, ...data])
                        setSkipValue((prev) => prev + 12)
                    }
                });
            }
        }, {signal: controller.signal});
    }, [skipValue])

    const handlePost = (newComment) => {
        setPosted([newComment, ...posted])
    }

    return (
        <>
        <div className={classes.div}>
            <CommentIcon color='primary' className={classes.icon}/>
            <Typography variant='h6'>Comments</Typography>
        </div>

        <Post handleP={handlePost}/>
        {
            posted.map((obj, index) => {
                return(
                    <CommentOne 
                        key={index}
                        name={obj.username}
                        date={obj.created}
                        body={obj.body}
                    />
                )
            })
        }
        {
        comments.map((obj, index) => {
            return (
                <CommentOne 
                    key={index}
                    name={obj.username}
                    date={obj.created}
                    body={obj.body}
                />
            )
        })}
        </>
    )
}