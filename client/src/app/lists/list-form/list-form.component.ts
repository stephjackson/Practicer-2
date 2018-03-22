import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router'
import { ListService } from "../list.service";
// import { List } from "../list.model";

@Component({
    selector: 'app-list-form',
    templateUrl: './list-form.component.html'
})
export class ListFormComponent implements OnInit {
  newList: any;

  constructor(private listService: ListService, private router: Router) {}

  onSubmit() {
    this.listService.createList(this.newList)
    this.router.navigate(['/lists'])
    location.reload()
  }

  ngOnInit() {
    this.newList = {
      listTitle: ''
    }
  }
}