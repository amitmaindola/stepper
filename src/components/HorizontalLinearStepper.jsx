import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from '@mui/material';

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const [data, setData] = React.useState({
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    employerName: '',
    designation: '',
    totalExperience: '',
    city: ''
  })

  const updateData = (value, key) => {
    let temp = data;
    temp[key] = value;
    setData(temp);
    check();
  }

  const findDisplay = (step) => {
    if(step===activeStep) return 'block';
    else return 'none'
  }

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  React.useEffect(()=>{
    check()
  }, [activeStep])

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    check();
  };

  const handleReset = () => {
    setActiveStep(0);
    check()
  };
  const [allFilled, setAllFilled] = React.useState(false);

  const check = () => {
    if(activeStep===0){
      setAllFilled(((data.firstName!=='') && (data.lastName!=='') && (data.userName!=='') && (data.password!=='')))
    }
    if(activeStep===1){
      setAllFilled(((data.email!=='') && (data.phone!=='') && (data.addressLine1!=='') && (data.addressLine2!=='')))
    }
    if(activeStep===2){
      setAllFilled(((data.employerName!=='') && (data.designation!=='') && (data.totalExperience!=='') && (data.city!=='')))
    }
  }
  

  return (
    <Box sx={{ width: '80%', margin: '80px auto 40px'}}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 10, mb: 10 }}>
            {<pre>{JSON.stringify(data, null, 2)}</pre>}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <React.Fragment>
          
              <div style={{display: findDisplay(0)}}>
                <div  style={{display: 'flex', widows: '100%', justifyContent: 'space-between', marginTop: 20}}>
                  <TextField required onChange={(e)=>{updateData(e.target.value, 'firstName')}} style={{width: '50%', margin: 10}}  label="First Name" variant="outlined" name='firstName'/>
                  <TextField required onChange={(e)=>{updateData(e.target.value, 'lastName')}} style={{width: '50%', margin: 10}}  label="Last Name" variant="outlined" />
                </div>
                <div style={{display: 'flex', widows: '100%', justifyContent: 'space-between', marginTop: 10}}>
                  <TextField required onChange={(e)=>{updateData(e.target.value, 'userName')}} style={{width: '50%', margin: 10}}  label="User Name" variant="outlined" />
                  <TextField required onChange={(e)=>{updateData(e.target.value, 'password')}} style={{width: '50%', margin: 10}}  type='password' label="Password" variant="outlined" />
                </div>
              </div>
              <div style={{display: findDisplay(1)}}>
                <div style={{display: 'flex', widows: '100%', justifyContent: 'space-between', marginTop: 20}}>
                  <TextField required onChange={(e)=>{updateData(e.target.value, 'email')}} style={{width: '50%', margin: 10}}  label="Email" variant="outlined" name='email' />
                  <TextField required onChange={(e)=>{updateData(e.target.value, 'phone')}} style={{width: '50%', margin: 10}}  label="Phone" variant="outlined" />
                </div>
                <div style={{display: 'flex', widows: '100%', justifyContent: 'space-between', marginTop: 10}}>
                  <TextField required onChange={(e)=>{updateData(e.target.value, 'addressLine1')}} style={{width: '50%', margin: 10}}  label="Address Line1" variant="outlined" />
                  <TextField required onChange={(e)=>{updateData(e.target.value, 'addressLine2')}} style={{width: '50%', margin: 10}}  label="Address Line2" variant="outlined" />
                </div>
              </div>
              <div style={{display: findDisplay(2)}}>
                <div style={{display: 'flex', widows: '100%', justifyContent: 'space-between', marginTop: 20}}>
                  <TextField required onChange={(e)=>{updateData(e.target.value, 'employerName')}} style={{width: '50%', margin: 10}}  label="Employer Name" variant="outlined" />
                  <TextField required onChange={(e)=>{updateData(e.target.value, 'designation')}} style={{width: '50%', margin: 10}}  label="Designation" variant="outlined" />
                </div>
                <div style={{display: 'flex', widows: '100%', justifyContent: 'space-between', marginTop: 10}}>
                  <TextField required onChange={(e)=>{updateData(e.target.value, 'totalExperience')}} style={{width: '50%', margin: 10}}  label="Total Experience" variant="outlined" />
                  <TextField required onChange={(e)=>{updateData(e.target.value, 'city')}} style={{width: '50%', margin: 10}}  label="City" variant="outlined" />
                </div>
              </div>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              color="inherit"
              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            {(()=>{
              if(allFilled) return <Button variant='contained'  onClick={handleNext}>
                                                {((activeStep === steps.length - 1)) ? 'Finish' : 'Next'}
                                              </Button>
              else return <Button variant='contained' disabled onClick={handleNext}>
                    {((activeStep === steps.length - 1)) ? 'Finish' : 'Next'}
                  </Button>
            })()}
            
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}