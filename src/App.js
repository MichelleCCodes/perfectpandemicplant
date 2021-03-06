import './App.css';
import { useState } from "react";
import { plantsData } from './assets/plantData';
import PlantDisplay from './PlantDisplay';
import Footer from './Footer';

import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const difficulty= ["easy", "medium", "hard"];
const light = ["direct", "indirect", "low"];

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200,
  },
  formControl: {
    minWidth: 200,
  },
}));


function App() {
  const [filteredDifficulty, setFilteredDifficulty] = useState([]);
  const [filteredLight, setFilteredLight] = useState([]);

  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("");

  const handleSort = (event) => {
    let action = event.target.value;
    setSort(action);
  };

  const togglePrice = () => {
    setOpen(!open);
  };

  return (
    <div className="App">
      <h1>Perfect Pandemic Plants</h1>
      <p>A specially curated list of popular houseplants.</p>
      <div className="plantFilters">
      <h3>The perfect plant is here 🌿</h3>
      <div className={classes.root}>
          <Autocomplete
            multiple
            size="small"
            options={difficulty}
            onChange={(event, value) => setFilteredDifficulty(value)}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Care" />
            )}
          />
          <Autocomplete
            multiple
            size="small"
            options={light}
            onChange={(event, value) => setFilteredLight(value)}
            renderInput={(params) => (
              <TextField {...params} variant="standard" label="Lighting" />
            )}
          />
          <FormControl className={classes.formControl}>
            <InputLabel>Sort by Price</InputLabel>
            <Select
              open={open}
              onClick={togglePrice}
              value={sort}
              onChange={handleSort}
            >
              <MenuItem value={"ascending"}>Low to High</MenuItem>
              <MenuItem value={"descending"}>High to Low</MenuItem>
            </Select>
          </FormControl>
        </div>      
        </div>
        <PlantDisplay plants={plantsData} filteredDifficulty={filteredDifficulty} filteredLight={filteredLight} sort={sort}/>
        <Footer />
    </div>
  );
}

export default App;
