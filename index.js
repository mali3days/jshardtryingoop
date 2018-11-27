
let register = {};
let ID = 0;

const postData1 = {
  author: 'John',
  title: 'title',
  body: 'Lorem ipsum...',
};

const postData2 = {
  author: 'Brother Louie',
  title: 'Oh, shes only looking to me',
  body: 'Oh, let it Louie She is undercover',
};

class Component {
  constructor() {
    ID += 1;
    this.id = ID;
    register[this.id] = this;
  }
}

class BlogPost extends Component {
  constructor({ author, title, body }) {
    super();
    this.state = { author, title, body };
  }

  render() {
    const { author, title, body } = this.state;
    return `<div class="article">
                <h2 class="author"> ${author}</h2></br>
                <span class="title"> ${title}</span></br>
                <textarea class="article-body" onchange="register[${this.id}].changeBody(this)"> ${body}</textarea></br>
                <span class="id-article"> ${this.id}</span>
            </div>`;
  }

  changeBody(elem) {
    this.state.body = elem.body;
    elem.innerHTML = this.state.body;
  }
}


const post1 = new BlogPost(postData1);
const post2 = new BlogPost(postData2);

const outHTML = post1.render() + post2.render();

document.querySelector('body').innerHTML = outHTML;
