import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import SmartLink from "./SmartLink";

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
            <SmartLink href={url} isExternal={isExternal}>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <Typography color="primary" variant="button">
                  {text}
                </Typography>
              </ListItemButton>
            </SmartLink>
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
