import { DocumentSortField } from '../types/document-sort-field';
import { DocumentStatus } from '../types/document-status';
import { SortType } from '../types/sort-type';

export type DocumentSortParams = {
  page: number;
  pageSize: number;
  sortField: DocumentSortField;
  sortOrder: SortType;
  statuses?: DocumentStatus[];
};
