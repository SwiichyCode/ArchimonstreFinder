export class Archimonstre {
  readonly id: number;
  readonly search: string | null;
  readonly order: string | null;

  constructor(id: number, search: string | null, order: string | null) {
    this.id = id;
    this.search = search;
    this.order = order;
  }
}
