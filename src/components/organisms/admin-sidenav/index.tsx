import Link from 'next/link';
import React, { useCallback, useContext } from 'react';
import styles from './admin-sidenav.module.scss';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import CollectionsOutlinedIcon from '@mui/icons-material/CollectionsOutlined';
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { IconButton } from '@mui/material';
import { GalleryContext } from '../image-gallery/state/image-gallery.base';

const iconStyle = {
  fontSize: '35px',
};

// eslint-disable-next-line @typescript-eslint/ban-types
const AdminSideNav = ({ galleryIdent }: { galleryIdent: string }) => {
  const galleryContext = useContext(GalleryContext);
  const { toggleOpen, setInstanceId } = galleryContext;

  /* istanbul ignore next */
  const handleOpen = useCallback(() => {
    setInstanceId(galleryIdent);
    toggleOpen();
  }, [galleryIdent, setInstanceId, toggleOpen]);
  return (
    <div className={styles.sidenav}>
      <Link href="/admin/posts" passHref>
        <IconButton className={styles.icon} title="posts">
          <ListAltOutlinedIcon sx={iconStyle} />
        </IconButton>
      </Link>

      <Link href="/admin/pages" passHref>
        <IconButton className={styles.icon} title="pages">
          <AutoStoriesOutlinedIcon sx={iconStyle} />
        </IconButton>
      </Link>

      <IconButton className={styles.icon} title="images" onClick={handleOpen}>
        <CollectionsOutlinedIcon sx={iconStyle} />
      </IconButton>

      <Link href="/admin/logout" passHref>
        <IconButton className={styles.icon} title="logout">
          <LogoutOutlinedIcon sx={iconStyle} />
        </IconButton>
      </Link>
    </div>
  );
};

export default AdminSideNav;
