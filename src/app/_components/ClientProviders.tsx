"use client";

import { GlobalUIProvider } from "../_utils/hooks/globalUI";
import { Header } from "../_components/global/header";
import StyledComponentsRegistry from "../../../lib/registry";
import { AuthProvider } from "../_contexts/AuthContext";
import { MentorshipProvider } from "../_contexts/MentorshipContext";
import { ModalProvider } from "./global/Modal";


export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <MentorshipProvider>
        <GlobalUIProvider>
            <StyledComponentsRegistry>
               <ModalProvider>
              <Header />
              {children}
              </ModalProvider>
            </StyledComponentsRegistry>
        </GlobalUIProvider>
      </MentorshipProvider>
    </AuthProvider>
  );
}