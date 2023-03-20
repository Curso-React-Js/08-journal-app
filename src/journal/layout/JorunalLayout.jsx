import { Box } from '@mui/material';

const drawerWith = 240;

export const JorunalLayout = ({ children }) => {
  return (
    <Box sx={{ display: "flex" }}>

      {/* Navbar drawerWith */}

      {/* Sidebar drawerWith */}

      <Box 
        component="main"
        sx={{ flexGrow: 1, p: 3 }}>

        {/* Toolbar */}

        { children }

      </Box>

    </Box>
  );
};
