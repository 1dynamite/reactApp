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

const IdStep = ({id}) => {
    return (
        <TextField 
            value={id} 
            label="Lesson ID"
            variant="filled" 
            size="small"
            fullWidth
        />
    );
}
const IntroStep = ({classes, inputsExs, introduction}) => {
    return (
        <div className={classes.step}>
            <MyAccordion heading='Carousel'>
                <TemplateContainer inputs={["Image path", "Title", "Description"]}/>
            </MyAccordion>
            <MyAccordion heading='Exercises'>
                <TemplateContainer inputs={inputsExs}/>
            </MyAccordion>
        </div>
    );
}
const ListeningStep = ({classes, inputsExs}) => {
    return (
        <div className={classes.step}>
            <MyAccordion heading='Media'>
                <TemplateItem textFields={["Media path"]}/>
            </MyAccordion>
            <MyAccordion heading='Exercises'>
                <TemplateContainer inputs={inputsExs}/>
            </MyAccordion>
        </div>
    );
}
const VocabStep = ({classes, inputsExs}) => {
    return (
        <div className={classes.step}>
            <MyAccordion heading='Words & Defintions'>
                <MyAccordion heading='Words'>
                    <TemplateContainer inputs={["A word"]} breakpoints={{sm: 6, md: 3}}/>
                </MyAccordion>
                <MyAccordion heading='Definitions'>
                    <TemplateContainer inputs={["A word", "Definition"]}/>
                </MyAccordion>
            </MyAccordion>
            <MyAccordion heading='Exercises'>
                <TemplateContainer inputs={inputsExs}/>
            </MyAccordion>
        </div>
    );
}
const ReadingStep = ({classes, inputsExs}) => {
    return (
        <div className={classes.step}>
            <MyAccordion heading='Passage'>
                <TemplateItem textFields={["Title", "Subtitle", "Body"]}/>
            </MyAccordion>
            <MyAccordion heading='Exercises'>
                <TemplateContainer inputs={inputsExs}/>
            </MyAccordion>
        </div>
    );
}

function getStepContent(step, lesson) {
    const inputsExs = ["Header", "Body"]
    const classes = useStyles();
  switch (step) {
    case 0:
        return lesson.hasOwnProperty('_id') ? <IdStep id={lesson._id}/> : '';
    case 1:
        return <IntroStep classes={classes} inputsExs={inputsExs}/>;
    case 2:
        return <ListeningStep classes={classes} inputsExs={inputsExs}/>;
    case 3:
        return <VocabStep classes={classes} inputsExs={inputsExs}/>;
    case 4:
        return <ReadingStep classes={classes} inputsExs={inputsExs}/>;
    default:
      return 'Unknown step';
  }
}

export default function AddPresentation({lesson}) {
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
              {getStepContent(index, lesson)}
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
