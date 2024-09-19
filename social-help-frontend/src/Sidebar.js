import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

var isAdmin = true;

const SidebarAdmin = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#2d5661" backgroundColor="#def5f2">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-2xl" style={{ fontSize: '30px' }}></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit', fontSize: '25px' }}>
            Settings
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user" style={{color: '#2d5661', fontSize: '25px'}}>Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/community" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="building" style={{color: '#2d5661', fontSize: '25px'}}>Community</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/chat" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="comment" style={{color: '#2d5661', fontSize: '25px'}}>Chats</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/applications" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="th-large" style={{color: '#2d5661', fontSize: '25px'}}>Applications</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/user-info" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="info" style={{color: '#2d5661', fontSize: '25px'}}>Users info</CDBSidebarMenuItem>
            </NavLink>

            <NavLink exact to="/landing" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="door-open" style={{color: '#2d5661', fontSize: '25px'}}>Log out</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>


      </CDBSidebar>
    </div>
  );
};

const SidebarUser = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#2d5661" backgroundColor="#def5f2">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-2xl" style={{ fontSize: '30px' }}></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit', fontSize: '25px' }}>
            Settings
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user" style={{color: '#2d5661', fontSize: '25px'}}>Profile</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/community" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="building" style={{color: '#2d5661', fontSize: '25px'}}>Community</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/chat" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="comment" style={{color: '#2d5661', fontSize: '25px'}}>Chats</CDBSidebarMenuItem>
            </NavLink>
            <NavLink exact to="/landing" target="_blank" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="door-open" style={{color: '#2d5661', fontSize: '25px'}}>Log out</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>


      </CDBSidebar>
    </div>
  );
};

const Sidebar = () => {
  
   return isAdmin ? <SidebarAdmin /> : <SidebarUser />;
};

export default Sidebar;