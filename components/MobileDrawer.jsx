import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

const MobileDrawer = ({ openDrawer, closeDrawer, DrawerList }) => {
  const renderList = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={closeDrawer}
      onKeyDown={closeDrawer}
    >
      <Box sx={{ height: "50px" }}></Box>
      <Divider />
      <List>
        {DrawerList.map(({ id, text, url, isExternal, icon }) => (
          <ListItem key={id} disablePadding>
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      anchor="left"
      open={openDrawer}
      onClose={closeDrawer}
      sx={{ display: { md: "none" } }}
    >
      {renderList()}
    </Drawer>
  );
};

export default MobileDrawer;
