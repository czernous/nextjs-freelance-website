import { IError } from '@src/interfaces';
import React from 'react';
/* istanbul ignore next*/
const StaticPageError = (error: IError) => {
  return (
    <div className="d-flex flex-column">
      <h3>Could not page load content due to the following error</h3>

      <h5>status code: {error.statusCode}</h5>
      <h5>message: {error.message}</h5>
    </div>
  );
};

export default StaticPageError;
