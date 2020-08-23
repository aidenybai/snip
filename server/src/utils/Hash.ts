import ShortUniqueId from 'short-unique-id';

class Hash {
  uid: ShortUniqueId;

  sequential: boolean;

  constructor(opts: Record<string, boolean> = {}) {
    this.uid = new ShortUniqueId();
    // Don't use sequential
    this.sequential = opts.sequential || false;
  }

  generate(length?: number): string {
    // Check if sequential option is provided, if not then default to uid gen
    return this.sequential ? this.uid.seq() : this.uid(length || 4);
  }
}

export default Hash;
