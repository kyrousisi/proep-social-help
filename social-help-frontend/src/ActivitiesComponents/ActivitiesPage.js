
import List, {SearchEditorOptions} from 'devextreme-react/list';
import renderer from 'devextreme/core/renderer';
import { useRef, useState } from 'react';
import { Col, Container , Row} from 'react-bootstrap';
import UserPage from '../UserPage';
import { Popup, Position, ToolbarItem } from 'devextreme-react/popup';   
import { Button } from 'devextreme-react/button';
import Form from 'devextreme-react/form';
import { Item } from 'devextreme-react/tabs';
import notify from 'devextreme/ui/notify';
import axios from 'axios';
import { Lookup, DropDownOptions } from 'devextreme-react/lookup';
import React from "react";
import Activities from './Activities';
import NewActivity from './NewActivity';


class ActivitiesPage extends React.Component{
    constructor(props) {
        super(props);
       
        this.state = {
            currentActivities: props.Activities,
            popupNewActivity: false
          };
          this.selectionChanged = this.valuechangedEvent.bind(this); 
          
          this.showNewActivityPopup = this.showNewActivityPopup.bind(this);
          this.hideNewActivityPopup = this.hideNewActivityPopup.bind(this);
          this.renderNewActivityPopup = this.renderNewActivityPopup.bind(this);
    }

    render() {
        return (
            <Container fluid style={{ marginTop:'30px'}}>

        
            <Row style={{marginTop: '20px', alignContent: 'flex', flexDirection: 'row-reverse' }}>
                <Button
                        icon="group"
                        id="icon-back"
                        text="Add Activity"
                        type="success"
                        stylingMode="outlined"
                        width={'13%'}
                        onClick={this.showNewActivityPopup}
                        />
                        
            </Row>

            <div id='searchLookup'></div>
            <Row style={{ marginTop:'10px' }}>
                <Lookup
                    dataSource={this.props.Activities}
                    displayExpr="title"
                    placeholder='Search Title....'
                    onContentReady={this.selectionChanged}
                    >
                    <DropDownOptions
                        closeOnOutsideClick={true}
                        showTitle={false}
                    />
                </Lookup>
            </Row>

            <Row style={{ marginTop:'10px' }}>
                <Activities Activities={this.state.currentActivities}/>
            </Row>
    
            <Popup
                visible={this.state.popupNewActivity}
                onHiding={this.hideNewActivityPopup}
                dragEnabled={false}
                closeOnOutsideClick={true}
                showCloseButton={true}
                showTitle={true}
                title="Create New Activity"
                width="60%"
                height="90%"
                contentRender={this.renderNewActivityPopup}
                />
   
            </Container>
          );
      }

    renderNewActivityPopup(){
        return(
            <NewActivity 
                data={"empty"}
                close={this.hideNewActivityPopup}/>
        );
    }

    valuechangedEvent(e) {
        //console.log(e.component._dataSource._items);
   
        this.setState({
            currentActivities: e.component._dataSource._items
        });
       
        console.log(this.state.currentActivities);
    };

    
    showNewActivityPopup(){
        this.setState({
          popupNewActivity: true
        });
      }
  
    hideNewActivityPopup(){
        this.setState({
          popupNewActivity: false
        });
      }
    
}
export default ActivitiesPage;