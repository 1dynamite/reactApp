import React, {useState, useRef, useEffect} from 'react';
import TemplateItem from './TemplateItem'
import AddIcon from '@material-ui/icons/Add'
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


export default function TemplateContainer({inputs, breakpoints = {sm: 12, md: 6}}) {
  const carouselRef = useRef({});
  const [templateHeight, setHeight] = useState('auto');

  useEffect(() => {
    setHeight(carouselRef.current.clientHeight);
  }, [carouselRef.current.clientHeight])

  return (
    <Grid
        spacing={1}
        container
        direction="row"
    >
        <Grid item xs={12} sm={breakpoints.sm} md={breakpoints.md}>
            <div ref={carouselRef}>
                <TemplateItem
                    textFields={inputs}
                    style={{height: templateHeight}}
                />
            </div>
        </Grid>
        <Grid item xs={12} sm={breakpoints.sm} md={breakpoints.md}>
            <Button 
                fullWidth
                variant="outlined"
                startIcon={<AddIcon />}
                style={{height: templateHeight}}
                >
                ADD ANOTHER ITEM
            </Button>
        </Grid>
    </Grid>
  )
}