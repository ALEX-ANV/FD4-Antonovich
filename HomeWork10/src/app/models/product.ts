export class Product {
  public id: string;
  public title: string;
  public price: number;
  public description: string;
  public image: string;

  public Product(values: object = {}) {
    Object.assign(this, values);
  }
}
