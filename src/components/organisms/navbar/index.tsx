import React from 'react';
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
import Link from 'next/link';
import { useRouter } from 'next/router';
import { INavbarProps } from '@src/interfaces';
import { alpha, SxProps, ThemeProvider } from '@mui/material';
import { theme } from '@src/mui-theme';

const Navbar = ({ ...props }: INavbarProps) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();

  const handleDrawerToggle = React.useCallback(() => {
    setMobileOpen(!mobileOpen);
  }, [mobileOpen]);

  const colors = { ...theme.customColors };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontFamily: 'Mulish, sans-serif' }}>
        Ruth Chernous
      </Typography>
      <Divider />
      <List>
        {props.navItems.map((item) => (
          <Link
            href={item.url}
            key={item.uuid}
            passHref
            style={{ textDecoration: 'none' }}
          >
            <ListItem disablePadding>
              <ListItemButton
                sx={{
                  textAlign: 'center',
                  fontFamily: 'Mulish, sans-serif',
                  fontWeight: 700,
                  textTransform: 'none',
                  color: colors.olive[700],

                  '&:hover': {
                    background: alpha(colors.brick[100] as string, 0.5),
                    color: colors.olive[700],
                  },

                  '&.Mui-selected, &.Mui-selected:hover': {
                    background: alpha(colors.brick[200] as string, 0.5),
                  },
                }}
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
    <ThemeProvider theme={theme}>
      <AppBar
        component="nav"
        role="navigation"
        aria-label="Main"
        sx={{
          backgroundColor: colors.brick[200],
          color: colors.brick[700],
          boxShadow: 'none',
        }}
      >
        <Toolbar
          className="custom-container"
          style={{ width: 'inherit', height: 88 }}
        >
          <IconButton
            color="inherit"
            test-id="drawerButton"
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
            sx={{
              flexGrow: 1,
              display: { xs: 'none', sm: 'block' },
              fontFamily: 'Mulish, sans-serif',
              fontSize: 25,
              fontWeight: 700,

              '@media(min-width: 1440px)': {
                fontSize: 30,
              },
            }}
          >
            Ruth Chernous
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {props.navItems.map((item, index) => (
              <Link
                href={item.url}
                key={item.uuid}
                passHref
                style={{ textDecoration: 'none' }}
              >
                <Button
                  sx={
                    {
                      '&.MuiButton-root': {
                        textTransform: 'none',
                        fontFamily: 'Mulish',
                        fontWeight: 700,
                        color: colors.olive[600],
                        backgroundColor:
                          index === 0 &&
                          alpha(colors.olive[600] as string, 0.08),
                        marginLeft: index !== 0 && '10px',
                        '@media(min-width: 768px)': {
                          fontSize: 18,
                        },

                        '@media(min-width: 850px)': {
                          marginLeft: index !== 0 && '35px',
                        },

                        '@media(min-width: 1140px)': {
                          fontSize: 20,
                        },
                      },
                    } as SxProps
                  }
                >
                  {item.text}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          variant="temporary"
          test-id="drawer"
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
    </ThemeProvider>
  );
};

export default Navbar;
