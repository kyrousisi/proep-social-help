import { Container } from "react-bootstrap";
import DataGrid, {
    Column,
    Editing,
    Paging,
    Selection,
    SearchPanel,
    Toolbar,
    Item,
  } from 'devextreme-react/data-grid';
  
  import { SelectBox } from 'devextreme-react/select-box';
import { Button } from "devextreme-react/button";
import notify from 'devextreme/ui/notify';
import axios from 'axios';
import React from "react";
import App from "./App";

import CustomStore from 'devextreme/data/custom_store';
import { formatDate } from 'devextreme/localization';


const REFRESH_MODES = ['full', 'reshape', 'repaint'];

class CompaniesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItemKeys: [],
          };
          this.selectionChanged = this.selectionChanged.bind(this);
          this.deleteRecords = this.deleteRecords.bind(this);      
        
    }
    
render() {
    return (
        <div id="data-grid-demo" style={{marginTop:'20px'}}>
          <DataGrid id="gridContainer"
            dataSource={this.props.Companies}
            keyExpr="id"
            showBorders={true}
            
            onRowRemoved={this.itemDelete}
            onRowInserted={this.itemAdd}
            onRowUpdated={this.itemUpdate}
            
          >
              <SearchPanel visible={true}
                width={240}
                placeholder="Search..." />
            
            
            <Editing
              mode="cell"
              allowUpdating={true}
              allowAdding={true}
              allowDeleting={true} />
  
                <Column dataField="code" />
                <Column dataField="id" />
                <Column dataField="name" />
                <Column dataField="website" />
            <Toolbar>
              <Item name="addRowButton" showText="always" />
              <Item name="searchPanel" />
            </Toolbar>
          </DataGrid>
        </div>
      );
  }

  deleteRecords() {
    this.state.selectedItemKeys.forEach((key) => {
      console.log(key)
    });
    this.setState({
      selectedItemKeys: [],
    });
    //dataSource.reload();
  }

  selectionChanged(data) {
    this.setState({
      selectedItemKeys: data.selectedRowKeys,
    });
  }

    itemDelete(e){
        console.log(e);

        const company = e.data.id;


    
            axios.delete(`/Companies/`+company).then((res)=>{
        
                console.log(res.data);
                notify(company.name+" was succefully deleted", 'success', 1500);
            
                })
                .catch(error => {
                  notify(error, 'warning')
                });
    };

    itemUpdate(e){
        console.log(e.data);

        const company = e.data
        axios.put(`/Companies`, company).then((res)=>{
        
            console.log(res.data);
            notify(company.name+" was succefully edit", 'success', 1500);
        
            })
            .catch(error => {
              notify(error, 'warning')
            }) 
    };

    itemAdd(e){
        console.log(e.data);
        const newCompany = {
            name : e.data.name,
            website: e.data.website,
        };
        
        axios.post(`/Companies`, newCompany).then((res)=>{
        
            console.log(res.data);
            notify(newCompany.name+" was succefully added", 'success', 1500);
        
            })
            .catch(error => {
              notify(error, 'warning')
            }) 
    };

}
export default CompaniesPage;

