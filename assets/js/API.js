const API = {

  // can be rewrote to fetch and serve images from CDN and apply caching etc..
  // right now it is just a dummy layer.
  getImagesFromFolder(folder){

    console.log('API request folder:', folder);

    return new Promise((resolve, reject) => {

      const images = new Set();
      images.add({
        'src': 'assets/images/gallery/image_s1.jpg',
        'href': '#',
        'title': 'Love',
        'text': '100+ inspirational images'
      });
      images.add({
        'src': 'assets/images/gallery/image_s2.jpg',
        'href': '#',
        'title': 'Spring Flowers',
        'text': '100+ inspirational images'
      });
      images.add({
        'src': 'assets/images/gallery/image_s3.jpg',
        'href': '#',
        'title': 'Delicious Food',
        'text': '100+ inspirational images'
      });
      images.add({
        'src': 'assets/images/gallery/image_s4.jpg',
        'href': '#',
        'title': 'Valentines Cards',
        'text': '100+ inspirational images'
      });
      images.add({
        'src': 'assets/images/gallery/image_s5.jpg',
        'href': '#',
        'title': 'Creative Office',
        'text': '100+ inspirational images'
      });

      console.log('API resolve dummy content:');
      console.table(Array.from(images));
      resolve(images);

    })
  }

};