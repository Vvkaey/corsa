import { Metadata } from "next";
import { mergeMetadata } from "@/app/_utils/seo";

export const metadata: Metadata = mergeMetadata('admin');

export default function AdminBookSessionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
} 