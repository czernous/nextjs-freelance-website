import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import styles from './navbar.module.scss';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { INavbarProps } from '../../../interfaces';

const Navbar = ({ ...props }: INavbarProps) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Ruth Chernous
      </Typography>
      <Divider />
      <List>
        {props.navItems.map((item) => (
          <Link href={item.url} key={item.uuid}>
            <ListItem disablePadding>
              <ListItemButton
                className={`${styles.drawerLink} ${
                  router.asPath === item.url && styles.drawerLinkActive
                }`}
                sx={{ textAlign: 'center' }}
                selected={router.asPath === item.url}
              >
                {item.text}
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        component="nav"
        className={styles.appbar}
        role="navigation"
        aria-label="Main"
      >
        <Toolbar
          className="custom-container"
          style={{ width: '100%', height: 88 }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            className={styles.logo}
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
            }}
          >
            Ruth Chernous
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {props.navItems.map((item, index) => (
              // find a way to handle active route (do the same for drawer + style it )
              <Link href={item.url} key={item.uuid}>
                <Button
                  className={`${styles.link} ${
                    index === 0 ? styles.linkActive : null
                  }`}
                >
                  {item.text}
                </Button>{' '}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: props.drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
