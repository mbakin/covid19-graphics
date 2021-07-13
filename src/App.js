import React, { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from "@material-ui/core/Paper"
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import AreaChart from "./components/AreaChart"
import { fetchContries } from "./components/api";
import newNormality from "./new-normality.svg"


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "90px auto",
    width: "50%"
  },

}));


const App = () => {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("italy") // For form elements


  // It only works on the first render.
  useEffect(() =>{
    const fetchCountriesData = async () => {
      const countries = await fetchContries();
      setCountries(countries);
    }

    fetchCountriesData();
  }, [])

  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container>
          <img src={newNormality} alt="coronavirus" style={{
            width:200,
            height:200,
            marginTop:75
          }}/>
          <FormControl className={classes.formControl}>

            <Select

              value={country}
              onChange={(event) => setCountry(event.target.value)}
            >
              {
                countries.map(country => (
                  <MenuItem value={country.Slug}>{country.Country}</MenuItem>
                ))
              }
            </Select>
          </FormControl>
          <Grid item xs={12}>
            <Paper>
              <AreaChart country={country} />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default App;
