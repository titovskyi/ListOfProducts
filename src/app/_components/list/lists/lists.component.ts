import { Component, OnInit } from '@angular/core';
import {List} from '../../../_models/list';
import {ListService} from '../../../_services/list.service';

@Component({
  selector: 'app-all-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class ListsComponent implements OnInit {
  public lists: List[] = [];

  constructor(
    private listService: ListService
  ) { }

  ngOnInit() {
    this.listService.getLists().subscribe((res: List[]) => {
      this.lists = res;
    });
  }

  public showList(id) {
    this.listService.getList(id).subscribe((res) => {
      console.log(res);
    });
  }

  public removeList(id) {
    this.listService.removeList(id).subscribe(() => {
      this.lists = [...this.lists.filter((list) => list.id !== id)];
    });
  }

}
