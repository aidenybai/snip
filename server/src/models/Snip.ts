import mongoose, { Schema } from 'mongoose';
import ms from 'ms';

class Snip {
  ttl: number;

  expire: string;

  constructor(ttl?) {
    this.ttl = Date.now() + ms(ttl || '7 days');
    this.expire = new Date(this.ttl).toISOString();
  }

  schema(): Schema<unknown> {
    const SnipSchema = new mongoose.Schema(
      {
        id: { type: String, required: true },
        url: { type: String, required: true },
        expireAt: {
          type: Date,
          default: this.expire,
        },
      },
      { timestamps: true },
    );

    return SnipSchema;
  }
}

const snip = new Snip();

export default mongoose.model('Snip', snip.schema());
