'use client';

import { Box, Button } from '@/components/ui';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader
} from '@/components/ui/table';
import { TypographyP } from '@/components/ui/typography';
import { usePaginatedPredefindeFields } from '@/hooks/use-get-predefined-fields';
import { useDeletePredefinedField } from '@/hooks/use-remove-predefined-field';

import { Loader2 } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { ModifyFieldForm } from './modify-field-form';
import { setQueryParam } from '@/lib/set-search-param';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';

export const PredefinedFieldList = () => {
  const {
    fields,
    page,
    totalPages,
    isLoading,
    isError,
    goToNextPage,
    goToPreviousPage,
    goToPage
  } = usePaginatedPredefindeFields({ page: 1, pageSize: 10 });
  const { mutateAsync } = useDeletePredefinedField();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useLocaleTranslation();
  const createQueryString = useCallback(setQueryParam, [searchParams]);

  if (isLoading)
    return (
      <Box className="flex justify-center">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
      </Box>
    );

  if (isError)
    return (
      <TypographyP>{t('fields.errorLoadingPredefinedFields')}</TypographyP>
    );

  const totalArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handleDeleteField = async (fieldName: string) =>
    await mutateAsync(fieldName);

  const handleEditField = (fieldName: string) => {
    router.replace(
      pathname +
        '?' +
        createQueryString({ name: 'fieldName', value: fieldName, searchParams })
    );
  };
  const editField = searchParams.get('fieldName');

  return (
    <Box className="container mx-auto">
      {!isLoading && !isError && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <TypographyP>{t('fields.name')}</TypographyP>
                </TableHead>
                <TableHead>
                  <TypographyP>{t('value')}</TypographyP>
                </TableHead>
                <TableHead>
                  <TypographyP>{t('action')}</TypographyP>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field) => (
                <TableRow key={field.id}>
                  {editField === field.fieldName ? (
                    <TableCell colSpan={3}>
                      <ModifyFieldForm
                        fieldName={field.fieldName}
                        value={field.value}
                        fieldId={field.id}
                      />
                    </TableCell>
                  ) : (
                    <>
                      <TableCell>{field.fieldName}</TableCell>
                      <TableCell>{field.value}</TableCell>
                      <TableCell>
                        <Box className="flex gap-4 w-max">
                          <Button
                            size="lg"
                            onClick={() => handleEditField(field.fieldName)}
                          >
                            {t('edit')}
                          </Button>
                          <Button
                            size="lg"
                            variant="destructive"
                            onClick={() => handleDeleteField(field.fieldName)}
                          >
                            {t('delete')}
                          </Button>
                        </Box>
                      </TableCell>
                    </>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box className="mt-4 flex justify-between items-center">
            <Pagination className="flex justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={goToPreviousPage}
                    className={page === 1 ? 'disabled' : ''}
                    aria-disabled={page === 1}
                  />
                </PaginationItem>
                {totalArray.map((pageNumber) => (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href="#"
                      onClick={() => goToPage(pageNumber)}
                      isActive={pageNumber === page}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={goToNextPage}
                    className={page === totalPages ? 'disabled' : ''}
                    aria-disabled={page === totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </Box>
        </>
      )}
    </Box>
  );
};
