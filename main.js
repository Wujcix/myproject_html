/**
 * Created by Użytkownik on 2016-12-04.
 */

var images=["obrazy/moto2.jpg", "obrazy/moto3.jpg", "obrazy/new.jpg"];

function buildImage(url) {
    let $image = document.createElement('img');
    $image.setAttribute('src', url);
    return $image;
}

function createList(arr) {
    return arr.map(function (value, index) {
        let $listElement = document.createElement('li');
        let $smallImage = buildImage(arr[index]);
        $smallImage.setAttribute('class', 'img-small');
        $smallImage.setAttribute('data-index', index);
        $listElement.appendChild($smallImage);
        return $listElement;
    });
}
class Gallery {
    constructor(galleryEl) {
        this.$gallery = galleryEl;
        this.$area = document.querySelector('.big-photo');
        this.$areaImg = document.querySelector('.big-photo-img');
        this.$areaClose = document.querySelector('.big-photo-close');
        this.$arrowLeft = document.querySelector('.arrow-photos-left');
        this.$arrowRight = document.querySelector('.arrow-photos-right');
        this.$list = document.querySelector('ul');
        this._setupEvents()
        this._loadImages()
        console.log('GALLERY SET AND READY')
    }
    _setupEvents() {

        this.$gallery.addEventListener('click', this._onImgClick.bind(this));
        this.$areaClose.addEventListener('click', this._onAreaCloseClick.bind(this));
        this.$arrowRight.addEventListener('click', this._next.bind(this));
        this.$arrowLeft.addEventListener('click', this._previous.bind(this));
    }

    _loadImages(){
        createList(images).map((value) => {
            this.$list.appendChild(value);
        });
    }

    _onImgClick(evt) {
        let $clickedElement = evt.target;

        if ($clickedElement.tagName.toLowerCase() !== 'img') {
            return;
        }
        this.current = $clickedElement;
        let image = buildImage($clickedElement.src);

        this.$areaImg.innerHTML = ""
        this.$area.style.display = "block"
        this.$areaImg.appendChild(image);
    }

    _onAreaCloseClick(evt) {
        this.$area.style.display = 'none';
    }

    _next(evt){
        let index = this.current.getAttribute('data-index');
        if (index == images.length-1){
            index = -1
            console.log("jestem", images.length, index)
        }
        index++;
        console.log(this.current.getAttribute('data-index'), index);
        let src = images[index];
        let image = buildImage(src);

        image.setAttribute('data-index', index);
        this.current = image;
        console.log('src',image)

        this.$areaImg.innerHTML = ""
        this.$areaImg.appendChild(image);
    }

    _previous(evt){
        let index = this.current.getAttribute('data-index');
        console.log(index)

        if (index == 0){
            index = images.length
            console.log("jestem", images.length, index)
        }
        index--;
        console.log(this.current.getAttribute('data-index'), index);
        let src = images[index];
        let image = buildImage(src);

        image.setAttribute('data-index', index);
        this.current = image;
        console.log('src',image)

        this.$areaImg.innerHTML = ""
        this.$areaImg.appendChild(image);
    }

}

window.addEventListener('DOMContentLoaded', function(){
    let galleryElement = document.querySelector('#gallery');
    new Gallery(galleryElement);
});