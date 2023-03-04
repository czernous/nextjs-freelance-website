/* eslint-disable @typescript-eslint/no-explicit-any */
import AdminPageLayout from '@src/components/layouts/admin-page-layout';
import { IError } from '@src/interfaces';
import { NextPageWithLayout } from '@src/pages/_app.page';
import { getDirNamesAsync, handleServerError } from '@src/utils';
import { ReactElement } from 'react';
import { NextPageContext } from 'next';
import { ServerResponse } from 'http';
import Link from 'next/link';
import { Link as MuiLink } from '@mui/material';
import { colors } from '@src/mui-theme/colors';

interface IPagesAdminProps {
  data: string[];
  error?: Error;
}

const PagesAdmin: NextPageWithLayout<IPagesAdminProps> = ({
  ...props
}: IPagesAdminProps) => {
  return (
    <div className="d-flex flex-column">
      {props.data.map((route) => (
        <Link key={route} href={`/admin/pages/${route}`} passHref>
          <MuiLink
            sx={{
              color: colors.olive[500],
              textDecorationColor: 'unset',
              ':hover': { color: colors.olive[700] },
            }}
          >
            Edit {route} page
          </MuiLink>
        </Link>
      ))}
    </div>
  );
};
/* istanbul ignore next */
PagesAdmin.getLayout = function getLayout(page: ReactElement) {
  return <AdminPageLayout title="Pages">{page} </AdminPageLayout>;
};
/* istanbul ignore next */
export async function getServerSideProps(ctx: NextPageContext) {
  const { res } = ctx;

  try {
    const data = await getDirNamesAsync('/src/pages/admin/pages');
    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return handleServerError(res as ServerResponse, error as IError);
  }
}
export default PagesAdmin;
