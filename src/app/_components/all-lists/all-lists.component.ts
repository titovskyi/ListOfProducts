import { Component, OnInit } from '@angular/core';
import {List} from '../../_models/list';
import {ListService} from '../../_services/list.service';

@Component({
  selector: 'app-all-lists',
  templateUrl: './all-lists.component.html',
  styleUrls: ['./all-lists.component.scss']
})
export class AllListsComponent implements OnInit {
  private lists: List[] = [];

  constructor(
    private listService: ListService
  ) { }

  ngOnInit() {
    this.listService.getLists().subscribe((res: List[]) => {
      this.lists = res;
    });
  }

}
