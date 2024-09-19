import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ActitvityType from '../EntityTypes/EntityTypes'
import ReactPlayer from 'react-player'
import TextArea from 'devextreme-react/text-area';

class Content extends React.Component{
    constructor(props) {
        super(props);          
        
    }
    render(){
        const currentActivity = this.props.data
        return(
            <Container fluid>

                <Row>
                {
                            (() => {
                                if(currentActivity.type === ActitvityType.Video)
                                {
                                    return (
                                        <div style={{ marginTop:"20px",textAlign:"center" }}>
                                            
                                            <Row>
                                                <Col>
                                                    <ReactPlayer
                                                        url={currentActivity.url}
                                                        width={"100%"}
                                                        controls={true}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row style={{ marginTop:"20px",textAlign:"center" }}>
                                                
                                            </Row>
                                            <Row >
                                                <Col>
                                                <TextArea
                                                    autoResizeEnabled={true}
                                                    value={currentActivity.summary}
                                                    readOnly={true}
                                                    maxHeight={300}
                                                    stylingMode="filled"
                                                    label="Summary"
                                                     />
                                                   
                                                </Col>
                                            </Row>
                                        </div>
                                        
                                            
                                        
                                    ) 
                                }
                                else if(currentActivity.type === ActitvityType.Blog)
                                {
                                return (

                                        <div style={{ marginTop:"20px",textAlign:"center" }}>
                                            <Row>
                                                <Col>
                                                    <TextArea
                                                        autoResizeEnabled={true}
                                                        value={currentActivity.summary}
                                                        readOnly={true}
                                                        maxHeight={200}
                                                        stylingMode="underlined"
                                                        label="Summary"
                                                    />
                                                </Col>
                                            </Row>
                                            <Row style={{ marginTop:"20px",textAlign:"center" }}>
                                                
                                            </Row>
                                            <Row >
                                                <Col>
                                                <TextArea
                                                    autoResizeEnabled={true}
                                                    value={currentActivity.blog}
                                                    readOnly={true}
                                                    maxHeight={300}
                                                    stylingMode="filled"
                                                    label="Blog"
                                                     />
                                                   
                                                </Col>
                                            </Row>
                                        </div>
                                        
                                    )
                                }
                                else if(currentActivity.type == ActitvityType.Event)
                                {
                                    return(
                                        <div style={{ marginTop:"20px"}}>
                                             <Row>
                                                <Col>
                                                    <TextArea
                                                        autoResizeEnabled={true}
                                                        value={currentActivity.summary}
                                                        readOnly={true}
                                                        maxHeight={200}
                                                        stylingMode="underlined"
                                                        label="Summary"
                                                    />
                                                </Col>
                                            </Row>
                                        
                                            <Row style={{ marginTop:"10px"}}>
                                                <Col>
                                                <TextArea
                                                    autoResizeEnabled={true}
                                                    value={currentActivity.location}
                                                    readOnly={true}
                                                    maxHeight={300}
                                                    stylingMode="underlined"
                                                    label="location"
                                                     />
                                                   
                                                </Col>
                                            </Row>
                                            <Row style={{ marginTop:"10px"}}>
                                                <Col>
                                                <TextArea
                                                    autoResizeEnabled={true}
                                                    value={currentActivity.eventNote}
                                                    readOnly={true}
                                                    maxHeight={300}
                                                    stylingMode="underlined"
                                                    label="Event Notes"
                                                     />
                                                   
                                                </Col>
                                            </Row>
                                        </div>
                                    )
                                }
                            })()
                        
                }
                </Row>
                
            </Container>
        )
    }
}
export default Content;