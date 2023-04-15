
export class DataModel {
  id: string;
  int: number;
  float: number;
  color: string;
  child: ChildData;

  constructor(
    id: string,
    int: number,
    float: number,
    color: string,
    child: ChildData
  ) {
    this.id = id;
    this.int = int;
    this.float = parseFloat(float.toFixed(18));
    this.color = color;
    this.child = child;
  }
}

class ChildData {
  id: string;
  color: string;

  constructor(id: string, color: string) {
    this.id = id;
    this.color = color;
  }
}
