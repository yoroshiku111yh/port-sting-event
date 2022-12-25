export default class PreviewImage {
    constructor() {
        this.main();
    }
    main () {
        let img = $('#js-image');

         $('.js-image-input').change((event) => {
          const [file] = event.target.files;

          console.log(file, URL.createObjectURL(file));
          if (file) {
            img.attr('src', URL.createObjectURL(file));
          }
        });
    }
}