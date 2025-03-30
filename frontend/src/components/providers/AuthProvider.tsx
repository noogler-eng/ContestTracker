import { GoogleOAuthProvider } from "@react-oauth/google";

export default function AuthProvider({ children }: any) {
  return (
    <GoogleOAuthProvider clientId={"30402686207-ujuddr8fhfa577l379vgnaksh7nnjigj.apps.googleusercontent.com"}>
      {children}
    </GoogleOAuthProvider>
  );
}
