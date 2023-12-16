// Let's implement this via classes

// this class would be initialized for every post on the page
// 1. When the page loads
// 2. Creation of every post dynamically via AJAX
// console.log("Document is connected");
class postComments {
  // constructor is used to initialize the instance of the class whenever a new instance is created
  constructor(postId) {
    // We will get this postId when we are calling it in home post layout

    // Using the element using that postId
    this.postId = postId;
    this.postContainer = $(`#post-${postId}`);
    this.newCommentForm = $(`#post-${postId}-comment-form`);
    // Calling the createComment constructor function
    this.createComment(postId);

    let self = this;

    // call for all the existing comments
    $(" .delete-comment-button", this.postContainer).each(function () {
      self.deleteComment($(this));
    });
  }
  //   console.log("Connected to home post layout");
  createComment(postId) {
    let pSelf = this; //pSelf will have post along with it detaile
    console.log("This is my pSelf : ", pSelf);
    this.newCommentForm.submit(function (e) {
      e.preventDefault();
      // console.log("Hii the code is working fine");
      let self = this; // self will contain that particular comment form in that pSelf post
      console.log("This is my Self : ", self);

      //   Now we will submit comment form manually using ajax
      $.ajax({
        type: "POST",
        url: "/comments/create-comment",
        data: $(self).serialize(),
        success: function (data) {
          console.log(data);
          let newComment = pSelf.newCommentDom(
            data.data.comment,
            data.data.user_name
          );
          $(`#post-comment-${postId}`).prepend(newComment);
          pSelf.deleteComment($(" .delete-comment-button", newComment));

          // CHANGE :: enable the functionality of the toggle like button on the new comment
          new ToggleLike($(" .toggle-like-button", newComment));

          pSelf.notyNotification("Comment Created");
        },
        error: function (error) {
          console.log(error.responseText);
          pSelf.notyNotification(error.responseText);
        },
      });
    });
  }
  //  Method to create comment DOM
  newCommentDom(comment, user_name) {
    return $(`<li id="comment-${comment._id}">
    <div class="comments-container">
      <div class="username-comment-image">
        <img src="/images/common.jpg" alt="" />
        <span class="user-name">${user_name}</span>
        <span class="post-particular-comment">${comment.content}</span>
      </div>
      <div class="deleteComment">
        <a
          class="delete-comment-button"
          href="/comments/delete-comment/${comment._id}"
          ><i class="fa-solid fa-trash-can"></i
        ></a>
      </div>
    </div>
    <div class="likeContainer">
    <a
      class="toggle-like-button"
      data-likes="0"
      href="/likes/toggle/?id=${comment._id}&type=Comment"
    >
      <i class="fa-regular fa-heart"></i> 0
    </a>
  </div>
  </li>
  
    `);
  }

  deleteComment(deleteLink) {
    console.log(deleteLink);
    $(deleteLink).click(function (e) {
      // let pSelf = this;
      e.preventDefault();

      $.ajax({
        type: "get",
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#comment-${data.data.comment_id}`).remove();
          // pSelf.notyNotification("Comment Deleted");
          new Noty({
            theme: "relax",
            text: "Comment Deleted",
            type: "alert",
            layout: "topCenter",
            timeout: 1500,
          }).show();
        },
        error: function (error) {
          console.log(error.responseText);
          pSelf.notyNotification(error.responseText);
        },
      });
    });
  }

  // Method for creating showing Noty Notification
  notyNotification(textMessage) {
    new Noty({
      theme: "relax",
      text: textMessage,
      type: "alert",
      layout: "topCenter",
      timeout: 1500,
    }).show();
  }
}
