import { useState } from "react";
import type { CommentsType } from "../App";
import { AnimatePresence, motion } from "motion/react";

const Comments = ({
  comment,
  onSubmit,
  onEdit,
  onDelete,
}: {
  comment: CommentsType;
  onSubmit: (content: string, commentId?: string) => void;
  onEdit: (content: string, commentId: string) => void;
  onDelete: (commentId: string) => void;
}) => {
  const [showReply, setShowReply] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [commentValue, setcommentValue] = useState<string>("");
  const [editCommentData, setEditCommentData] = useState<string>(
    comment.content,
  );
  const [editError, setEditError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (isEdit) {
      setEditCommentData(e.target.value);
    } else {
      setcommentValue(e.target.value);
    }
  };

  const submitComment = (commentId?: string) => {
    if (commentValue) {
      onSubmit(commentValue, commentId);
      setcommentValue("");
    }
  };

  const toggleEdit = () => {
    setIsEdit(true);
    setEditCommentData(comment.content);
  };
  const cancelEdit = () => {
    setIsEdit(false);
    setEditCommentData("");
    setEditError("");
  };
  const deleteComment = (commentId: string) => {
    onDelete(commentId);
  };

  const saveEditComment = (commentId: string) => {
    if (editCommentData === comment.content) {
      setEditError("Please make some changes");
      return;
    }
    onEdit(editCommentData, commentId);
    setEditCommentData("");
    setIsEdit(false);
    setEditError("");
  };
  return (
    <>
      <div className="p-4 rounded-md bg-gray-100">
        <motion.div
          layoutId={`text-${comment.id}`}
          className="w-full  p-4 mb-4 0 bg-neutral-50/80 border border-neutral-200 rounded-2xl "
        >
          <p className="text-base mb-4 text-neutral-800 wrap-break-word w-11/12 ">
            {comment.content}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <p className="text-emerald-600   rounded  font-bold">
                votes : <span className="text-xs">{comment.vote}</span>
              </p>
              <p className="text-neutral-400   rounded  font-medium">
                replies{" "}
                <span className="text-xs">{comment.replies.length}</span>
              </p>
            </div>
            <p className="text-neutral-400 text-xs tracking-tight font-medium">
              {new Date(comment.timestamp).toLocaleString("US-en", {
                month: "short",
                day: "numeric",
                year: "2-digit",
              })}
            </p>
          </div>
        </motion.div>
        <AnimatePresence>
          {isEdit && (
            <div className="fixed inset-0  bg-black/80 backdrop-blur-md  flex items-center justify-center w-full ">
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 0.9,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeInOut",
                }}
                layoutId={`text-${comment.id}`}
                className="flex flex-col  mb-4  max-w-1/2 w-full bg-neutral-200  lg:p-8 rounded-lg h-fit  gap-2 border-b pb-2 border-neutral-200   "
              >
                <textarea
                  value={editCommentData}
                  onChange={handleChange}
                  rows={6}
                  placeholder="Comment"
                  className="text-base  bg-white w-full outline-none focus:ring-1 border border-neutral-200 focus:ring-neutral-200 p-4 rounded-xl "
                />
                {editError && (
                  <p className="text-red-600 px-4 text-xs font-medium">
                    {editError}
                  </p>
                )}
                <div className="self-end space-x-2">
                  <button
                    type="submit"
                    onClick={() => saveEditComment(comment.id)}
                    className="px-4 py-2 text-sm font-medium w-fit  rounded-lg tracking-wide cursor-pointer text-neutral-100 bg-neutral-700"
                  >
                    Save edit
                  </button>
                  <button
                    type="submit"
                    onClick={cancelEdit}
                    className="px-4 py-2 text-sm font-medium w-fit sd rounded-lg tracking-wide cursor-pointer text-neutral-100 bg-red-800"
                  >
                    Cancel
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="px-4 py-1 w-fit text-xs font-semibold rounded tracking-wide cursor-pointer text-neutral-100 bg-neutral-700 hover:bg-neutral-800"
          >
            Vote
          </button>
          <button
            onClick={() => setShowReply((prev) => !prev)}
            type="submit"
            className="px-4 py-1 w-fit text-xs font-semibold rounded tracking-wide cursor-pointer text-neutral-100 bg-neutral-700 hover:bg-neutral-800"
          >
            Reply
          </button>
          <button
            onClick={toggleEdit}
            type="submit"
            className="px-4 py-1 w-fit text-xs font-semibold rounded tracking-wide cursor-pointer text-neutral-100 bg-neutral-700 hover:bg-neutral-800"
          >
            Edit
          </button>
          <button
            onClick={() => deleteComment(comment.id)}
            type="submit"
            className="px-4 py-1 w-fit text-xs font-semibold rounded tracking-wide cursor-pointer text-neutral-100 bg-red-700 hover:bg-neutral-800"
          >
            Delete
          </button>
        </div>
      </div>
      {showReply && (
        <div className="ml-8 border-l pl-4 border-neutral-300  ">
          <div className="flex flex-col  mb-4 gap-2 border-b pb-2 border-neutral-200   ">
            <textarea
              value={commentValue}
              onChange={handleChange}
              rows={3}
              placeholder="Comment"
              className="text-base w-full outline-none focus:ring-1 border border-neutral-200 focus:ring-neutral-200 p-4 rounded-xl "
            />
            <button
              type="submit"
              onClick={() => submitComment(comment.id)}
              className="px-4 py-1 text-sm font-medium w-fit self-end rounded-lg tracking-wide cursor-pointer text-neutral-100 bg-neutral-800"
            >
              Submit
            </button>
          </div>

          <div className="max-w-2xl w-full  space-y-4">
            {comment?.replies?.map((val) => (
              <Comments
                onDelete={onDelete}
                onEdit={onEdit}
                onSubmit={onSubmit}
                comment={val}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Comments;
