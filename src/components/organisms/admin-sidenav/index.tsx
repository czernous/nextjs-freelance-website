import Link from 'next/link';
import React from 'react';
import styles from './admin-sidenav.module.scss';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { IconButton, Tooltip } from '@mui/material';

const iconStyle = {
  fontSize: '35px',
};

const AdminSideNav = () => {
  return (
    <div className={styles.sidenav}>
      <Tooltip title="posts" placement="right">
        <Link href="/admin/posts" passHref>
          <IconButton className={styles.icon} title="posts">
            <ListAltOutlinedIcon sx={iconStyle} />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="pages" placement="right">
        <Link href="/admin/pages" passHref>
          <IconButton className={styles.icon} title="pages">
            <AutoStoriesOutlinedIcon sx={iconStyle} />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="images" placement="right">
        <Link href="/admin/images" passHref>
          <IconButton className={styles.icon} title="images">
            <CollectionsOutlinedIcon sx={iconStyle} />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="logout" placement="right">
        <Link href="/admin/logout" passHref>
          <IconButton className={styles.icon} title="logout">
            <LogoutOutlinedIcon sx={iconStyle} />
          </IconButton>
        </Link>
      </Tooltip>
    </div>
  );
};

export default AdminSideNav;
