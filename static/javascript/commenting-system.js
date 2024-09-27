class CommentingSystem extends HTMLElement {
  constructor() {
    super();

    this.addEventListener('submit', async function (event) {
      try {
        event.preventDefault();

        // parent element: <li>
        let parent = event.target.parentElement;
        let ul = parent.querySelector('ul');

        // new comment form data
        let form_data = new FormData(event.target);

        let new_comment_data = {
          comment_author: form_data.get('author'),
          comment_content: form_data.get('comment'),
          comment_parent_id: event.target.getAttribute(
            'data-parent-comment-id'
          ),
          comment_thread_id: Number(
            this.getAttribute('data-commenting-system-thread-id')
          ),
        };

        // create comment element template
        let new_comment_html = this.create_new_comment_html(new_comment_data);

        ul.prepend(new_comment_html);

        if (event.target.matches('commenting-system section > form')) {
          // reset form fields
          event.target.reset();
        } else {
          // re-enable comment reply button
          let button = event.target
            .closest('li')
            .querySelector('[data-reply-button]');

          button.removeAttribute('disabled');

          // remove form
          event.target.remove();
        }

        let endpoint = 'https://commentingsystem.com/api/v1/comment';

        let headers = new Headers();
        let public_api_key = this.getAttribute(
          'data-commenting-system-public-api-key'
        );
        headers.append('x-api-key', public_api_key);
        headers.append('Content-Type', 'application/json');

        let request = new Request(endpoint, {
          method: 'POST',
          headers,
          body: JSON.stringify(new_comment_data),
        });

        await fetch(request);
      } catch (error) {
        console.log(error);
      }
    });

    this.addEventListener('click', async function (event) {
      if (event.target.matches('[data-reply-button]')) {
        // parent element: <article>
        let parent = event.target.parentElement;
        let parent_comment_id = parent.getAttribute('data-comment-id');

        // create a reply form
        let form = this.create_reply_form();
        form.setAttribute('data-parent-comment-id', parent_comment_id);
        let textarea = form.querySelector('textarea');

        // display reply form
        parent.after(form);

        // disable reply button
        event.target.setAttribute('disabled', 'true');

        // set focus on form text area
        textarea.focus();
      }

      if (event.target.matches('[data-cancel-button]')) {
        // re-enable comment reply button
        let button = event.target
          .closest('li')
          .querySelector('[data-reply-button]');

        button.removeAttribute('disabled');

        // remove reply form
        let form = event.target.parentElement;

        form.remove();
      }
    });
  }

  /**
   * Create the reply form html structure
   * @returns
   */
  create_reply_form() {
    let form = document.createElement('form');

    let input_label = document.createElement('label');
    input_label.setAttribute('for', 'author');
    input_label.textContent = 'Author';

    let input = document.createElement('input');
    input.setAttribute('name', 'author');
    input.setAttribute('id', 'author');
    input.setAttribute('value', 'Internet stranger');

    let textarea_label = document.createElement('label');
    textarea_label.setAttribute('for', 'comment');
    textarea_label.textContent = 'Comment';

    let textarea = document.createElement('textarea');
    textarea.setAttribute('name', 'comment');
    textarea.setAttribute('id', 'comment');
    textarea.setAttribute('required', 'true');

    let submit_button = document.createElement('button');
    submit_button.textContent = 'Submit';

    let cancel_button = document.createElement('button');
    cancel_button.setAttribute('data-cancel-button', '');
    cancel_button.setAttribute('type', 'button');
    cancel_button.textContent = 'Cancel';

    form.append(
      input_label,
      input,
      textarea_label,
      textarea,
      submit_button,
      cancel_button
    );

    return form;
  }

  /**
   * Submit a fetch request to create a new comment
   * @param {*} param0
   * @returns
   */
  create_new_comment_html({ comment_author, comment_content }) {
    let li = document.createElement('li');

    let article = document.createElement('article');

    let div = document.createElement('div');

    let author = document.createElement('p');
    author.textContent = comment_author;

    let datetime = document.createElement('time');
    datetime.textContent = Date.now();

    let content = document.createElement('p');
    content.textContent = comment_content;

    let button = document.createElement('button');
    button.setAttribute('data-reply-button', '');
    button.textContent = 'Reply';

    let ul = document.createElement('ul');

    div.append(author, datetime);

    article.append(div, content, button);

    li.append(article, ul);

    return li;
  }
}

customElements.define('commenting-system', CommentingSystem);
