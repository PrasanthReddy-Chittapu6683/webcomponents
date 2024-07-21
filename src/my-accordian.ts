// import { createComponent } from "@lit/react";
import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { when } from "lit/directives/when.js";
// import React from "react";

@customElement("my-accordian")
export class MyAccordian extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      .accordion{
        width: 100%;
      }
      .title {
          background-color: var(--acl-primary-bg, #222);
          color: var(--acl-primary-color,#fff);
          padding: 0.8rem;
          border-top-left-radius: 1rem;
          border-top-right-radius: 1rem;
          display: flex;
          justify-content: space-between;
          align-items:center;
          transition: all 0.3s ease-in-out;
      }
      .title.closed{
         border-bottom-left-radius: 1rem;
         border-bottom-right-radius: 1rem;
      }

      .body{
          padding: 1rem;
          border:1px solid var(--acl-primary-bg, #222);
      }
    `
  ];

  @property({ type: String })
  title = "TITEL WIDGET";
  @property({ type: Boolean })
  isOpened = false;

  private onIconClickHandler(e: MouseEvent) {
    e.stopPropagation();
    this.dispatchEvent(new CustomEvent("icon-click", { bubbles: true }));
  }

  render() {
    return html`
      <div class="accordion">
        <div class=${classMap({
          title: true,
          closed: !this.isOpened
        })} @click=${() => (this.isOpened = !this.isOpened)}>
          ${this.title}
            <div class="icon" @click=${this.onIconClickHandler}>***</div>
        </div>
        ${when(
          this.isOpened,
          () => html` <div class="body"><slot></slot></div>`
        )}
       
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-accordian": MyAccordian;
  }
}

// export const MyAccordianReact = createComponent({
//   tagName: "my-accordian",
//   elementClass: MyAccordian,
//   react: React,
//   events: {
//     iconClick: "icon-click"
//   }
// });
