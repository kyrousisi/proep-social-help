import React from "react";
import Tabs from 'devextreme-react/tabs';
import SelectBox from 'devextreme-react/select-box';
import { Col, Container, Row } from "react-bootstrap";
import Form, { Item } from 'devextreme-react/form';
import ActitvityType from '../EntityTypes/EntityTypes'
import axios from 'axios';
import { Button } from 'devextreme-react/button';
import notify from 'devextreme/ui/notify';
import { Lookup, DropDownOptions } from 'devextreme-react/lookup';
import List from 'devextreme-react/list';

const tabs = [
    {
      id: 0,
      text: 'Video',
      icon: 'video',
      content: 'Video tab content',
    },
    {
      id: 1,
      text: 'Blog',
      icon: 'doc',
      content: 'blog tab content',
    },
    {
      id: 2,
      text: 'Event',
      icon: 'event',
      content: 'event tab content',
    },
  ];

class NewActivity extends React.Component{
    constructor(props) {
        super(props);
       
        this.state = {
            NewActivity:{},
            selectedIndex: 0, 
            tags: [],
            selectedTags: []
          };

        this.onValueChanged = this.onValueChanged.bind(this);
        this.onlookupVauleChanged = this.onlookupVauleChanged.bind(this);
        this.onlookupItemDeleted = this.onlookupItemDeleted.bind(this);
        this.notesEditorOptions = { height: 180 };  
    }

    componentDidMount(){
        axios.get('/api/Tag')
        .then(res => {
       
           
            this.setState({ 
                tags: res.data,
            })
            console.log(this.state.tags)
            console.log(res.data)

        }).catch(err => notify(err, "warning"))
    }


    render(){
        const { selectedIndex, NewActivity, tags, selectedTags } = this.state;
        return(
            <Container>
                <Row>
                    <Col>
                    <h5>Activity Type</h5>
                    <SelectBox
                        dataSource={tabs}
                        displayExpr="text"
                        valueExpr="id"
                        value={selectedIndex}
                        onValueChanged={this.onValueChanged}
                        />
                    </Col>
                </Row>
                <Row style={{marginTop:"30px"}}>
                <h5>Details</h5>
                    {/* select the correct form dependant on the selected index */}


                    {
                            (() => {
                                if(selectedIndex === ActitvityType.Video)
                                {
                                    return (
                                        
                                        <div>
                                            <Form
                                                id="form"
                                                labelMode="floating"
                                                formData={NewActivity}
                                                >
                                                        <Item dataField="title"/>
                                                        <Item dataField="summary" editorType="dxTextArea"/>
                                                        <Item dataField="url"/>

                                            </Form>
                                        </div>
                                        
                                    ) 
                                }
                                else if(selectedIndex === ActitvityType.Blog)
                                {
                                return (

                                        <div>
                                            <Form
                                            id="form"
                                            labelMode="floating"
                                            formData={NewActivity}
                                            >
                                                    <Item dataField="title"/>
                                                    <Item dataField="summary"/>
                                                    <Item dataField="blog" colSpan={2} editorType="dxTextArea" editorOptions={this.notesEditorOptions}/>
                                            </Form>    
                                        </div>
                                        
                                    )
                                }
                                else if(selectedIndex == ActitvityType.Event)
                                {
                                    return(
                                        <div>
                                            <Form
                                            id="form"
                                            labelMode="floating"
                                            formData={NewActivity}
                                            >
                                                    <Item dataField="title"/>
                                                    <Item dataField="summary"/>
                                                    <Item dataField="location" />
                                                    <Item dataField="eventNote"/>
                                            </Form>
                                        </div>
                                        
                                    )
                                }
                            })()
                        }
                </Row>
                
                <h5 style={{marginTop:'30px'}}>Tags</h5>
                <Row style={{marginTop:'5px'}}>
                            <Col>
                                <Lookup
                                    dataSource={tags}
                                    displayExpr="description"
                                    onValueChanged={this.onlookupVauleChanged}
                                    placeholder="Select tag..."
                                    >
                                        <DropDownOptions
                                            closeOnOutsideClick={true}
                                            showTitle={false}
                                        />
                                </Lookup>

                                <span> </span>
                                <List
                                    dataSource={selectedTags}
                                    height={150}
                                    allowItemDeleting={true}
                                    itemDeleteMode="toggle"
                                    onItemDeleted={this.onlookupItemDeleted}
                                    noDataText="No tags added"
                                    >
                                </List>
                            </Col>       
                </Row>
                
                
                <Row style={{marginTop:'20px', textAlign:'center'}}>
                            <Col>
                                <Button icon="check"
                                type="success"
                                text="Create Activity"
                                onClick={() => this.createActivity(NewActivity)} />
                            </Col>       
                </Row>
                
            </Container>
        );
    }

    onValueChanged(args) {
        this.setState({
          selectedIndex: args.value,
        });
    }

    onlookupVauleChanged(e) {
        const currentTags = this.state.selectedTags;
        if(!currentTags.includes(e.value.description))
        {
            this.setState(prevState => ({
                selectedTags: [...prevState.selectedTags, e.value.description]
            }))
        }
    }

    onlookupItemDeleted(e) {
        console.log(e.value)
        console.log(this.state.selectedTags)
    }

    createActivity(act){
        act.authorId = localStorage.getItem("userId");
        act.type = this.state.selectedIndex;
        act.tags = this.state.selectedTags;
        console.log(act)

        axios.post(`/api/Activities`, act).then((res)=>{
        
            console.log(res.data);
            notify(act.title+" was succefully created", 'success', 1500);
            
            window.location.reload(false)

            })
            .catch(error => {
              notify(error, 'warning')
            }) 
    }
}

export default NewActivity;