import { NgModule } from "@angular/core";
import { NgxTinymceModule, TinymceOptions } from "ngx-tinymce";

// tinymce configuration
const options: TinymceOptions = {
    config: {
        height: 250,
        theme: 'modern',
        language: 'es_ES',
        branding: false,
        // powerpaste advcode toc tinymcespellchecker a11ychecker mediaembed linkchecker help
        plugins: 'emoticons print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor wordcount contextmenu colorpicker textpattern',
        toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat | emoticons',
        image_advtab: true,
        imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
        content_css: [
            '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
            '//www.tinymce.com/css/codepen.min.css'
        ]
    }
}

@NgModule({
    declarations: [],
	imports: [NgxTinymceModule.forRoot(options)],
	exports: [NgxTinymceModule]
})
export class CustomTinymceModule {}
