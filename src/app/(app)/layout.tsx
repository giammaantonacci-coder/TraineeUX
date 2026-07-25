import { BottomNav, SideNav } from "@/components/Nav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-dvh w-full max-w-5xl px-4 pb-32 pt-5 md:px-6 md:pb-12 md:pt-8">
      <div className="md:flex md:gap-8">
        <SideNav />
        <main className="min-w-0 flex-1">{children}</main>
      </div>
      <BottomNav />
    </div>
  );
}
