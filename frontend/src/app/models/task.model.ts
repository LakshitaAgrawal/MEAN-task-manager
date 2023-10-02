export class Task {
    _id: string;
    _listId: string;
    title: string;
    completed: boolean;

    constructor() {
        this._id = '';
        this._listId = '';
        this.title = '';
        this.completed = false;
    }
}
