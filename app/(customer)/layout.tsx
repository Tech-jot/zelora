import Link from "next/link";
import React from "react";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen ">
      <main className="">
        {children}
      </main>
    </div>
  );
}
