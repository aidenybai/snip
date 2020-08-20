import ShortUniqueId from 'short-unique-id';

class Hash {
  uid: ShortUniqueId;

  sequential: boolean;

  constructor(opts: Record<string, boolean> = {}) {
    this.uid = new ShortUniqueId();
    this.sequential = opts.sequential || false;
  }

  generate(length?: number): string {
    return this.sequential ? this.uid.seq() : this.uid(length || 4);
  }
}

export default Hash;
