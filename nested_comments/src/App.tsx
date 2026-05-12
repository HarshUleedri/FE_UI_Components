import NestedComments from "./components/NestedComments";
import comments from "./data/comments.json";
import useNestedComments from "./hooks/useNestedComments";

export interface CommentsType {
  id: string;
  content: string;
  vote: number;
  timestamp: string;
  replies: CommentsType[];
}

const App = () => {
  const { commentsData, submitComment, editComment, deleteComment } =
    useNestedComments(comments);
  return (
    <div className="  container mx-auto py-20">
      <NestedComments
        onSubmit={submitComment}
        onEdit={editComment}
        onDelete={deleteComment}
        comments={commentsData}
      />
    </div>
  );
};

export default App;
