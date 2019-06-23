
export class Info {
    name?: string;
    auther?: string;
    id?: string
    image?: string;
    category?: string;
    description?: string;
    descriptionDetail?: Array<string>;
  
    constructor(name = '', image = '', auther = '', category = '', description = '') {
      this.name = name;
      this.auther = auther;
      this.image = image;
      this.category = category;
      this.description = description;
    }
}
