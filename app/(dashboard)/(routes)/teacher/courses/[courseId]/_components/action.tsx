"use client";

import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";

interface ActionsProps {
  courseId: string;
  isPublished: boolean;
  disabled: boolean;
}

export const Actions = ({
  courseId,
  isPublished,
  disabled,
}: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
        setIsLoading(true);
  
        if (isPublished) {
          await axios.patch(`/api/courses/${courseId}/unpublish`);
          toast.success("Course unpublished");
        } else {
          await axios.patch(`/api/courses/${courseId}/publish`);
          toast.success("Course published");
          confetti.onOpen();
        }
  
        router.refresh();
      } catch {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/api/courses/${courseId}`);

      toast.success("Chapter deleted");
      router.refresh();
      router.push(`/teacher/courses`);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="w-4 h-4" />
        </Button>
      </ConfirmModal>
    </div>
  );
};
