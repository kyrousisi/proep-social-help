import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form, { Item } from 'devextreme-react/form';
import ActitvityType from '../EntityTypes/EntityTypes'
import { Button } from 'devextreme-react/button';
import notify from 'devextreme/ui/notify';
import axios from 'axios';
import 'devextreme-react/text-area';
import HtmlEditor, { Toolbar, MediaResizing } from 'devextreme-react/html-editor';
import Content from "./Content";


const sizeValues = ['8pt', '10pt', '12pt', '14pt', '18pt', '24pt', '36pt'];
const fontValues = ['Arial', 'Courier New', 'Georgia', 'Impact', 'Lucida Console', 'Tahoma', 'Times New Roman', 'Verdana'];
const headerValues = [false, 1, 2, 3, 4, 5];

class EditContent extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            currentActivity: props.data,
            takeApeek: false
          };
          
          this.notesEditorOptions = { height: 180 };
    }

    

    render(){
        const currentActivity = this.props.data
        return(
            <Container fluid>
                
                <Row style={{marginTop:'20px', textAlign:'right'}}>
                    <Col>
                    <Button 
                        icon="save"
                        type="default"
                        text="Edit/Preview"
                        onClick={() => this.previewActivity()} />
                    </Col>
                </Row>
                

                {this.state.takeApeek && <Content data={currentActivity}/>}
                {!this.state.takeApeek && 
                    <div>

                        {/* depending on type of activity show the correct form */}

                        {/*  */}

                        {
                            (() => {
                                if(currentActivity.type === ActitvityType.Video)
                                {
                                    return (
                                        
                                        <Form
                                            id="form"
                                            labelMode="floating"
                                            formData={currentActivity}
                                            >
                                                    <Item dataField="authorId" disabled={true}/>
                                                    <Item dataField="lastUpdated" editorType="dxDateBox" disabled={true}/>
                                                    <Item dataField="title"/>
                                                    <Item dataField="summary" editorType="dxTextArea" editorOptions={this.notesEditorOptions}/>
                                                    <Item dataField="url"/>

                                        </Form>
                                    ) 
                                }
                                else if(currentActivity.type === ActitvityType.Blog)
                                {
                                return (

                                        <div>
                                            <Form
                                            id="form"
                                            labelMode="floating"
                                            formData={currentActivity}
                                            >
                                                    <Item dataField="authorId" disabled={true}/>
                                                    <Item dataField="lastUpdated" editorType="dxDateBox" itemType="datetime" disabled={true}/>
                                                    <Item dataField="title"/>
                                                    <Item dataField="summary"/>
                                                    <Item dataField="blog" colSpan={2} editorType="dxTextArea" editorOptions={this.notesEditorOptions}/>
                                            </Form>    
                                        </div>
                                        
                                    )
                                }
                                else if(currentActivity.type == ActitvityType.Event)
                                {
                                    return(
                                        <Form
                                            id="form"
                                            labelMode="floating"
                                            formData={currentActivity}
                                            >
                                                    <Item dataField="authorId" disabled={true}/>
                                                    <Item dataField="lastUpdated" editorType="dxDateBox" itemType="datetime" disabled={true}/>
                                                    <Item dataField="title"/>
                                                    <Item dataField="summary"/>
                                                    <Item dataField="location" />
                                                    <Item dataField="eventNote"/>
                                            </Form>
                                    )
                                }
                            })()
                        }

                        <Row style={{marginTop:'20px', textAlign:'center'}}>
                            <Col>
                                <Button icon="check"
                                type="success"
                                text="update activity"
                                onClick={() => this.updateActivity(currentActivity)} />
                                <span> </span>
                                <Button icon="check"
                                type="danger"
                                text="Delete activity"
                                onClick={() => this.deleteActivity(currentActivity)} />
                            </Col>
                            
                        </Row>
                    </div>                
                }
            </Container>
        )
    }


    updateActivity(act){
        
        console.log(act)

        axios.put(`/api/Activities`, act).then((res)=>{
        
            console.log(res.data);
            notify(act.title+" was succefully updated", 'success', 1500);
            
            this.props.close()

            })
            .catch(error => {
              notify(error, 'warning')
            }) 
    }

    previewActivity(){
        this.setState({
            takeApeek: !this.state.takeApeek
        })
    }

    deleteActivity(act){
        
        axios.delete(`/api/Activities/`+act.id).then((res)=>{
        
            console.log(res.data);
            notify(act.title+" was succefully deleted", 'success', 1500);
            window.location.reload(false);
            })
            .catch(error => {
              notify(error, 'warning')
            });
    }

    fieldDataChanged(e){
        console.log(e)
    }
}

export default EditContent;