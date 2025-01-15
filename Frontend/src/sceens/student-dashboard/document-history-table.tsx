'use client';

import React, { useState } from 'react';
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
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useGetDocuments } from '@/hooks/use-get-documents';
import { FileDownload } from './file-download';
import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { StatusWithIcon } from '@/components/ui/status-with-icon';

const DOCUMENTS_PER_PAGE = 5;

export const DocumentHistoryTable = () => {
  const { data: documents, isLoading, isError } = useGetDocuments();
  const [currentPage, setCurrentPage] = useState(1);
  const { t } = useLocaleTranslation();

  if (isLoading)
    return (
      <Box className="flex justify-center">
        <Loader2 className="mr-2 h-8 w-8 animate-spin" />
      </Box>
    );
  if (isError || !documents)
    return <TypographyP>{t('documents.errorLoadingDocument')}</TypographyP>;

  const totalPages = Math.ceil(documents.length / DOCUMENTS_PER_PAGE);

  const indexOfLastDocument = currentPage * DOCUMENTS_PER_PAGE;
  const indexOfFirstDocument = indexOfLastDocument - DOCUMENTS_PER_PAGE;
  const currentDocuments = documents.slice(
    indexOfFirstDocument,
    indexOfLastDocument
  );

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const totalArray = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Box className="container mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('documentsForConsideration.creationDate')}</TableHead>
            <TableHead>{t('template.templateName')}</TableHead>
            <TableHead>{t('status')}</TableHead>
            <TableHead>{t('action')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentDocuments.map((document) => (
            <TableRow key={document.id}>
              <TableCell>
                {new Date(document.createdDate).toLocaleDateString()}
              </TableCell>
              <TableCell className="w-full">
                {document.documentTemplate?.name}
              </TableCell>
              <TableCell>
                <StatusWithIcon status={document.documentStatus} />
              </TableCell>
              <TableCell>
                <Box className="flex gap-4">
                  <Link href={`/documents/${document.id}`}>
                    <Button>{t('open')}</Button>
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
                className={currentPage === 1 ? 'disabled' : ''}
                aria-disabled={currentPage === 1}
              />
            </PaginationItem>
            {totalArray.map((pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  onClick={() => goToPage(pageNumber)}
                  isActive={pageNumber === currentPage}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={goToNextPage}
                className={currentPage === totalPages ? 'disabled' : ''}
                aria-disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </Box>
    </Box>
  );
};
