import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Introduction from '../Introduction'
import Listening from '../Listening'
import Vocabulary from '../Vocabulary'
import Reading from '../Reading'
import { Grid, Typography } from '@material-ui/core';
import MyMenu from './MyMenu'
import Comments from '../../../comments/Comments'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  title: {
    padding: '0.5rem 1rem',
    backgroundColor: theme.palette.primary.dark,
    color: 'white',
    margin: `2rem -1rem 2rem 0`
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  nav: {
    position: 'sticky', 
    top: '1rem', 
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
    [theme.breakpoints.up('md')]: {
      display: 'block',
    }
  }
}));

export default function LessonLayout({lesson}) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Typography variant='h4' className={classes.title}>
            {lesson._id.charAt(0).toUpperCase() + lesson._id.slice(1)}
        </Typography>
      </div>
      <MyMenu>
        <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
        >
            <Tab label="Introduction" {...a11yProps(0)} />
            <Tab label="Listening" {...a11yProps(1)} />
            <Tab label="Vocabulary" {...a11yProps(2)} />
            <Tab label="Reading" {...a11yProps(3)} />
        </Tabs>
      </MyMenu>
    <Grid
        container
        direction="row"
      >
          <Grid item xs='auto' md={2}>
              <div className={classes.nav}>
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    className={classes.tabs}
                >
                    <Tab label="Introduction" {...a11yProps(0)} />
                    <Tab label="Listening" {...a11yProps(1)} />
                    <Tab label="Vocabulary" {...a11yProps(2)} />
                    <Tab label="Reading" {...a11yProps(3)} />
                </Tabs>
              </div>
          </Grid>
          <Grid item xs={12} md={10} style={{padding: '2rem 4rem'}}>
            <TabPanel value={value} index={0}>
                <Introduction intro={lesson.sections.introduction}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Listening listening={lesson.sections.listening}/>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <Vocabulary vocabulary={lesson.sections.vocabulary}/>
            </TabPanel>
            <TabPanel value={value} index={3}>
                <Reading reading={lesson.sections.reading}/>
            </TabPanel>
            <Comments lessonId={lesson._id}/>
          </Grid>
      </Grid>
      </>
  );
}