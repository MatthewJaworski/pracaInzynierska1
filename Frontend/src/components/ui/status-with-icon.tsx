import { useLocaleTranslation } from '@/hooks/use-locale-translation';
import { DocumentStatus } from '@/types/document-status';
import { UploadCloud, UserCheck, CheckCircle, XCircle } from 'lucide-react';
import { TypographyP } from './typography';
import { Box } from './box';

export const StatusWithIcon = ({ status }: { status: DocumentStatus }) => {
  let IconComponent;
  let colorClass;

  const { t } = useLocaleTranslation();

  switch (status) {
    case 'submitted':
      IconComponent = UploadCloud;
      colorClass = 'text-gray-500';
      break;
    case 'assigned':
      IconComponent = UserCheck;
      colorClass = 'text-blue-500';
      break;
    case 'approved':
      IconComponent = CheckCircle;
      colorClass = 'text-green-500';
      break;
    case 'rejected':
      IconComponent = XCircle;
      colorClass = 'text-red-500';
      break;
    default:
      IconComponent = null;
  }

  return (
    <Box className="flex items-center">
      {IconComponent && (
        <IconComponent className={`w-4 h-4 ${colorClass} mr-2`} />
      )}
      <TypographyP>{t(status)}</TypographyP>
    </Box>
  );
};
