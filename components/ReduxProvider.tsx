"use client";

import { store } from "@/reduxs/Store";
import { usePathname } from "next/navigation";
import { Provider } from "react-redux";
import Hearder from "./Hearder";
import Footer from "./Footer";
const ReduxProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const publicRoutes = ["/SignIn", "/RegisterUser", "/Forget-password", "/reset-password"];

  return (
    <Provider store={store}>
      <HeaderConditional publicRoutes={publicRoutes} />
      {children}
      <FooterConditional publicRoutes={publicRoutes} />
    </Provider>
  );
};

const HeaderConditional = ({ publicRoutes }: { publicRoutes: string[] }) => {
  const pathname = usePathname();

  if (publicRoutes.includes(pathname || "")) {
    return null;
  }

  return <Hearder />;
};

const FooterConditional = ({ publicRoutes }: { publicRoutes: string[] }) => {
  const pathname = usePathname();

  if (publicRoutes.includes(pathname || "")) {
    return null;
  }

  return <Footer />;
};

export default ReduxProvider;
