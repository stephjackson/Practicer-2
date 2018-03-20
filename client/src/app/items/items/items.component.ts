import { Component } from "@angular/core";

@Component({
    selector: 'app-messages',
    template: `
        <div class="row">
            <app-item-form></app-item-form>
        </div>
        <hr>
        <div class="row">
            <app-youritems></app-youritems>
        </div>
    `
})
export class ItemsComponent {

}