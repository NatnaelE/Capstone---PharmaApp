import React, { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { Link, useRouteMatch } from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar'

// Icons
import { Speed, BarChart, Assignment, LocalPharmacy,
  Menu as MenuIcon, MenuOpen, AccountCircle, ExitToApp, Close } from '@material-ui/icons';
// import { Apps } from '@material-ui/icons'

const SideBar = ({ toggled, handleToggle }) => {
  let auth = useAuth()
  // let rtd = useRTD()
  // console.log(rtd.userData)
  const [collapsed, setCollapsed] = useState(auth.userData ? auth.userData.settings.startSidebarMinimized : false)
  // console.log(auth.rtd.getUserData())

  return <ProSidebar id="sideBar"
    collapsed={collapsed}
    breakPoint="md"
    toggled={toggled}
    onToggle={handleToggle}
  >
    <SidebarHeader>
      <Button variant="trans"
        className={`px-0 hideable-toggle ${toggled ? "d-none" : "d-absolute"} ${collapsed ? "closed" : "open"}`}
        onClick={e => {
              e.preventDefault()
              setCollapsed(!collapsed)
            }}>{ collapsed ? <MenuIcon /> : <MenuOpen /> }</Button>
      <Button variant="trans"
        className={`px-0 hideable-toggle ${toggled ? "d-absolute" : "d-none"} ${collapsed ? "closed" : "open"}`}
        onClick={e => {
              e.preventDefault()
              handleToggle()
            }}><Close /></Button>
      <Row className="mx-0 p-3 w-100 flex-nowrap justify-content-start">
        <Col xs={"auto"} className="px-0">
          <h1 className={`mb-0 hideable ${collapsed ? "hidden" : "show"}`}>PharmaApp</h1>
        </Col>
        
      </Row>
    </SidebarHeader>
    
    <SidebarContent>
      <Menu>
        <h2 className={`menu-title hideable ${collapsed ? "hidden" : "show"}`}>Menu</h2>
        <MenuItem icon={<Speed />} active={useRouteMatch({path: '/pharmacist/dashboard'})}>
          Dashboard
          <Link to="/pharmacist/dashboard"></Link>
        </MenuItem>
        <MenuItem icon={<BarChart />} active={useRouteMatch({path: '/pharmacist/inventory'})}>
          Inventory
          <Link to="/pharmacist/inventory"></Link>
        </MenuItem>
        <MenuItem icon={<Assignment />} active={useRouteMatch({path: '/pharmacist/orders'})}>
          Orders
          <Link to="/pharmacist/orders"></Link>
        </MenuItem>
        <MenuItem icon={<LocalPharmacy />} active={useRouteMatch({path: '/pharmacist/pharmacy'})}>
          My Pharmacy
          <Link to="/pharmacist/pharmacy"></Link>
        </MenuItem>
      </Menu>
      
    </SidebarContent>
    <SidebarFooter>
    <Menu>
        <h2 className={`menu-title hideable ${collapsed ? "hidden" : "show"}`}>Account</h2>
                
        <SubMenu
          title={auth.user.displayName}
          icon={auth.user.photoURL ? <ProfilePicture src={auth.user.photoURL} /> : <AccountCircle />}
        >
          <MenuItem>Profile</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuItem onClick={e => {
            e.preventDefault()
            auth.updateProfile({ name: "Jimmy Heaters", img: "https://images-na.ssl-images-amazon.com/images/I/61ZQxQke2rL._SL1203_.jpg"})
          }}>Update Profile</MenuItem>
          <MenuItem onClick={e => {
            e.preventDefault()
            auth.signOut()
          }}>Sign Out</MenuItem>
        </SubMenu>
      </Menu>

    </SidebarFooter>
    <SidebarFooter >
      <Menu>
        <MenuItem icon={<ExitToApp />}>
          Exit Dashboard
          <Link to="/"></Link>
        </MenuItem>
      </Menu>
      
    
    </SidebarFooter>
  </ProSidebar>
}

const ProfilePicture = ({ src, width }) => {
  return <img src={src} style={{
    width: width ? width : '35px',
    borderRadius: '50%'
  }} alt="profile" />
}

export default SideBar