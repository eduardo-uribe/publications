let comment_system = document.querySelector('#comment-system');

comment_system.addEventListener('submit', async function (event) {
  event.preventDefault();

  let parent = event.target.parentElement;
  let ul = parent.querySelector('ul');

  // comment system thread id
  let comment_thread_id = document
    .getElementById('comment-system')
    .getAttribute('data-thread-id');

  // parent comment id
  let comment_parent_id = null;
  if (parent.matches('li')) {
    let comment_parent = parent.querySelector('article');
    comment_parent_id = comment_parent.getAttribute('data-comment-id');
  }

  // new comment data
  let formdata = new FormData(event.target);
  let comment = {
    comment_author: formdata.get('author'),
    comment_parent_id,
    comment_thread_id,
    comment_content: formdata.get('comment'),
  };

  // create comment element
  let comment_html = create_comment(comment);

  ul.prepend(comment_html);

  // send a post fetch request
  let request = new Request('http://127.0.0.1:3000/api/v1/comment', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });

  await fetch(request);

  if (event.target.matches('.comment-system-form')) {
    // reset form fields
    return event.target.reset();
  } else {
    // re-enable comment reply button
    let button = event.target
      .closest('li')
      .querySelector('.comment-reply-button');
    button.removeAttribute('disabled');

    // remove form
    event.target.remove();
  }
});

comment_system.addEventListener('click', async function (event) {
  if (event.target.matches('.comment-reply-button')) {
    // parent element
    let parent = event.target.parentElement;

    // create a reply form
    let form = create_reply_form();
    let textarea = form.querySelector('textarea');

    // display reply form
    parent.after(form);

    // disable reply button
    event.target.setAttribute('disabled', 'true');

    // set focus on form text area
    textarea.focus();
  }

  if (event.target.matches('.comment-reply-form-cancel-button')) {
    // re-enable comment reply button
    let button = event.target
      .closest('li')
      .querySelector('.comment-reply-button');
    button.removeAttribute('disabled');

    // remove reply form
    let form = event.target.parentElement;
    form.remove();
  }
});

function create_reply_form() {
  let form = document.createElement('form');
  form.setAttribute('class', 'comment-reply-form');

  let input = document.createElement('input');
  input.setAttribute('type', 'text');
  input.setAttribute('id', 'author');
  input.setAttribute('name', 'author');
  input.setAttribute('value', 'Internet stranger');
  input.setAttribute('class', 'comment-system-form-author');

  let label = document.createElement('label');
  label.setAttribute('for', 'author');
  label.setAttribute('class', 'comment-system-form-label');
  label.textContent = 'Author: ';

  let textarea = document.createElement('textarea');
  textarea.setAttribute('name', 'comment');
  textarea.setAttribute('required', 'true');

  let submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';

  let cancelButton = document.createElement('button');
  cancelButton.setAttribute('class', 'comment-reply-form-cancel-button');
  cancelButton.setAttribute('type', 'button');
  cancelButton.textContent = 'Cancel';

  form.append(label, input, textarea, submitButton, cancelButton);

  return form;
}

function create_comment({ comment_author, comment_content }) {
  let li = document.createElement('li');

  let article = document.createElement('article');
  article.setAttribute('class', 'comment');

  let div = document.createElement('div');
  div.setAttribute('class', 'comment-header');

  let author = document.createElement('p');
  author.setAttribute('class', 'comment-author');
  author.textContent = comment_author;

  let span = document.createElement('span');
  span.setAttribute('class', 'comment-bullet');
  span.innerHTML = '&#8226;';

  let datetime = document.createElement('time');
  datetime.setAttribute('class', 'comment-datetime');
  datenow = new Date();
  datetime.textContent = datenow.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  let content = document.createElement('p');
  content.setAttribute('class', 'comment-content');
  content.textContent = comment_content;

  let button = document.createElement('button');
  button.setAttribute('class', 'comment-reply-button');
  button.textContent = 'Reply';

  let ul = document.createElement('ul');
  ul.setAttribute('class', 'comment-system-thread');

  div.append(author, span, datetime);
  article.append(div, content, button);
  li.append(article, ul);

  return li;
}
