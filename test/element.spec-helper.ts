import {Type} from "@angular/core";
import {By} from '@angular/platform-browser';
import {ComponentFixture} from '@angular/core/testing';

import {WrapperTestComponent} from './wrapper-test-component';

declare const expect: any;

export function findEl<T>(fixture: ComponentFixture<T>, testId: string) {
  return fixture.debugElement.query(By.css(getSelector(testId)));
}

export function expectNgContent<T>(fixture: ComponentFixture<T>, selector: string) {
  expect(fixture.debugElement.query(By.css(selector))).toBeTruthy();
}

export function expectLayoutContent<T>(
  fixture: ComponentFixture<WrapperTestComponent<T>>,
  selector: string
) {
  expectNgContent(fixture, `[${fixture.componentInstance.attributeSelectorName}='${selector}']`);
}

export function findEls<T>(fixture: ComponentFixture<T>, testId: string) {
  return fixture.debugElement.queryAll(By.css(testId));
}

export function findElsByTestID<T>(fixture: ComponentFixture<T>, testId: string) {
  return fixture.debugElement.queryAll(By.css(getSelector(testId)));
}

export function expectContent<T>(fixture: ComponentFixture<T>, testId: string, value: string) {
  expect(findEl(fixture, testId).nativeElement.textContent?.trim()).toBe(value);
}

export function dispatchFakeEvent(element: EventTarget, type: string, bubbles: boolean = false) {
  const event = new Event(type, {bubbles});

  element.dispatchEvent(event);
}

export function setFiledValue<T>(fixture: ComponentFixture<T>, testId: string, value: string) {
  setFieldElementValue(findEl(fixture, testId).nativeElement, value);
}

export function setFieldElementValue(
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  value: string
): void {
  element.value = value;
  const isSelect = element instanceof HTMLSelectElement;
  dispatchFakeEvent(element, isSelect ? 'change' : 'input', !isSelect);
}

export function expectContainedText<T>(fixture: ComponentFixture<T>, testId: string, text: string): void {
  expect(findEl(fixture, testId).nativeElement.textContent).toContain(text);
}

export function getSelector(testId: string): string {
  return `[data-testid='${testId}']`;
}

export function setInput<T>(fixture: ComponentFixture<T>, prop: keyof T, value: T[keyof T]): Promise<any> {
  fixture.componentRef.setInput(prop.toString(), value);
  fixture.detectChanges();
  return fixture.whenStable();
}

export function findComponent<T, C, componentType = C extends string ? string : Type<C>>(
  fixture: ComponentFixture<T>,
  component: componentType
) {
  if (typeof component === 'string') {
    return fixture.debugElement.query(By.css(getSelector(component)));
  } else {
    return fixture.debugElement.query(By.directive(<Type<C>>component));
  }
}
