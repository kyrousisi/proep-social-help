
import List, {SearchEditorOptions} from 'devextreme-react/list';
import renderer from 'devextreme/core/renderer';
import { useState } from 'react';
import { Col, Container , Row} from 'react-bootstrap';
import UserPage from './UserPage';
import { Popup, Position, ToolbarItem } from 'devextreme-react/popup';   
import { Button } from 'devextreme-react/button';
import Form from 'devextreme-react/form';
import { Item } from 'devextreme-react/tabs';
import notify from 'devextreme/ui/notify';
import axios from 'axios';

const DeleteUser = (curId) => { 
    axios.delete(`/Users/`+curId).then((res)=>{
    
        console.log(res.data);
        notify(curId+" was succefully deleted", 'success', 300);
        //change later, dirty code
        window.location.reload();
        })
        .catch(error => {
          notify(error, 'warning')
        }) 
}

const UsersPage = ({Users}) => {
    const[popUp, setPopup] = useState({
        currentUser:{},
        popupVisibile: false,
        positionOf: ''    
    })



    const hidePopup = () => {
        setPopup({
            currentUser:{},
            isPopupVisible: false
        });
    }

    const showPopup = (user) => {
        
        setPopup({
            currentUser: user,
            isPopupVisible: true
        });
        console.log(popUp.currentUser);
    }

    const itemClick = (e) => {
        console.log(e.itemData)

        setPopup({
            currentUser: e.itemData,
            isPopupVisible: true
        });
    }


    const UpdateUser = () => {
        

        const UpdateUser = (rank, suit, blah, mail, pss, cid,rle ) => { return { id: rank, firstName: suit, lastName: blah, email:mail, password: pss,companyId: cid, role: parseInt(rle) } }
        
        const updatedUser = UpdateUser(popUp.currentUser.id, popUp.currentUser.firstName, popUp.currentUser.lastName, popUp.currentUser.email, popUp.currentUser.password, popUp.currentUser.companyId, popUp.currentUser.role)
        console.log(updatedUser)
        axios.put(`/Users`, updatedUser).then((res)=>{
        
            console.log(res.data);
            notify(popUp.currentUser.email+" was succefully updated", 'success')
            hidePopup();
            })
            .catch(error => {
              notify(error, 'warning')
            }) 
    }

    
       

    const emailButtonOptions = {
        icon: 'email',
        width: '200px',
         text: 'Update',
         type: 'success',
         stylingMode: 'outlined'

    }

    const deleteButtonOptions = {
        icon: 'clearsquare',
        width: '200px',
         text: 'Delete',
         type: 'danger',
         stylingMode: 'outlined'

    }

    const blockButtonOptions = {
        icon: 'clear',
        width: '200px',
         text: 'Block',
         type: 'default',
         stylingMode: 'outlined'

    }

    const closeButtonOptions = {
            width: '200px',
            text: 'Close',
            type: 'default',
            stylingMode: 'outlined'
      }
    return (
        <>
        <Container fluid style={{ marginTop:'30px' }}>
                <Row style={{marginTop: '20px', alignContent: 'flex', flexDirection: 'row-reverse' }}>
                    <Button
                            icon="group"
                            id="icon-back"
                            text="Add User"
                            type="default"
                            stylingMode="outlined"
                            width={'13%'}
                            />
                </Row>
        <div>
            <List
            dataSource={Users}
            itemRender={UserPage}
            searchEnabled={true}
            searchExpr={['firstName', 'lastName','email']}
            onItemClick = { itemClick}
            height="800px"
                >
                    <SearchEditorOptions
                        placeholder="   Search..."
                        width={300}
                    />
            </List>
        </div>


            <div>
                <Popup
                    title="Popup Title"
                    visible={popUp.isPopupVisible}
                    
                >
                <ToolbarItem
                    widget="dxButton"
                    toolbar="bottom"
                    location="before"
                    onClick={() => UpdateUser()}
                    options={emailButtonOptions}
                />
            
                <ToolbarItem
                    widget="dxButton"
                    toolbar="bottom"
                    location="before"
                    onClick={() => DeleteUser(popUp.currentUser.id)}
                    options={deleteButtonOptions}
                />
                <ToolbarItem
                    widget="dxButton"
                    toolbar="bottom"
                    location="after"
                    options={closeButtonOptions}
                    onClick={()=> hidePopup()}
                />

                <Container fluid>
                    <Row>
                        <Col>
                        <Form
                            id="form"
                            labelMode={"floating"}
                            formData={popUp.currentUser}
                            showColonAfterLabel={"true"}
                            labelLocation={"left"}
                        >
                            <Item dataField="companyId" disabled={true}/>
                            <Item dataField="firstName"/>
                            <Item dataField="lastName" />
                            <Item dataField="email" />
                            <Item dataField="password"/>
                            <Item dataField="role"/>
                        </Form>
                        </Col>
                    </Row>
                </Container>
                    
                </Popup>
                
                
            </div>
        </Container>
        </>
        
         
    );
  
    
  };
  
  export default UsersPage;