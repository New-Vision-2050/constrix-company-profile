import { getServerAuthToken } from "./get-token";
import { isAuthenticated } from "../is-authenticated";
import { redirect } from "next/navigation";

function withServerNoAuth(Component: any) {
  return async function UnauthenticatedComponent(props: any) {
    const token = await getServerAuthToken();
    const authenticated = isAuthenticated(token);

    if (authenticated) {
      redirect("/"); // or wherever you want to redirect authenticated users
    }

    return <Component {...props} />;
  };
}

export default withServerNoAuth;
