// evt improvements: show spinner before rendering / while data are being fetched.

class SfImage extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});
    this.wrapper = document.createElement('a');
    this.wrapper.setAttribute('class','sf-image');

    const style = document.createElement('style');
    style.textContent = `
            .sf-image {
              position: relative;
              text-decoration: none;
              display: inline-flex;
            }
            .info {
              background-color: rgba(0, 0, 0, 0.5);
              position: absolute;
              bottom: 0;
              padding: 10px;
              color: #fff;
              width: calc(100% - 20px);
            }
            .title {
              font-weight: bold;
              display: block;
            }
          `;

    shadow.appendChild(style);
    shadow.appendChild(this.wrapper);
  }
  render(){

    const href = this.getAttribute('href') || '#';
    const src = this.getAttribute('src') || '#';
    const title = this.getAttribute('title') || '';
    const text = this.getAttribute('text') || '';

    this.wrapper.setAttribute('href', href);
    this.wrapper.innerHTML = `
           <img src='${src}' alt='${title}' />
           <div class='info'>
              <span class='title'>${title}</span>
              <span class='text'>${text}</span>
           </div>
          `;

  }
}
customElements.define('sf-image', SfImage);