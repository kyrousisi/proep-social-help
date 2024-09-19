import React from "react";
import DataGrid, {
    Column,
    Editing,
    Paging,
    Selection,
    SearchPanel,
    Toolbar,
    Item,
  } from 'devextreme-react/data-grid';
  import notify from 'devextreme/ui/notify';
import Button from 'devextreme-react/button';
import Popup from 'devextreme-react/popup';
import Activity from "./Activity";
import axios from "axios";
//import "./Activities.css"

import Image from "react-bootstrap/Image";
import { Col, Container, Row } from "react-bootstrap";
import EditContent from "./EditContent";
import Content from "./Content";
import Form from 'devextreme-react/form';
import List from 'devextreme-react/list';
const favButtonAttrs = {
  class: 'favorites',
};

class Activities extends React.Component {
    constructor(props) {
        super(props);

           console.log(props.Activities)
          this.state = {
            currentActivity: props.Activities[0],
            currentRole: "Member"
          };

          this.renderPopup = this.renderPopup.bind(this);
          this.showHouse = this.showHouse.bind(this);
          this.changeFavoriteState = this.changeFavoriteState.bind(this);
          this.handlePopupHidden = this.handlePopupHidden.bind(this);
    }

    componentDidMount(){
      axios.get('/Users/myRole/'+localStorage.getItem("userId"))
          .then(res => {
         
             
              this.setState({ 
                  currentRole: res.data.currentRole,
              })
              console.log(this.state.currentRole)

          }).catch(err => notify(err, "warning"))
  }



    render() {
        return (
          <Container fluid >
            <div className="images">
                {
                  this.props.Activities.map((h) => <Activity
                    Activity={h}
                    show={this.showHouse}
                    key={h.id}
                  />)
                }
                <Popup
                  width="60%"
                  height="90%"
                  showTitle={true}
                  title={this.state.currentActivity.title}
                  dragEnabled={false}
                  closeOnOutsideClick={true}
                  visible={this.state.popupVisible}
                  onHiding={this.handlePopupHidden}
                  contentRender={this.renderPopup}
                />
          </div>
          </Container>
          
  
          );
      }


      renderPopup() {
        const { currentActivity, currentRole } = this.state;
        
        return (
          <div className="popup-property-details">
            <div className="large-text">{currentActivity.title}</div>
            <div className="opacity">{currentActivity.created}</div>
            
            <Container fluid>
              <Row>
                <Col className="images">
                  <img src="logo.png" />
                </Col>
                <Col  style={{marginTop:'20px', textAlign:'center'}}>
                    <h6><i class="dx-icon-tags" style={{color:'green', fontSize:'1.2vw'}}>{currentActivity.tags.length}</i> &nbsp; Tags</h6>
                    <List
                      dataSource={currentActivity.tags}
                      hoverStateEnabled={false}
                      hint="Activity tag"
                      height={100}
                      >
                    </List>
                </Col>
                  
              </Row>
            </Container>
            
            <div>
                      {
                        (() => {
                          if(currentActivity.authorId === localStorage.getItem("userId") || currentRole === "Administrator")
                          {
                            return (
                                      <EditContent 
                                        data={currentActivity}
                                        close={this.handlePopupHidden}
                                      />
                            ) 
                          }
                          else
                          {
                            return (<Content data={currentActivity}/>)
                          }
                        })()
                      }
            </div>
          </div>
        );
     }

     showHouse(house) {
      console.log(house);
      this.setState({
        
        currentActivity: house,
        popupVisible: true,
      });
    }
  
    handlePopupHidden() {
      this.setState({
        popupVisible: false,
      });
    }
  
    changeFavoriteState() {
      const { currentActivity } = this.state;
      currentActivity.Favorite = !currentActivity.Favorite;
  
      this.renderPopup = this.renderPopup.bind(this);
      this.setState({
        currentActivity,
      });
  
      notify({
        message: `This item has been ${
          currentActivity.Favorite ? 'added to' : 'removed from'
        } the Favorites list!`,
        width: 450,
      },
      currentActivity.Favorite ? 'success' : 'error', 2000);
    }
    
}

export default Activities