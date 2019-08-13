import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";

const slides = [
    {
        img: "https://preview.ibb.co/jrsA6R/img12.jpg",
        previewUrl: "https://preview.ibb.co/jrsA6R/img12.jpg"
    },
    {
        img: "https://preview.ibb.co/kPE1D6/clouds.jpg",
        previewUrl: "https://preview.ibb.co/kPE1D6/clouds.jpg"
    },
    {
        img: "https://preview.ibb.co/mwsA6R/img7.jpg",
        previewUrl: "https://preview.ibb.co/mwsA6R/img7.jpg"
    },
    {
        img: "https://preview.ibb.co/kZGsLm/img8.jpg",
        previewUrl: "https://preview.ibb.co/kZGsLm/img8.jpg"
    }
];

@Component({
    selector: "app-welcome",
    templateUrl: "./welcome.component.html",
    styleUrls: ["./welcome.component.scss"],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent {
    slides = [
        { img: "http://placehold.it/350x150/000000" },
        // { img: "https://preview.ibb.co/jrsA6R/img12.jpg" },
        // { img: "https://preview.ibb.co/kPE1D6/clouds.jpg" },
        // { img: "http://placehold.it/350x150/666666" },
        // { img: "http://placehold.it/350x150/555555" },
        // { img: "http://placehold.it/350x150/444444" },
        {
            img: "https://preview.ibb.co/jrsA6R/img12.jpg",
            previewUrl: "https://preview.ibb.co/jrsA6R/img12.jpg"
        },
        {
            img: "https://preview.ibb.co/kPE1D6/clouds.jpg",
            previewUrl: "https://preview.ibb.co/kPE1D6/clouds.jpg"
        },
        {
            img: "https://preview.ibb.co/mwsA6R/img7.jpg",
            previewUrl: "https://preview.ibb.co/mwsA6R/img7.jpg"
        },
    ];
    slideConfig = {
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        infinite: true,
        enabled: true,
        // autoplay: true,
        draggable: true,
        arrows: true,
        autoplaySpeed: 3000,
        fade: true,
        // dotsClass: 'custom-slick-dots',
        responsive: [{ 
            breakpoint: 600,
            settings: {
                dots: false,
                arrows: false,
                autoplay: true,
                infinite: true,
                slidesToShow: 2,
                slidesToScroll: 2
            } 
        }]
    };

    addSlide() {
        this.slides.push({ img: "http://placehold.it/350x150/777777" });
    }

    removeSlide() {
        this.slides.length = this.slides.length - 1;
    }

    slickInit(e) {
        console.log("slick initialized");
    }

    breakpoint(e) {
        console.log("breakpoint");
    }

    afterChange(e) {
        console.log("afterChange");
    }

    beforeChange(e) {
        console.log("beforeChange");
    }
}
