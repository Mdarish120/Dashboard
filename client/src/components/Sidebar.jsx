import React ,{useState,useEffect}from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import profileImage from "assets/profile.jpeg"

import { Box,Divider,Drawer,
    IconButton,List,ListItem,
    ListItemButton,ListItemIcon,
    ListItemText,
    Typography,useTheme } from "@mui/material";
  import { 
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    Groups2Outlined,
    ReceiptLongOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutline,
    PublicOff,
    PublicOutlined

} from '@mui/icons-material';  


const navItems=[
  {  text:"Dashboard",
  icon:<HomeOutlined/>
   }, 
   {  text:"Client Facing",
   icon:null
    },
     {  text:"Products",
    icon:<ShoppingCartOutlined/>
     },
      {  text:"Customers",
     icon:<Groups2Outlined/>
      },
       {  text:"Transaction",
      icon:<ReceiptLongOutlined/>
       }, 
       {  text:"Geography",
       icon:<PublicOutlined/>

        },{  text:"Sales",
        icon:null
         },{  text:"Overview",
         icon:<PointOfSaleOutlined/>
          },{  text:"Daily",
          icon:<TodayOutlined/>
           }
           ,{  text:"Monthly",
           icon:<CalendarMonthOutlined/>
            },
            {  text:"Breakdown",
            icon:<PieChartOutline/>
             }, {  text:"Management",
             icon:null
              }, {  text:"Admin",
              icon:<AdminPanelSettingsOutlined/>
               },
              
]

const Sidebar = ({
     user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile
}) => {
   

  const { pathname } = useLocation();
     const [isActive,setIsActive]=useState("");
     const navigate=useNavigate();
     const theme=useTheme();


     useEffect(()=>{

       setIsActive(pathname.substring(1));      
      },[pathname])

  return (
<Box component="nav">
 {isSidebarOpen && (
    <Drawer
    open={isSidebarOpen}
    onClose={()=>setIsSidebarOpen(false)}
    variant='persistent'
    anchor='left'
    sx={{
      width: drawerWidth,
      "& .MuiDrawer-paper": {
        color: theme.palette.secondary[200],
        backgroundColor: theme.palette.background.alt,
        boxSixing: "border-box",
        borderWidth: isNonMobile ? 0 : "2px",
        width: drawerWidth,
        //overflow: "hidden",
        '&::-webkit-scrollbar': {
          width: '0.3em', // Change this width to adjust the scrollbar width
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'gray',// Change this color to customize the scrollbar thumb
        },
      },
     
    }}
    >
    <Box width="100%">
     <Box m="1.5rem 2rem 2rem 3rem">
      <FlexBetween color={theme.palette.secondary.main}>
       <Box display="flex" alignItems="center" gap="0.5">
        <Typography variant='h4' fontWeight="bold">
         ECOMVISION
        </Typography>
       </Box>

       {!isNonMobile && (
        <IconButton onClick={()=>setIsSidebarOpen(!isSidebarOpen)}>
         <ChevronLeft/>
        </IconButton>
       )}
      </FlexBetween>
     </Box>
     <List>
     {
  navItems.map(({ text, icon }) => {
    if (!icon) {
      return (
        <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
          {text}
        </Typography>
      );
    }

    const lcsText = text.toLowerCase();
    return (
      <ListItem key={lcsText} disablePadding>
        <ListItemButton
          onClick={() => {
            navigate(`/${lcsText}`);
           // setIsActive(lcsText);
          }}
          sx={{
            backgroundColor: isActive === lcsText ? theme.palette.secondary[300] : "transparent",
            color: isActive === lcsText ? theme.palette.primary[600] : theme.palette.secondary[100],
          }}
        >
          <ListItemIcon
            sx={{
              ml: "2rem",
              color: isActive === lcsText ? theme.palette.primary[600] : theme.palette.secondary[200],
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText primary={text}>
            {isActive === lcsText && (
              <ChevronRightOutlined sx={{ ml: "auto" }} />
            )}
          </ListItemText>
        </ListItemButton>
      </ListItem>
    )
  })
}

     </List> 
    </Box>

    <Box sx={{mt:"4rem"}}>
            <Divider />
            <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImage}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary[100] }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary[200] }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined
                sx={{
                  color: theme.palette.secondary[300],
                  fontSize: "25px ",
                }}
              />
            </FlexBetween>
          </Box>
    </Drawer>

    
 )}
</Box>
  )
}

export default Sidebar;