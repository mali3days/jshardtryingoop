let register = {};
let id = 0;

class Component {
  constructor() {
    this.id = id++;
    register[this.id] = this;
  }

}

let postDate = {
  autor: "SomeAutor",
  title: "title",
  body: "Lorem ..."
};

let postDateWitcher = {
  autor: "Andrzej Sapkowski",
  title: "The Witcher",
  body: "he Witcher, by Polish writer Andrzej Sapkowski, is a fantasy series of..."
}; 



class Post extends Component {
  constructor({ autor, title, body }) {
    super();
    this.state = { 
      autor,
      title,
      body
    }
  }

  render() {
    return `<div data-id="${this.id}">
              <h2>${this.state.autor}</h2>
              <h3>${this.state.title}</h3>
              <textarea onchange="register[${this.id}].update(this.value)">${this.state.body}</textarea>
              <span>id-${this.id}</span>
            </div>`;
  }
  
  update(value) {
    this.state.body = value;
    document.querySelector("body").innerHTML = blogPost.render() + blogPostWitcher.render();
  }

}

let blogPost = new Post(postDate);
let blogPostWitcher = new Post(postDateWitcher);

document.querySelector("body").innerHTML = blogPost.render() + blogPostWitcher.render();
