import React from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface AlertMessageProps {
  message: string;
}

export const WarningAlert: React.FC<AlertMessageProps> = ({ message }) => {
  return (
    <Alert>
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export const InfoAlert: React.FC<AlertMessageProps> = ({ message }) => {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export const ErrorAlert: React.FC<AlertMessageProps> = ({ message }) => {
  return (
    <Alert>
      <XCircle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export const SuccessAlert: React.FC<AlertMessageProps> = ({ message }) => {
  return (
    <Alert>
      <CheckCircle2 className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
