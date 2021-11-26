import { csrfToken } from "@rails/ujs";
import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="insert-in-list"
export default class extends Controller {

  static targets = ['items', 'form']

  connect() {
    // console.log(this.element);
    // console.log(this.itemsTarget);
    // console.log(this.formTarget);
  }

  send(event) {
    event.preventDefault();

    const url = this.formTarget.action;
    fetch(url, {
      method: 'POST',
      headers: { 'Accept': 'application/json', 'X-CSRF-Token': csrfToken() },
      body: new FormData(this.formTarget)})
    .then(response => response.json())
    .then(data => {
      // console.log(data);
      if (data.inserted_item ) {
        this.itemsTarget.insertAdjacentHTML('beforeend', data.inserted_item);
      }
      this.formTarget.outerHTML = data.form;
    })
  }
}
