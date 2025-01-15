import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { Document } from '@/types/document';
import { SortType } from '@/types/sort-type';
import { DocumentSortField } from '@/types/document-sort-field';
import { useReducer } from 'react';
import { DocumentStatus } from '@/types/document-status';

export type DocumentsParams = {
  page?: number;
  pageSize?: number;
  sortField?: DocumentSortField;
  sortOrder?: SortType;
  statuses?: DocumentStatus[];
};

export type ResponseAllDocuments = {
  documents: Document[];
  total: number;
};

export const fetchAllDocuments = async (params: DocumentsParams) => {
  const response = await axios.get<ResponseAllDocuments>(
    '/api/document/getAll',
    {
      params
    }
  );
  return response.data;
};

export const useGetAllDocuments = (params: DocumentsParams) => {
  const { allDocuments } = useQueryKeys();
  return useQuery({
    queryKey: allDocuments(params),
    queryFn: () => fetchAllDocuments(params)
  });
};

type Action =
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_PAGE_SIZE'; payload: number }
  | { type: 'SET_SORTING'; payload: { field: string; order: 'ASC' | 'DESC' } }
  | { type: 'RESET'; payload?: Partial<DocumentsParams> };

const initialState: DocumentsParams = {
  page: 1,
  pageSize: 10,
  sortField: undefined,
  sortOrder: undefined
};

const reducer = (state: DocumentsParams, action: Action): DocumentsParams => {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_SORTING':
      return {
        ...state,
        sortField: action.payload.field as DocumentSortField,
        sortOrder: action.payload.order,
        page: 1
      };
    case 'RESET':
      return { ...initialState, ...action.payload };
    default:
      return state;
  }
};

export const usePaginatedDocuments = (
  initialParams?: Partial<DocumentsParams>
) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...initialParams
  });

  const { data, isLoading, isError } = useGetAllDocuments(state);

  const pageSize = state.pageSize ?? 10;
  const totalPages = data ? Math.ceil(data.total / pageSize) : 0;
  const page = state.page ?? 1;

  const goToNextPage = () => {
    if (pageSize < totalPages) {
      dispatch({ type: 'SET_PAGE', payload: page + 1 });
    }
  };

  const goToPreviousPage = () => {
    if (page > 1) {
      dispatch({ type: 'SET_PAGE', payload: page - 1 });
    }
  };

  const goToPage = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      dispatch({ type: 'SET_PAGE', payload: pageNumber });
    }
  };

  const setSorting = (field: string, order: 'ASC' | 'DESC') => {
    dispatch({ type: 'SET_SORTING', payload: { field, order } });
  };

  const reset = (params?: Partial<DocumentsParams>) => {
    dispatch({ type: 'RESET', payload: params });
  };

  return {
    documents: data?.documents || [],
    total: data?.total || 0,
    page: state.page,
    pageSize: state.pageSize,
    totalPages,
    sortField: state.sortField,
    sortOrder: state.sortOrder,
    isLoading,
    isError,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    setSorting,
    reset
  };
};
