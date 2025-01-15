import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useQueryKeys } from './use-query-keys';
import { useReducer } from 'react';
import { PredefinedField } from '@/types/template-field';

export type PredefinedFieldsParams = {
  page?: number;
  pageSize?: number;
};

export type ResponseFields = {
  total: number;
  fields: PredefinedField[];
};

export const fetchAllPredefinedFields = async (
  params: PredefinedFieldsParams
) => {
  const response = await axios.get<ResponseFields>('/api/fields/predefined', {
    params
  });
  return response.data;
};

export const useGetPredefinedFields = (params: PredefinedFieldsParams) => {
  const { getPredefinedFields } = useQueryKeys();
  return useQuery({
    queryKey: getPredefinedFields(params),
    queryFn: () => fetchAllPredefinedFields(params)
  });
};

type Action =
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_PAGE_SIZE'; payload: number };

const initialState: PredefinedFieldsParams = {
  page: 1,
  pageSize: 10
};

const reducer = (
  state: PredefinedFieldsParams,
  action: Action
): PredefinedFieldsParams => {
  switch (action.type) {
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

export const usePaginatedPredefindeFields = (
  initialParams: Partial<PredefinedFieldsParams>
) => {
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    ...initialParams
  });
  const { data, isLoading, isError } = useGetPredefinedFields(state);

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

  return {
    fields: data?.fields ?? [],
    page,
    totalPages,
    pageSize,
    isLoading,
    isError,
    goToNextPage,
    goToPreviousPage,
    goToPage
  };
};
