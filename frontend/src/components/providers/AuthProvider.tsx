import { GoogleOAuthProvider } from "@react-oauth/google";

export default function AuthProvider({ children }: any) {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
}
