import { IContactPage, IError } from '@src/interfaces';
import { serverSideBackendFetch } from '@src/utils';
import { NextPageWithLayout } from '../_app.page';
import ClientPageLayout from '@src/components/layouts/client-page-layout';
import { ReactElement } from 'react';
import StaticPageError from '@src/components/atoms/static-page-error';
import { Color, Size } from '@src/enums';
import InputField from '@src/components/molecules/input-field';
import Button from '@src/components/atoms/button';

interface IContactProps {
  data: IContactPage;
  error?: IError;
}

const Contact: NextPageWithLayout<IContactProps> = ({
  ...props
}: IContactProps) => {
  /* istanbul ignore next*/
  if (props.error) return <StaticPageError {...props.error} />;

  return (
    <div id="contact" className="col-xs-12 col-md-6 mx-3">
      <form action={props.data.formActionUrl} method="POST" target="_blank">
        <InputField
          type={'input'}
          fieldLabel="Name"
          inputColor={Color.Brick}
          name="name"
          inputId={'Name'}
          inputPlaceholder={'Enter your name'}
          isRequired={true}
        />
        <InputField
          type={'input'}
          inputColor={Color.Brick}
          name="email"
          fieldLabel="E-mail"
          inputId={'E-mail'}
          inputPlaceholder={'Enter your e-mail'}
          fieldClasses="mt-3"
          isRequired={true}
        />
        <InputField
          type={'textarea'}
          inputColor={Color.Brick}
          name="message"
          fieldLabel="Message"
          inputId={'message'}
          inputPlaceholder={'Enter your message'}
          fieldClasses="mt-3"
          isRequired={true}
        />
        <Button
          buttonColor={Color.Brick}
          buttonSize={Size.Small}
          buttonType={'submit'}
          buttonStyle={'primary'}
          buttonText={'Submit'}
          buttonFullWidth={true}
          hasShadow={false}
          customClass="mt-3"
        />
      </form>
    </div>
  ); // TODO: add DOMpurify
};
/* istanbul ignore next */
Contact.getLayout = function getLayout(page: ReactElement) {
  return (
    <ClientPageLayout pageTitle={'Contact me'} meta={page.props.data?.meta}>
      {page}
    </ClientPageLayout>
  );
};

/* istanbul ignore next */
export async function getStaticProps() {
  try {
    const data = await serverSideBackendFetch<IContactPage>('/pages/contact');

    return {
      props: {
        data,
      },
    };
  } catch (error) {
    return {
      props: {
        error: {
          statusCode: 400,
          message: JSON.stringify(error),
        },
      },
    };
  }
}
export default Contact;
