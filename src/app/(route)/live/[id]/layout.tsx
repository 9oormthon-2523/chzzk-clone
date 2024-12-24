import "./style.css"

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div id="container" className="pt-[60px]">
            {children}
        </div>
    );
  }
  