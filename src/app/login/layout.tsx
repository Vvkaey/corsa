import { Metadata } from "next";
import { mergeMetadata } from "../_utils/seo";

export const metadata: Metadata = mergeMetadata('login');

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 