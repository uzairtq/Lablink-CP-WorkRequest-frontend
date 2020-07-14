import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import CardMedia from "@material-ui/core/CardMedia";
import StrykerLogo from "../Stryker-Company-Logo.jpg";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

const useStyles = makeStyles(theme => ({
  dropDowns: {
    minWidth: 150,
    width: "100%"
  },
  Right_Pane: {
    margin: theme.spacing(2),
    //minWidth: 400,
    maxWidth: 460,
  },
  Left_Pane: {
    margin: theme.spacing(2)
    //flexGrow: "2"
  },
  media: {
    maxWidth: 200
  },
  allContents: {
    alignItems: "center"
  },
  buttons: {
    marginTop: theme.spacing(2),
    justify: "flex-start"
  },
  multilineTexts: {
    width: "100%"
  }
}));

const NewRequest = props => {
  let title = "Work Request Form";


  let [requestData, setRequestData] = React.useState({
    ...props.requestData
  });
  const classes = useStyles();
  const handleChange = inputName => event => {
    setRequestData({
      ...requestData,
      [inputName]: event.target.value
    });
  };
  const [selectedDate, setSelectedDate] = React.useState(
    new Date().toLocaleString()
  );
  const handleDateChange = date => {
    setSelectedDate(date);
    setRequestData({
      ...requestData,
      "desired_completion_date": date
    });
  };



  return (
    <Grid className={classes.allContents} container direction="column">
      <AppBar position="static" style={{ backgroundColor: "#ffb400" }}>
        <Toolbar style={{justifyContent: 'center'}} variant="dense">
          <CardMedia
            className={classes.media}
            src={StrykerLogo}
            component="img"
            title="Stryker Logo"
          />
        </Toolbar>
      </AppBar>
      <Grid>
        <InputLabel id="BU">{<h3>Instruments > 1941 > Testlab</h3>}</InputLabel>
      </Grid>
      <Grid className={classes.Left_Pane} />
      <Grid className={classes.Right_Pane}>
        <h2>{title}</h2>
        <Grid container spacing={2} direction="row" item xs={12}>
          <Grid item xs={6}>
            <TextField
              id="wr"
              label="WR No."
              value={props.agWR}
              InputProps={{
                readOnly: true
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="title"
              label="Title"
              defaultValue={props.requestData.title}
              onChange={handleChange("title")}
              inputProps={{
                maxLength: 20
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.dropDowns}>
              <InputLabel id="type-label">Request Type</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                defaultValue={props.requestData.type}
                onChange={handleChange("type")}
              >
                <MenuItem value={"repair"}>Repair</MenuItem>
                <MenuItem value={"test_set-up"}>Test Set-up</MenuItem>
                <MenuItem value={"new_equipment"}>New Equipment</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl className={classes.dropDowns}>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                id="priority"
                defaultValue={props.requestData.priority}
                onChange={handleChange("priority")}
              >
                <MenuItem value={"high"}>High</MenuItem>
                <MenuItem value={"medium"}>Medium</MenuItem>
                <MenuItem value={"low"}>Low</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="requestor_email"
              label="Requestor's Email"
              defaultValue={props.requestData.requestor_email}
              onChange={handleChange("requestor_email")}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="supervisor_email"
              label="Supervisor's Email"
              defaultValue={props.requestData.supervisor_email}
              onChange={handleChange("supervisor_email")}
            />
          </Grid>
          <Grid item xs={6} style={{ marginTop: -16 }}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/dd/yyyy"
                autoOk
                margin="normal"
                id="desired_completion_date"
                label="Desired Completion"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date"
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item xs={6}>
            <TextField
              id="description"
              label="Description"
              className={classes.multilineTexts}
              multiline
              rowsMax="3"
              defaultValue={props.requestData.description}
              onChange={handleChange("description")}
            />
          </Grid>
          <Grid item className={classes.buttons}>
            <Button
              onClick={() => props.onSubmit(requestData)}
              color="primary"
              variant="contained"
            >
              Submit
            </Button>
            <Button color="primary">
              Clear All
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NewRequest;
