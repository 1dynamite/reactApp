import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MyAccordion from './MyAccordion'
import TemplateContainer from './TemplateContainer'
import TemplateItem from './TemplateItem'
import PublishIcon from '@material-ui/icons/Publish';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    margin: theme.spacing(5)
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
  step: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}));

function getSteps() {
  return ['Enter a unique lesson ID', 'Introduction', 'Listening', 'Vocabulary', 'Reading'];
}

const IdStep = ({id = undefined, label = undefined, ...props}) => {
    const label_ = label !== undefined ? label : 'Type here...'
    const handleChange = (e) => {
      props.handleChange({_id: e.target.value})
    }
    const returnObj = id !== undefined ? (
        <TextField
            value={id} 
            label={label_}
            variant="filled" 
            size="small"
            fullWidth
            onChange={handleChange}
        />
    ) : ''

    return returnObj;
}
const IntroStep = ({introduction, carousel, exercises, ...props}) => {
    const classes = useStyles();
    const handleChangeCarousel = (nextState) => {
      props.handleChange({carousel: nextState})
    }
    const handleChangeExercises = (nextState) => {
      props.handleChange({exercises: nextState})
    }
    return (
        <div className={classes.step}>
            <MyAccordion heading='Carousel'>
                <TemplateContainer 
                  templates={introduction.carousel} 
                  labels={carousel}
                  handleChange={handleChangeCarousel}
                />
            </MyAccordion>
            <MyAccordion heading='Exercises'>
                <TemplateContainer 
                  templates={introduction.exercises} 
                  labels={exercises}
                  handleChange={handleChangeExercises}
                />
            </MyAccordion>
        </div>
    );
}
const ListeningStep = ({listening, media, exercises, ...props}) => {
    const classes = useStyles();

    const handleChangeVideo = (nextState) => {
      props.handleChange({video: nextState.value})
    }
    const handleChangeExercises = (nextState) => {
      props.handleChange({exercises: nextState})
    }
    return (
        <div className={classes.step}>
            <MyAccordion heading='Media'>
                <TemplateItem 
                  template={listening.video} 
                  labels={media} 
                  delIcon={false}
                  handleChange={handleChangeVideo}
                />
            </MyAccordion>
            <MyAccordion heading='Exercises'>
                <TemplateContainer 
                  templates={listening.exercises} 
                  labels={exercises}
                  handleChange={handleChangeExercises}
                />
            </MyAccordion>
        </div>
    );
}
const VocabStep = ({vocabulary, vocabPanel, exercises, ...props}) => {
    const classes = useStyles();

    const handleChangeWords = (nextState) => {
      props.handleChange({vocabPanel: {words: nextState}})
    }
    const handleChangeDefinitions = (nextState) => {
      props.handleChange({vocabPanel: {definitions: nextState}})
    }
    const handleChangeExercises = (nextState) => {
      props.handleChange({exercises: nextState})
    }
    return (
        <div className={classes.step}>
            <MyAccordion heading='Words & Defintions'>
                <MyAccordion heading='Words'>
                    <TemplateContainer 
                        templates={vocabulary.vocabPanel.words} 
                        labels={vocabPanel.words} 
                        breakpoints={{sm: 6, md: 3}}
                        handleChange={handleChangeWords}
                    />
                </MyAccordion>
                <MyAccordion heading='Definitions'>
                    <TemplateContainer 
                        templates={vocabulary.vocabPanel.definitions} 
                        labels={vocabPanel.definitions}
                        handleChange={handleChangeDefinitions}
                    />
                </MyAccordion>
            </MyAccordion>
            <MyAccordion heading='Exercises'>
                <TemplateContainer 
                  templates={vocabulary.exercises} 
                  labels={exercises}
                  handleChange={handleChangeExercises}
                />
            </MyAccordion>
        </div>
    );
}
const ReadingStep = ({reading, passage, exercises, ...props}) => {
    const classes = useStyles();

    const handleChangePassage = (nextState) => {
      props.handleChange({passage: nextState.value})
    }
    const handleChangeExercises = (nextState) => {
      props.handleChange({exercises: nextState})
    }    
    return (
        <div className={classes.step}>
            <MyAccordion heading='Passage'>
                <TemplateItem 
                  template={reading.passage} 
                  labels={passage} 
                  delIcon={false}
                  handleChange={handleChangePassage}
                />
            </MyAccordion>
            <MyAccordion heading='Exercises'>
                <TemplateContainer 
                  templates={reading.exercises} 
                  labels={exercises}
                  handleChange={handleChangeExercises}
                />
            </MyAccordion>
        </div>
    );
}

function getStepContent(step, lesson, labels, handleChange, handleId) {
  const handleChangeIntro = (nextState) => {
    handleChange({introduction: nextState})
  }
  const handleChangeListening = (nextState) => {
    handleChange({listening: nextState})
  }
  const handleChangeVocabulary = (nextState) => {
    handleChange({vocabulary: nextState})
  }
  const handleChangeReading = (nextState) => {
    handleChange({reading: nextState})
  }
  switch (step) {
    case 0:
        return <IdStep id={lesson._id} label={labels._id} handleChange={handleId}/>;
    case 1:
        return (
            <IntroStep 
                introduction={lesson.sections.introduction} 
                carousel={labels.sections.introduction.carousel}
                exercises={labels.sections.exercises}
                handleChange={handleChangeIntro}
            />
        );
    case 2:
        return (
            <ListeningStep 
                listening={lesson.sections.listening}
                media={labels.sections.listening.video}
                exercises={labels.sections.exercises}
                handleChange={handleChangeListening}
            />
        );
    case 3:
        return (
            <VocabStep 
                vocabulary={lesson.sections.vocabulary} 
                vocabPanel={labels.sections.vocabulary.vocabPanel}
                exercises={labels.sections.exercises}
                handleChange={handleChangeVocabulary}
            />
        );
    case 4:
        return (
            <ReadingStep 
                reading={lesson.sections.reading}
                passage={labels.sections.reading.passage}
                exercises={labels.sections.exercises}
                handleChange={handleChangeReading}
            />
        );
    default:
      return 'Unknown step';
  }
}

export default function AddPresentation({lesson, labels, ...props}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleChange = (nextState) => {
    props.handleChange({sections: nextState})
  }
  const handleSubmit = () => {
      props.handleSubmit();
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index, lesson, labels, handleChange, props.handleChange)}
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography color={props.message.color}>{props.message.body}</Typography>
          <Button onClick={handleReset} className={classes.button}>
            BACK
          </Button>
          <Button
            variant="contained"
            startIcon={<PublishIcon/>}
            color="primary"
            onClick={handleSubmit}
            className={classes.button}
          >
            SUBMIT
          </Button>
        </Paper>
      )}
    </Paper>
  );
}
