export class Collection<Value> {
  name: string;
  #store: Record<string, Value>;

  constructor(name: string) {
    this.name = name;
    this.#store = {};
  }

  get(key: string): Value | undefined {
    return this.#store[key];
  }

  getAll(): Value[] {
    return Object.values(this.#store);
  }

  put(key: string, value: Value): void {
    this.#store[key] = value;
  }

  update(key: string, value: Partial<Value>): void {
    this.#store[key] = { ...this.#store[key], ...value };
  }

  delete(key: string) {
    delete this.#store[key];
  }

  clear() {
    this.#store = {};
  }
}
