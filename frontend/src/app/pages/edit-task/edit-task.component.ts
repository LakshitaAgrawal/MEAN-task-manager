import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent implements OnInit {

  taskId!: string; // Use the ! operator to indicate it will be assigned later
  listId!: string; // Use the ! operator to indicate it will be assigned later

  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }
  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.taskId = params['taskId']; // Access 'taskId' using square brackets
        this.listId = params['listId']; // Access 'listId' using square brackets
      }
    );
  }

  updateTask(title: string) {
    this.taskService.updateTask(this.listId, this.taskId, title).subscribe(() => {
      this.router.navigate(['/lists', this.listId]);
    });
  }
}
