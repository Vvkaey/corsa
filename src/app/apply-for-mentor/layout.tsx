import { Metadata } from "next";
import { mergeMetadata } from "../_utils/seo";

export const metadata: Metadata = mergeMetadata('applyForMentor');

export default function ApplyForMentorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 