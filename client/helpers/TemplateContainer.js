import React, {useState, useRef, useEffect} from 'react';
import TemplateItem from './TemplateItem'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import cloneDeep from 'lodash/cloneDeep'


export default function TemplateContainer({templates, labels, breakpoints = {sm: 12, md: 6}, ...props}) {
  const carouselRef = useRef({});
  const [templateHeight, setHeight] = useState('auto');

  useEffect(() => {
    setHeight(carouselRef.current.clientHeight);
  }, [])

  const handleChange = (nextState) => {
      let array = cloneDeep(templates);
      array[nextState.index] = nextState.value;
      props.handleChange(array);
  }
  const handleClick = () => {
      let array = [];
      array = cloneDeep(templates);
      if(typeof labels == 'object'){
        let newTemplate = {};
        for (const [key, value] of Object.entries(labels)) {
            newTemplate[key] = '';
        }
        array.push(newTemplate);
      }
      else array.push('');
      props.handleChange(array);
  }
  const handleDelete = (index) => {
    templates.splice(index, 1);
    props.handleChange([]);
  }

  return (
    <Grid
        spacing={1}
        container
        direction="row"
    >
        {templates.map((template, index) => {
            return (
                <Grid 
                    item xs={12} 
                    sm={breakpoints.sm} 
                    md={breakpoints.md}
                    key={index}
                >
                    {index == 0 ? (
                        <div ref={carouselRef}>
                            <TemplateItem
                                template={template}
                                labels={labels}
                                style={{height: templateHeight}}
                                handleChange={handleChange}
                                index={0}
                                delete={handleDelete}
                            />
                        </div>
                    ) : (
                        <TemplateItem
                            template={template}
                            labels={labels}
                            style={{height: templateHeight}}
                            handleChange={handleChange}
                            index={index}
                            delete={handleDelete}
                        />
                    )}
                </Grid>
            );
        })}
        <Grid item xs={12} sm={breakpoints.sm} md={breakpoints.md}>
            <Button 
                fullWidth
                variant="outlined"
                startIcon={<AddIcon />}
                style={{height: templateHeight}}
                onClick={handleClick}
                >
                ADD ANOTHER ITEM
            </Button>
        </Grid>
    </Grid>
  )
}