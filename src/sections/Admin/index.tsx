import React from "react";
import { AdminPanel } from "./components/AdminPanel";
import type { VerificationResult } from "@/App";

export type AdminProps = {
  verificationResult: VerificationResult | null;
  onUpdate: (result: VerificationResult) => void;
  onClose: () => void;
};

export const Admin = (props: AdminProps) => {
  return (
    <AdminPanel
      verificationResult={props.verificationResult}
      onUpdate={props.onUpdate}
      onClose={props.onClose}
    />
  );
};
