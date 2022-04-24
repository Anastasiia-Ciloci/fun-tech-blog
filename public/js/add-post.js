const newPostHandler = async (event) => {
  event.preventDefault();

  // Grab values from form input
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("post").value.trim();

  // Makes Post request to add post
  if (title && content) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ content, title }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create post.");
    }
  }
};

document.querySelector(".post-form").addEventListener("submit", newPostHandler);
