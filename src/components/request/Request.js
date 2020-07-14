import React, { Component, Fragment } from "react";
import workRequestApi from "../../resources/workRequestApi";
import RequestForm from "./RequestForm";

class Request extends Component {
  state = {
    wrList: [],
    autoGenWR: "WRXXXXX",
    openForm: true
  };
  
  formatDate = d_date => {
    var date = new Date(d_date);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let formatTwoDigits = (digit) => ("0" + digit).slice(-2);
    var strDate = formatTwoDigits(date.getMonth()+1) +"/"+ formatTwoDigits(date.getDate()) +"/"+ date.getFullYear() +" "+ hours + ':' + minutes + ' ' + ampm;
    return strDate;
  }

  componentDidMount() {
    this.fetchWRList();
  }
  
  fetchWRList = () => {
    workRequestApi.getWRList()
      .then(res => {
          this.setState({wrList: res.data});
          let formatFiveDigits = (digit) => "WR"+("0000" + digit).slice(-5);
          let success = false; let wrno=13;
          while (!success){
            success = true;
            for (let i = 0; i < this.state.wrList.length; i++) {
              if (this.state.wrList[i]===formatFiveDigits(wrno)){
                wrno = wrno + 1;
                success = false;
                break
              }
            }
          }
          this.setState({autoGenWR: formatFiveDigits(wrno)});
          console.log(this.state.autoGenWR);
      })
      .catch(err => console.log(err))
  };

  handleRequestSubmit = req => {
    req.desired_completion_date = this.formatDate(req.desired_completion_date);
    req.wr = this.state.autoGenWR;
    workRequestApi.postWorkRequest(req)
      .then( res => {
        this.setState({openForm: false});
        console.log(req)
      })
      .catch(err => console.log(err));
  };



  render() {

    const newRequestData = {
      wr: "",
      title: "",
      type: "",
      priority: "",
      requestor_email: "",
      supervisor_email: "",
      description: "",
      desired_completion_date: new Date(),
      request_date: this.formatDate(new Date())
    };

    let requestForm = null;
    if (this.state.openForm){
      requestForm = (
        <RequestForm
          requestData={newRequestData}
          agWR = {this.state.autoGenWR}
          onSubmit={this.handleRequestSubmit}
        />
      );
    }else{
      requestForm = (
          <h3>!...Your request has been submitted...!</h3>
      );
    }


    return <Fragment>{requestForm}</Fragment>;
  }
}

export default Request;
