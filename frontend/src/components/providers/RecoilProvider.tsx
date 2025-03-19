import { RecoilRoot } from "recoil";

export default function RecoilProvider({ children }: any) {
  return <RecoilRoot>{children}</RecoilRoot>;
}
