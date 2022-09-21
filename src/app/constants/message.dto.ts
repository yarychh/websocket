export class MessageDto {
  private _name!: string;
  private _message!: string;

  constructor(message: string, name: string) {
    this._message = message;
    this._name = name;
  }

  public get name(): string {
    return this._name;
  }

  public get message(): string {
    return this._message;
  }
}
