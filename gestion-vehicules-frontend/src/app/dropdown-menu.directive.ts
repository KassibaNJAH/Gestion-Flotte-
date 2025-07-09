import { Directive, HostListener, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdownMenu]'
})
export class DropdownMenuDirective {
  private isOpen = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click') toggleOpen(): void {
    const parentLi = this.el.nativeElement.parentElement;
    const subMenu = parentLi.querySelector('.sub-menu');
    const arrowIcon = this.el.nativeElement.querySelector('.arrow-icon mat-icon');
    
    if (this.isOpen) {
      this.renderer.removeClass(parentLi, 'open');
      this.renderer.setStyle(subMenu, 'max-height', '0');
      this.renderer.setProperty(arrowIcon, 'innerHTML', 'keyboard_arrow_down');
    } else {
      this.renderer.addClass(parentLi, 'open');
      this.renderer.setStyle(subMenu, 'max-height', '200px');
      this.renderer.setProperty(arrowIcon, 'innerHTML', 'keyboard_arrow_up');
    }
    
    this.isOpen = !this.isOpen;
  }
}