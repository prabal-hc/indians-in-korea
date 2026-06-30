interface RootLayoutShellProps {
  children: React.ReactNode;
}

export default function RootLayoutShell({ children }: RootLayoutShellProps) {
  return (
    <div className="flex flex-col w-full">
      <main className="flex-1">{children}</main>
    </div>
  );
}
