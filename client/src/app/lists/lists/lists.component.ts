import { Component } from "@angular/core";

@Component({
    selector: 'app-messages',
    templateUrl: 'lists.component.html'
})
export class ListsComponent {
    showSelected: boolean;

    constructor() {
        this.showSelected = false;
    }
    ShowForm() {
        if (this.showSelected === false) {
            this.showSelected = true;
        } else {
            this.showSelected = false;
        }
    }
}