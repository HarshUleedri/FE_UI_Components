import type React from "react";
import type { CommentsType } from "../App";
import { useState } from "react";
import Comments from "./Comment";

const NestedComments = ({
  comments,
  onSubmit,
  onEdit,
  onDelete,
}: {
  comments: CommentsType[];

  onSubmit: (content: string, commentId?: string) => void;
  onEdit: (content: string, commentId: string) => void;
  onDelete: (commentId: string) => void;
}) => {
  const [commentValue, setcommentValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setcommentValue(e.target.value);
  };

  const submitComment = () => {
    if (commentValue) {
      onSubmit(commentValue);
      setcommentValue("");
    }
  };

  return (
    <div className="flex items-center flex-col gap-8">
      <h1 className="text-4xl text-neutral-700 font-semibold text-center tracking-tight">
        Nested Comments
      </h1>
      <hr className="text-neutral-200 w-1/2 border border-dashed" />
      <div className=" lg:w-1/2 flex flex-col gap-2 border-b pb-2 border-neutral-200   ">
        <textarea
          value={commentValue}
          onChange={handleChange}
          rows={3}
          placeholder="Comment"
          className="text-base w-full outline-none focus:ring-1 border border-neutral-200 focus:ring-neutral-200 p-4 rounded-xl "
        />
        <button
          onClick={() => submitComment()}
          type="submit"
          className="px-4 py-1 w-fit self-end rounded-lg tracking-wide cursor-pointer text-neutral-100 bg-neutral-800"
        >
          Submit
        </button>
      </div>

      <div className="max-w-2xl w-full space-y-4">
        {comments.map((comment) => {
          return (
            <Comments
              onDelete={onDelete}
              onSubmit={onSubmit}
              onEdit={onEdit}
              comment={comment}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NestedComments;
