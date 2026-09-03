/**
 * Joins path segments cleanly without double slashes or missing slashes.
 */
export function joinPaths(
  ...segments: (string | number | undefined | null)[]
): string {
  return segments
    .filter((s) => s !== undefined && s !== null && s !== '')
    .map((s, i) => {
      const str = String(s);
      if (i === 0) {
        return str.replace(/\/+$/, '');
      }
      return str.replace(/^\/+|\/+$/g, '');
    })
    .filter(Boolean)
    .join('/');
}

/**
 * Generic URL & Query String Builder utility.
 * Automatically appends search parameters when provided and non-empty,
 * eliminating manual string interpolation and hardcoded query strings.
 */
export function buildUrl(
  basePath: string,
  params?: Record<string, string | number | boolean | undefined | null>,
): string {
  if (!params) return basePath;

  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

/**
 * Fluent URL Builder class for chaining parameters and path segments.
 */
export class UrlBuilder {
  private basePath: string;
  private pathSegments: (string | number)[] = [];
  private params: Record<string, string | number | boolean | undefined | null> = {};

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  public static create(basePath: string): UrlBuilder {
    return new UrlBuilder(basePath);
  }

  public appendPath(segment: string | number | undefined | null): this {
    if (segment !== undefined && segment !== null && segment !== '') {
      this.pathSegments.push(segment);
    }
    return this;
  }

  public setParam(
    key: string,
    value: string | number | boolean | undefined | null,
  ): this {
    if (value !== undefined && value !== null && value !== '') {
      this.params[key] = value;
    }
    return this;
  }

  public setParams(
    params?: Record<string, string | number | boolean | undefined | null>,
  ): this {
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        this.setParam(key, value);
      });
    }
    return this;
  }

  public build(): string {
    const fullPath = this.pathSegments.length > 0
      ? joinPaths(this.basePath, ...this.pathSegments)
      : this.basePath;
    return buildUrl(fullPath, this.params);
  }

  public toString(): string {
    return this.build();
  }
}
