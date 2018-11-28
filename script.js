const register = {};
let id = 0;

class Component {
  constructor() {
    this.id = id++;
    register[this.id] = this;
  }
}

const postDate = {
  author: "Some Date",
  title: "title",
  body: "Loren....."
};
const postDate2 = {
  author: "Vasya",
  title: "title2",
  body: "Loren Ipsum....."
};
// function BlogPost(data) {
//   return `<div class="post">
//             <div class="author">${data.author}</div>
//             <div class="title">${data.title}</div>
//             <div class="body">${data.body}</div>
//           </div>`;
// }
// document.querySelector("body").innerHTML = BlogPost(postDate);

class BlogPost extends Component {
  constructor({ author, title, body }) {
    super();
    this.state = {
      author,
      title,
      body
    };
  }

  render() {
    const { author, title, body } = this.state;
    return `<div class="post">          
                <div class="author">${author}</div>
                <div class="title">${title}</div>
                <textarea class="body-txt" onchange='register[${
                  this.id
                }].updateBody(this.value)'>${body}</textarea>
                <div class="id">${"id >" + " " + this.id}</div>
            </div>`;
  }

  updateBody(value) {
    this.state.body = value;
    console.log(register);
  }
}
let post = new BlogPost(postDate);
document.querySelector("body").innerHTML = post.render();

let post2 = new BlogPost(postDate2);
document.querySelector("body").innerHTML += `</br> ${post2.render()}`;
console.log(register);
