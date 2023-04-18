import {
  AfterViewInit,
  Component,
  Input,
  Renderer2,
  ViewChild,
  ViewContainerRef,
  Type
} from '@angular/core';

@Component({
  template: ` <ng-container #containerRef></ng-container>`,
  standalone: true
})
export class WrapperTestComponent<T> implements AfterViewInit {
  constructor(private renderer: Renderer2) {}

  @ViewChild('containerRef', { read: ViewContainerRef })
  containerRef!: ViewContainerRef;

  @Input() selectors: string[] = [];
  @Input() component: Type<T> | undefined;
  @Input() attributeSelectorName: string | undefined;

  ngAfterViewInit(): void {
    if (!this.attributeSelectorName) {
      throw new Error(
        'attributeSelectorName input is not defined it is like "slot" inside [slot="sample"]'
      );
    }

    if (!this.component) {
      throw new Error('component input is not defined');
    }

    if (this.selectors?.length === 0) {
      throw new Error('selectors input is not defined');
    }

    if (this.selectors && this.component) {
      const projectableNodes = this.selectors.map((content) => {
        const el = this.renderer.createElement('div');
        if (this.attributeSelectorName) {
          this.renderer.setAttribute(
            el,
            this.attributeSelectorName || '',
            content
          );
        }

        return [el];
      });

      this.containerRef.createComponent(this.component, {
        projectableNodes,
      });
    }
  }
}
