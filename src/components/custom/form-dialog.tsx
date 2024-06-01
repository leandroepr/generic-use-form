import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";

export type FormDialogProps = {
  open?: boolean;
  onClose?: () => void;
  formData?: { [key: string]: string } | null;
};

export function FormDialog(props: FormDialogProps) {
  return (
    <Dialog open={props.open} onOpenChange={props.onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Form submitted</DialogTitle>
          <DialogDescription>
            This is the form data after it was validated and submitted.
          </DialogDescription>
        </DialogHeader>
        <div className="whitespace-pre">
          {JSON.stringify(props.formData, null, 2)}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function useDialog() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: string } | null>(
    null
  );

  const closeDialog = () => {
    setOpen(false);
    setFormData(null);
  };

  const openDialog = (data: { [key: string]: string }) => {
    setFormData(data);
    setOpen(true);
  };

  return { open, openDialog, closeDialog, formData };
}
