import PipViewBox from "./임시컴포넌트/PipViewBox";
import UserOptionNav from "./임시컴포넌트/UserOptionNav";
import "./style.css"

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div id="container" className="pt-[60px]">
            <PipViewBox/>
            {/* <SideNav/> */}
            <UserOptionNav/>
            {children}
        </div>
    );
  }
  