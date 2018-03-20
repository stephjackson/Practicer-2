import { Component } from "@angular/core";

@Component({
    selector: 'app-messages',
    template: `
        <div class="row">
            <app-list-form></app-list-form>
        </div>
        <hr>
        <div class="row">
            <app-yourlists></app-yourlists>
        </div>
    `
})
export class ListsComponent {

}