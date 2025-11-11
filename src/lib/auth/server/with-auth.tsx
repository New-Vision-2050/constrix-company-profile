import { getServerAuthToken } from "./get-token";
import { isAuthenticated } from "../is-authenticated";
import { redirect } from "next/navigation";

function withServerAuth(Component: any) {
  return async function AuthenticatedComponent(props: any) {
    const token = await getServerAuthToken();
    const authenticated = isAuthenticated(token);

    if (!authenticated) {
      redirect("/login");
    }
    return <Component {...props} />;
  };
}

export default withServerAuth;
