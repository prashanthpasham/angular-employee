import { Directive, ElementRef, HostBinding, Renderer2 ,HostListener} from '@angular/core';

@Directive({
  selector: '[appHlight]'
})
export class HlightDirective {

  constructor(private el:ElementRef) { 
    //this.el.nativeElement.style.backgroundColor='yellow';
  }
  @HostBinding('style.border') border: string | undefined;

    /**@HostListener('click') onClick(){

      window.alert("Host Element Clicked");

    }**/

    @HostListener('mouseleave') onMouseLeave() {

      this.el.nativeElement.style.backgroundColor = 'white';

      //this.ChangeColor('red');

    }

    @HostListener('mouseover') onMouseOver() {

      this.el.nativeElement.style.backgroundColor = 'aquamarine';

      //this.border = '1px solid #eee';

      //this.ChangeColor('blue');

    }

}
