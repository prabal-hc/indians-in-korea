interface RootLayoutShellProps {
  children: React.ReactNode;
}

export default function RootLayoutShell({ children }: RootLayoutShellProps) {
  return (
    <div className="min-h-full flex flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
}
