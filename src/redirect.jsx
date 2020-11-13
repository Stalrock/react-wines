import { Redirect } from "react-router-dom";

const redirect = {
  to: (pathname, from = null) => (
    <Redirect
      to={{
        pathname: pathname,
        state: { from: from },
      }}
    />
  ),
};
export default redirect;
