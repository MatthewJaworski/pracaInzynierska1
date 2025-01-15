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
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { TypographyP } from '@/components/ui/typography';
import { usePaginatedDocuments } from '@/hooks/use-get-all-documents';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { useUpdateDocument } from '@/hooks/use-update-document';
import { FileDownload } from '@/sceens/student-dashboard/file-download';
import { DocumentSortField } from '@/types/document-sort-field';
import { ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { StatusWithIcon } from './status-with-icon';

export type DocumentsForConsiderationProps = {
  userId: string;
};
export const DocumentsForConsideration = ({
  userId
}: DocumentsForConsiderationProps) => {
  const {
    documents,
    page,
    totalPages,
    sortField,
    sortOrder,
    isLoading,
    isError,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    setSorting
  } = usePaginatedDocuments({ statuses: ['submitted', 'assigned'] });
  const { t } = useLocaleTranslation();
  const { mutateAsync, isPending } = useUpdateDocument();

  const handleSort = (field: DocumentSortField) => {
    const order = field === sortField && sortOrder === 'ASC' ? 'DESC' : 'ASC';
    setSorting(field, order);
  };

  const handleAssing = async (id: string) => {
    await mutateAsync({ id, documentStatus: 'assigned', assignedTo: userId });
  };

  const renderSortIndicator = (field: DocumentSortField) => {
    const isActive = sortField === field;
    const IconComponent = sortOrder === 'ASC' ? ChevronUp : ChevronDown;

    return (
      <span className="w-4 h-4 flex items-center justify-center">
        <IconComponent className={isActive ? '' : 'invisible'} />
      </span>
    );
  };

  if (isLoading)
    return (
      <Box className="flex justify-center">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
      </Box>
    );
  if (isError) return <p>{t('documentsForConsideration.error')}</p>;

  const totalArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Box className="container mx-auto">
      {!isLoading && !isError && (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead
                  onClick={() => handleSort('templateName')}
                  className="cursor-pointer"
                >
                  <Box className="flex items-center p-0">
                    <TypographyP>
                      {t('documentsForConsideration.templateName')}
                    </TypographyP>
                    {renderSortIndicator('templateName')}
                  </Box>
                </TableHead>
                <TableHead
                  onClick={() => handleSort('documentStatus')}
                  className="cursor-pointer"
                >
                  <Box className="flex items-center p-0">
                    <TypographyP>
                      {t('documentsForConsideration.status')}
                    </TypographyP>
                    {renderSortIndicator('documentStatus')}
                  </Box>
                </TableHead>
                <TableHead
                  onClick={() => handleSort('createdDate')}
                  className="cursor-pointer"
                >
                  <Box className="flex items-center p-0">
                    <TypographyP>
                      {t('documentsForConsideration.creationDate')}
                    </TypographyP>
                    {renderSortIndicator('createdDate')}
                  </Box>
                </TableHead>
                <TableHead className="cursor-pointer">
                  <Box className="flex items-center p-0">
                    <TypographyP>
                      {t('documentsForConsideration.action')}
                    </TypographyP>
                    <ChevronUp className="invisible" />
                  </Box>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((document) => (
                <TableRow key={document.id}>
                  <TableCell>{document.documentTemplate?.name}</TableCell>
                  <TableCell>
                    <StatusWithIcon status={document.documentStatus} />
                  </TableCell>
                  <TableCell>
                    {new Date(document.createdDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Box className="flex gap-2 p-0">
                      {document.documentStatus === 'submitted' && (
                        <Button
                          disabled={isPending}
                          onClick={() => handleAssing(document.id)}
                        >
                          {t('documentsForConsideration.assign')}
                        </Button>
                      )}
                      <Link href={`/documents/${document.id}`}>
                        <Button>{t('documentsForConsideration.open')}</Button>
                      </Link>
                      <FileDownload documentId={document.id} />
                    </Box>
                  </TableCell>
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
