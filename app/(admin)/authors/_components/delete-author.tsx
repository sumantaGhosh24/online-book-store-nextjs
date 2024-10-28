"use client";

import {useState} from "react";
import toast from "react-hot-toast";
import {Trash} from "lucide-react";

import {deleteAuthor} from "@/actions/authorActions";
import {Button} from "@/components/ui/button";
import DialogProvider from "@/app/_components/dialog-provider";

interface DeleteAuthorProps {
  id: string;
  publicId: string;
}

const DeleteAuthor = ({id, publicId}: DeleteAuthorProps) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteAuthor(id, publicId);
      toast.success("Author deleted successful!");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogProvider
      title="Delete Author"
      description="Are you really want to delete this author?"
      trigger={
        <Button className="bg-rose-700 hover:bg-rose-800">
          <Trash size={24} className="mr-2" /> Delete
        </Button>
      }
    >
      <Button
        onClick={handleDelete}
        className="bg-rose-700 hover:bg-rose-800 disabled:bg-rose-300"
        disabled={loading}
      >
        <Trash size={24} className="mr-2" />
        {loading ? "Deleting..." : "Delete Author"}
      </Button>
    </DialogProvider>
  );
};

export default DeleteAuthor;
