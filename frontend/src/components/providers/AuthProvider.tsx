import { GoogleOAuthProvider } from "@react-oauth/google";

export default function AuthProvider({ children }: any) {
  const clientId =
    "414563801783-pb0dredtmbl53mjk2tk2jt1mnj8m2nnv.apps.googleusercontent.com";
  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}
