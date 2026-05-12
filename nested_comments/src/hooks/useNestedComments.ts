import { useState } from "react";
import type { CommentsType } from "../App";

function useNestedComments(comments: CommentsType[]) {
  const [commentsData, setCommentsData] = useState<CommentsType[]>(comments);

  const insertNode = (
    tree: CommentsType[],
    commentId: string,
    content: CommentsType,
  ): CommentsType[] => {
    return tree.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, content],
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: insertNode(comment.replies, commentId, content),
        };
      }
      return comment;
    });
  };

  const editNode = (
    tree: CommentsType[],
    content: string,
    commentId: string,
  ): CommentsType[] => {
    return tree.map((comment) => {
      if (commentId === comment.id) {
        return {
          ...comment,
          content,
        };
      } else if (comment.replies && comment.replies.length > 0) {
        return {
          ...comment,
          replies: editNode(comment.replies, content, commentId),
        };
      }
      return comment;
    });
  };
  const DeleteNode = (
    tree: CommentsType[],
    commentId: string,
  ): CommentsType[] => {
    return tree.reduce<CommentsType[]>((acc, comment) => {
      // Skip the node we want to delete

      if (commentId === comment.id) {
        return acc;
      }
      if (comment.replies.length === 0) {
        acc.push(comment);
        return acc;
      }
      const updatedReplies = DeleteNode(comment.replies, commentId);

      if (updatedReplies === comment.replies) {
        acc.push(comment);
      } else {
        acc.push({
          ...comment,
          replies: updatedReplies,
        });
      }

      // const updatedComment = {
      //   ...comment,
      //   replies: DeleteNode(comment.replies, commentId),
      // };

      // acc.push(updatedComment);

      return acc;
    }, []);
  };

  const submitComment = (content: string, commentId?: string) => {
    const newCommet = {
      id: `${new Date().getTime()}`,
      content,
      vote: 0,
      timestamp: new Date().toISOString(),
      replies: [],
    };

    if (commentId) {
      setCommentsData((prev) => insertNode(prev, commentId, newCommet));
    } else {
      setCommentsData((prev) => [newCommet, ...prev]);
    }
  };

  const editComment = (content: string, commentId: string) => {
    setCommentsData((prev) => editNode(prev, content, commentId));
  };

  const deleteComment = (commentId: string) => {
    setCommentsData((prev) => DeleteNode(prev, commentId));
  };
  return {
    commentsData,
    submitComment,
    editComment,
    deleteComment,
  };
}

export default useNestedComments;
