import { Box } from "@mui/material";
import AdminDashboard from "../components/AdminDashboard";
import Meta from "../components/seo/Meta";

const Admin = () => {
  return (
    <>
      <Meta title="Resolutio Admin Page" />
      <Box>
        <AdminDashboard />
      </Box>
    </>
  );
};

export default Admin;
