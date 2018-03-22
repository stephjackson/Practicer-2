//Unused, stuck with a simpler implementation for server communication.
export class List {
  title: string;
  listId?: string;
  userId?: string;

  constructor(title: string, listId?: string, userId?: string) {
      this.title = title;
      this.listId = listId;
      this.userId = userId;
  }
}