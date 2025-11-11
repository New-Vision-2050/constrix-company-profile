import { tokenAtom } from "@/lib/jotai/atoms/auth";
import { useAtom } from "jotai";

export const useToken = () => {
  const token = useAtom(tokenAtom);

  if (!token)
    throw new Error(
      "Token atom is not initialized, make sure you are using AuthHydrator at a higher level in the component tree"
    );
  return token;
};
