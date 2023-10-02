import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/task.service';
import { Router } from '@angular/router';
import { List } from 'src/app/models/list.model';

@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
  }

  createList(title: string) {
    this.taskService.createList(title).subscribe(
      (list: any) => { // Change the type to 'List'
        console.log(list);
        // Now we navigate to /lists/list._id
        this.router.navigate(['/lists', list._id]);
      },
      (error) => {
        // Handle any errors here
        console.error('Error creating list:', error);
      }
    );
  }
}
