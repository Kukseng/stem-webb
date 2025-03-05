import React from 'react';
import { CommentsSection } from 'react-comments-section';
import 'react-comments-section/dist/index.css'; // If styles are provided

function App() {
  return (
    <div className="App">
      <CommentsSection
        currentUser={{
          currentUserId: "01a",
          currentUserImg:
            "https://via.placeholder.com/150",
          currentUserFullName: "John Doe",
        }}
        commentsArray={[
          {
            userId: "02b",
            comId: "1",
            fullName: "Jane Smith",
            avatarUrl:
              "https://via.placeholder.com/150",
            text: "Hello! This is a comment.",
            replies: [],
          },
        ]}
      />
    </div>
  );
}

export default commend;
