{
  console.log("js linked to home");
  //   For creating a form request we need the one who send the data and the one who recive the data and display it there.

  //   Method to submit the form data for new post using AJAX
  let createPost = function () {
    let newPostForm = $("#new-post-form");

    // Here we are preventing the default way of submiting the form
    newPostForm.submit(function (e) {
      e.preventDefault();

      //   Now we will manually submit it by Ajax
      $.ajax({
        type: "post",
        url: "/posts/create-post",
        data: newPostForm.serialize(),
        success: function (data, status, xhr) {
          console.log(data);
          // new Noty({
          //   theme: "mint",
          //   text: "Post Created",
          //   type: "alert",
          //   layout: "topCenter",
          //   timeout: 1500,
          // }).show();
          let newPost = newPostDom(data.data.post, data.data.user_name);
          $("#Post-list-container>ul").prepend(newPost);
          // console.log(deletePost($(" .delete-post-button", newPost)));
          deletePost($(" .delete-post-button", newPost));

          // call the create comment class
          new postComments(data.data.post._id);
          notyNotification("Post Created");
        },
        error: function (error) {
          console.log(error.responseText);
          notyNotification(error.responseText);
        },
      });
    });
  };

  //   Method to create a post in DOM
  let newPostDom = function (post, user_name) {
    return $(`<li id="post-${post._id}">
    <div class="post-top">
      <div class="container-profile-name">
        <div class="profile-photo">
          <img src="/images/Arrow.jpg" alt="" />
        </div>
        <div class="name-container">
          <h4>${user_name}</h4>
        </div>
      </div>
      <div class="dropdown">
        <a class="delete-post-button" href="/posts/delete-post/${post._id}"
          ><i class="fa-solid fa-trash-can"></i
        ></a>
      </div>
    </div>
    <!-- common image showing in post -->
    <div class="image-container">
      <img src="/images/Arrow.jpg" alt="common image" />
    </div>
    <!-- Image footer -->
    <div class="other-link-container">
      <div class="like-comment-share-container">
        <a href="" class="like-logo"><i class="fa-regular fa-heart"></i></a>
        <a href="" class="comment-logo"><i class="fa-regular fa-comment"></i></a>
        <a href="" class="share-logo"
          ><i class="fa-regular fa-paper-plane"></i
        ></a>
      </div>
      <div class="bookmark-container">
        <a href="" class="bookmarklogo"><i class="fa-regular fa-bookmark"></i></a>
      </div>
    </div>
    <!-- Post content Container -->
    <div class="post-content-container">
      <span class="userName">${user_name}</span>
      <span class="content">${post.content}</span>
    </div>
    <!-- Post comment container............................................ -->
    <div class="post-comments">
     
      <form action="/comments/create-comment"
      method="post"
      id="post-<%= post._id%>-comment-form"
      class="comment-form">
        <input
          type="text"
          name="content"
          placeholder="Write your comment here....."
          class="input-form"
          required
        />
        <input type="hidden" name="post" value="${post._id}" />
        <button type="submit">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </form>
      
      <div class="post-comment-list">
        <ul class="post-comment-${post._id}">
        </ul>
      </div>
    </div>
  </li>
  `);
  };

  // Method to delete the post from DOM
  let deletePost = function (deleteLink) {
    $(deleteLink).click(function (e) {
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"), //this is how we get the the value of href in a tag
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
          notyNotification("Post Deleted");
        },
        error: function (error) {
          console.log(error.responseText);
          notyNotification(error.responseText);
        },
      });
    });
  };

  // Method for creating showing Noty Notification
  let notyNotification = function (textMessage) {
    new Noty({
      theme: "relax",
      text: textMessage,
      type: "alert",
      layout: "topCenter",
      timeout: 1500,
    }).show();
  };

  // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
  let convertingAllDeleteButton = function () {
    $("#Post-list-container>ul>li").each(function () {
      let self = $(this);
      // console.log(self);
      let deleteButton = $(" .delete-post-button", self);
      // console.log(deleteButton);
      deletePost(deleteButton);
      // get the post's id by splitting the id attribute
      let postId = self.prop("id").split("-")[1];
      console.log(postId);
      new postComments(postId);
    });
  };
  createPost();
  convertingAllDeleteButton();
}
