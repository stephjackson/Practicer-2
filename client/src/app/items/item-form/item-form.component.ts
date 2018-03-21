import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router } from '@angular/router'
import { ItemService } from "../item.service";

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.css']
})
export class ItemFormComponent implements OnInit {
  newItem: any;

  constructor(private itemService: ItemService, private router: Router) {}

  onSubmit() {
    // Create
    this.itemService.createItem(this.newItem)
    location.reload()
  }

  ngOnInit() {
    this.newItem = {
      itemTitle: '',
      itemBpm: 0,
      itemTime: 0
    }
  }
}
