import { NextRequest } from 'next/server';
import { DataSource } from '@/types/dataSource';
import {
  SOURCE_QUERY_PARAM,
  DEFAULT_DATA_SOURCE,
} from '@/constants/dataSource';

/**
 * Pure utility to resolve and validate the DataSource from the request URL.
 * Strictly reads from the URL query parameter (e.g. ?source=local or ?source=mongodb).
 * Defaults cleanly to DEFAULT_DATA_SOURCE if missing or invalid.
 */
export function resolveDataSource(request: Request | NextRequest): DataSource {
  const url = new URL(request.url);
  const source = url.searchParams.get(SOURCE_QUERY_PARAM) as DataSource;

  if (source && Object.values(DataSource).includes(source)) {
    return source;
  }

  return DEFAULT_DATA_SOURCE;
}

export default resolveDataSource;
