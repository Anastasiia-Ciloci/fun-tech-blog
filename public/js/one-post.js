const newCommentHandler = async (event) => {
  event.preventDefault();
  // Grab values from form input
  const comment = document.getElementById("comment").value.trim();
  const postId = document.querySelector(".comment-form").attributes.id.value;
  // Makes Post request to add comment
  console.log(comment, postId);
  if (comment && postId) {
    const response = await fetch("/api/comments", {
      method: "POST",
      body: JSON.stringify({ comment, postId }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      // document.location.replace('/posts');
      document.location.replace(`/posts/${postId}`);
    } else {
      alert("Failed to comment.");
    }
  }
};

const deletePost = async (event) => {
  event.preventDefault();
  const form = document.querySelector(".comment-form");
  const formId = form.attributes.id.value;
  const postId = formId;
  // Makes Post request to add comment
  if (postId) {
    const response = await fetch("/api/posts", {
      method: "DELETE",
      body: JSON.stringify({ postId }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete.");
    }
  }
};

const displayForm = () => {
  document.querySelector(".update-card").classList.remove("hidden");
};

const updatePost = async (event) => {
  event.preventDefault();
  const postId = document.querySelector(".update-form").attributes.id.value;
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();
  if (postId && content) {
    const response = await fetch("/api/posts", {
      method: "PUT",
      body: JSON.stringify({ postId, title, content }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace(`/posts/${postId}`);
    } else {
      alert("Failed to update.");
    }
  }
};

// Adding Event Listeners
document
  .querySelector(".comment-form")
  .addEventListener("submit", newCommentHandler);
document.querySelector(".delete").addEventListener("click", deletePost);
document.querySelector(".display-form").addEventListener("click", displayForm);
document.querySelector(".update").addEventListener("click", updatePost);
