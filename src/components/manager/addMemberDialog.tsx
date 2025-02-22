"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { X } from "lucide-react";

export default function AddMemberDialog({ open, onClose, onSubmit, }: { open: boolean; onClose: () => void; onSubmit: (phone: string, pin: string) => void; }) {
  const [phone, setPhone] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const phonePattern = /^\d{10}$/;
    const pinPattern = /^\d{6}$/;

    if (!phonePattern.test(phone) || !pinPattern.test(pin)) {
      setError("all errors");
    } else {
      setError("");
      onSubmit(phone, pin);
      onClose(); // Close modal after success
    }
  };

  const isFormValid = /^\d{10}$/.test(phone) && /^\d{6}$/.test(pin);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-sm p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center">
            <span>เพิ่มสมาชิก</span>
            <DialogClose className="cursor-pointer" onClick={onClose}>
              <p className="w-5 h-5 opacity-80">X</p>
            </DialogClose>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <label className="font-semibold">เบอร์โทรศัพท์ : </label>
            <input
              type="text"
              placeholder="064-xxx-xxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">PIN : </label>
            <input
              type="password"
              placeholder="xxxxxx"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
            />
          </div>

          {error && <p className="text-red-500 text-sm text-right pr-4">{error}</p>}

          <Button 
            className="w-full text-white" 
            onClick={handleSubmit}
            disabled={!isFormValid}>
            เพิ่มสมาชิก
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
