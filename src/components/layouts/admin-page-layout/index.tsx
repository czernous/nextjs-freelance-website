import AdminSideNav from '@src/components/organisms/admin-sidenav';
import { PropsWithChildren } from 'react';

import styles from './admin-page-layout.module.scss';

interface IAdminPageLayoutProps {
  title: string;
}

const AdminPageLayout = ({
  children,
  ...props
}: PropsWithChildren & IAdminPageLayoutProps) => (
  <>
    <main className={`${styles.dashboard}`}>
      <AdminSideNav />
      <section>
        <h1 className={styles.heading}>{props.title}</h1>
        {children}
      </section>
    </main>
  </>
);

export default AdminPageLayout;
