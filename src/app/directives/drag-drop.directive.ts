import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[salarySlipAppDragDrop]',
  host: {
    '[style.background-color]': 'background',
    '[style.opacity]': 'opacity',
    '[style.cursor]': 'cursor',
    '(mouseover)': 'onMouseOver($event)',
    '(mouseout)': 'onMouseOut($event)',
    '(dragover)': 'onDragOver($event)',
    '(dragleave)': 'onDragLeave($event)',
    '(drop)': 'ondrop($event)'
  }
})
export class DragDropDirective {
  @Output() onFileDropped = new EventEmitter<any>();

  background = '#ffffff';
  opacity = '1';
  cursor = 'pointer';

  public onMouseOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8';
  }

  public onMouseOut(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#ffffff';
    this.opacity = '1';
  }

  public onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8';
  }

  public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
  }

  public ondrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
    const files = evt.dataTransfer.files;
    this.onFileDropped.emit(files);
  }
}
