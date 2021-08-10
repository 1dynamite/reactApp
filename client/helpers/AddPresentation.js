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

const IdStep = ({id = undefined, label = undefined}) => {
    const label_ = label !== undefined ? label : 'Type here...'
    const returnObj = id !== undefined ? (
        <TextField
            value={id} 
            label={label_}
            variant="filled" 
            size="small"
            fullWidth
        />
    ) : ''

    return returnObj;
}
const IntroStep = ({introduction, carousel, exercises}) => {
    const classes = useStyles();
    return (
        <div className={classes.step}>
            <MyAccordion heading='Carousel'>
                <TemplateContainer templates={introduction.carousel} labels={carousel}/>
            </MyAccordion>
            <MyAccordion heading='Exercises'>
                <TemplateContainer templates={introduction.exercises} labels={exercises}/>
            </MyAccordion>
        </div>
    );
}
const ListeningStep = ({listening, media, exercises}) => {
    const classes = useStyles();
    return (
        <div className={classes.step}>
            <MyAccordion heading='Media'>
                <TemplateItem template={listening.video} labels={media} delIcon={false}/>
            </MyAccordion>
            <MyAccordion heading='Exercises'>
                <TemplateContainer templates={listening.exercises} labels={exercises}/>
            </MyAccordion>
        </div>
    );
}
const VocabStep = ({vocabulary, vocabPanel, exercises}) => {
    const classes = useStyles();
    return (
        <div className={classes.step}>
            <MyAccordion heading='Words & Defintions'>
                <MyAccordion heading='Words'>
                    <TemplateContainer 
                        templates={vocabulary.vocabPanel.words} 
                        labels={vocabPanel.words} 
                        breakpoints={{sm: 6, md: 3}}
                    />
                </MyAccordion>
                <MyAccordion heading='Definitions'>
                    <TemplateContainer 
                        templates={vocabulary.vocabPanel.definitions} 
                        labels={vocabPanel.definitions}
                    />
                </MyAccordion>
            </MyAccordion>
            <MyAccordion heading='Exercises'>
                <TemplateContainer templates={vocabulary.exercises} labels={exercises}/>
            </MyAccordion>
        </div>
    );
}
const ReadingStep = ({reading, passage, exercises}) => {
    const classes = useStyles();
    return (
        <div className={classes.step}>
            <MyAccordion heading='Passage'>
                <TemplateItem template={reading.passage} labels={passage} delIcon={false}/>
            </MyAccordion>
            <MyAccordion heading='Exercises'>
                <TemplateContainer templates={reading.exercises} labels={exercises}/>
            </MyAccordion>
        </div>
    );
}

function getStepContent(step, lesson, labels) {
  switch (step) {
    case 0:
        return <IdStep id={lesson._id} label={labels._id}/>;
    case 1:
        return (
            <IntroStep 
                introduction={lesson.sections.introduction} 
                carousel={labels.sections.introduction.carousel}
                exercises={labels.sections.exercises}
            />
        );
    case 2:
        return (
            <ListeningStep 
                listening={lesson.sections.listening}
                media={labels.sections.listening.video}
                exercises={labels.sections.exercises}
            />
        );
    case 3:
        return (
            <VocabStep 
                vocabulary={lesson.sections.vocabulary} 
                vocabPanel={labels.sections.vocabulary.vocabPanel}
                exercises={labels.sections.exercises}
            />
        );
    case 4:
        return (
            <ReadingStep 
                reading={lesson.sections.reading}
                passage={labels.sections.reading.passage}
                exercises={labels.sections.exercises}
            />
        );
    default:
      return 'Unknown step';
  }
}

export default function AddPresentation({lesson, labels}) {
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

  const handleSubmit = () => {
      
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              {getStepContent(index, lesson, labels)}
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
          <Typography>You&apos;ve reached the end - you can now submit!</Typography>
          <Button onClick={handleReset} className={classes.button}>
            Reset
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
