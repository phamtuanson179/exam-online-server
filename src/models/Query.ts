export class Query {
  value: string = "";
  operator: string = "";
  key: string = "";

  constructor(query: { key: string; operator: string; value: string }) {
    this.value = query.value;
    this.operator = query.operator;
    this.key = query.key;
  }
}
