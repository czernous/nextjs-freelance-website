import AdminSideNav from '@src/components/organisms/admin-sidenav';
import { PropsWithChildren } from 'react';

import styles from './admin-page-layout.module.scss';

import ImageGallery from '@src/components/organisms/image-gallery';

interface IAdminPageLayoutProps {
  title: string;
}

const AdminPageLayout = ({
  children,
  ...props
}: PropsWithChildren & IAdminPageLayoutProps) => {
  const galleryIdent = 'admin-sidenav-gallery';

  return (
    <main className={`${styles.dashboard}`} data-testid="admin-layout">
      <AdminSideNav galleryIdent={galleryIdent} />
      <section>
        <h1 className={styles.heading}>{props.title}</h1>
        {children}
      </section>

      <ImageGallery identifier={galleryIdent} />
    </main>
  );
};

export default AdminPageLayout;
