export type LinkRecord = {
  code: string;
  destinationUrl: string;
  createdAt: Date;
  clickCount: number;
};

export type LinkMetadata = {
  code: string;
  url: string;
  createdAt: string;
  clickCount: number;
};

export type CreateLinkResult =
  | { kind: "created"; value: LinkMetadata }
  | { kind: "collision_exhausted" };

export class LinkService {
  private readonly links = new Map<string, LinkRecord>();

  public constructor(
    private readonly generateCode: () => string,
    private readonly now: () => Date = () => new Date(),
  ) {}

  public create(destinationUrl: URL): CreateLinkResult {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      const code = this.generateCode();

      if (this.links.has(code)) {
        continue;
      }

      const record: LinkRecord = {
        code,
        destinationUrl: destinationUrl.toString(),
        createdAt: this.now(),
        clickCount: 0,
      };

      this.links.set(code, record);
      return { kind: "created", value: this.toMetadata(record) };
    }

    return { kind: "collision_exhausted" };
  }

  public resolveAndCount(code: string): LinkRecord | undefined {
    const record = this.links.get(code);

    if (!record) {
      return undefined;
    }

    record.clickCount += 1;
    return record;
  }

  public getMetadata(code: string): LinkMetadata | undefined {
    const record = this.links.get(code);
    return record ? this.toMetadata(record) : undefined;
  }

  private toMetadata(record: LinkRecord): LinkMetadata {
    return {
      code: record.code,
      url: record.destinationUrl,
      createdAt: record.createdAt.toISOString(),
      clickCount: record.clickCount,
    };
  }
}
