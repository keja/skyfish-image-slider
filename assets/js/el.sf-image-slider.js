class SfImageSlider extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({mode: 'open'});
    this.wrapper = document.createElement('div');
    this.container = document.createElement('div');
    this.controls = document.createElement('div');

    let imgHeight = 314; //update this when the first image is loaded, or get size from API.
    let btnSize = 38;
    this.wrapper.setAttribute('class','sf-image-slider');

    const style = document.createElement('style');
    style.textContent = `
            @media (max-width: 600px) {
              .sf-image-slider > div {
                justify-content: space-evenly !important; 
              }
            }

            .sf-image-slider {
                position: relative;
            }
            .sf-image-slider > div {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              overflow: hidden;
              max-height: ${imgHeight}px;
            }
            button {
              position: absolute;
              top: calc(50% - ${btnSize / 2}px);
              border: 0;
              border-radius: 50%;
              background-color: #fff;
              width: ${btnSize}px;
              height: ${btnSize}px;
              font-size: 0;
              filter: drop-shadow(0px 4px 4px #c0c0c0);
              cursor: pointer;
              outline: 0;
              background-repeat: no-repeat;
              background-size: 42%;
              background-position: center;
            }
            .btn-prev {
              left: -${btnSize / 2}px;
              background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="fill: %23c0c0c0;"><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"/></svg>');
            }
            .btn-next {
              right: -${btnSize / 2}px;
              background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="fill: %23c0c0c0;"><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"/></svg>');
            }
            /* CC: icons/svgs [fontawesome.io] */
          `;




    // BTN: PREV
    const btnPrev = document.createElement('button');
    btnPrev.addEventListener('click', e => {
      const imgs = this.orderArray(this.container.querySelectorAll('sf-image'));

      for(let index = 0; index < imgs.length; index++){
        const img = imgs[index];
        if(img){
          if(index === 0){ // put first image as last image
            img.style.order = imgs.length;
          }else{ // move rest of the images
            img.style.order = index;
          }
        }
      }
    });
    btnPrev.textContent = 'Prev';
    btnPrev.classList.add('btn-prev');
    this.controls.appendChild(btnPrev);

    // BTN: NEXT
    const btnNext = document.createElement('button');
    btnNext.addEventListener('click', e => {
      const imgs = this.orderArray(this.container.querySelectorAll('sf-image'));

      for(let index = imgs.length; index >= 0; index--){
        const img = imgs[index];
        if(img){
            if(index === imgs.length -1){ //move last image to first position.
              img.style.order = 0;
            }else{ // move rest of the images
              img.style.order = index +1;
            }
        }
      }

    });
    btnNext.textContent = 'Next';
    btnNext.classList.add('btn-next');
    this.controls.appendChild(btnNext);



    shadow.appendChild(style);
    this.wrapper.appendChild(this.container);
    this.wrapper.appendChild(this.controls);
    shadow.appendChild(this.wrapper);

  }
  connectedCallback() {
    this.render();
  }

  render(){

    const folder = this.getAttribute('folder');
    API.getImagesFromFolder(folder)
       .then(images => {
         for(let img of images){

           const image = document.createElement('sf-image');
           image.setAttribute('src', img.src);
           image.setAttribute('href', img.href);
           image.setAttribute('title', img.title);
           image.setAttribute('text', img.text);
           image.render();

           this.container.appendChild(image);
         }
       })
      .catch( err => console.error(err) );
      // evt improvements: show error toast.

  }
  //sorts the array based on elements 'order' style value
  orderArray(elements){
    // credits to: https://stackoverflow.com/a/30881362/3774580
    const mergeSort = arr => {
      const m = Math.floor(arr.length / 2);
      if(m){
        const arr2 = mergeSort(arr.splice(m)),
              arr1 = mergeSort(arr.splice(0));

        while(arr1.length && arr2.length){
          arr.push((arr1[0][1] > arr2[0][1] ? arr2 : arr1).shift());
        }

        return arr.concat(arr1, arr2);
      }
      return arr;
    };

    return mergeSort([].map.call(elements, child => [child, +getComputedStyle(child).order] ))
                       .map(pair => pair[0]);

  }
}

customElements.define('sf-image-slider', SfImageSlider);