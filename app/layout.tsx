import "./globals.css";
import { PlanProvider } from "@/components/PlanProvider";

export const metadata = {
  title: "FitLog | Workout Library",
  description: "Train with intent. Log every set.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PlanProvider>
          {children}
        </PlanProvider>
      </body>
    </html>
  );
}