import { UserStatusProps } from '@/types/definitions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

export const useReduxNotifications = (
  error: string | null,
  userStatus: UserStatusProps,
  options?: {
    onSuccess?: (message?: string) => void;
    onError?: (message?: string) => void;
    successRedirect?: string;
  }
) => {
  const [lastStatus, setLastStatus] = useState<UserStatusProps>(null);
  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error(error);
      options?.onError?.();
      return;
    }

    if (userStatus && userStatus !== lastStatus) {
      switch(userStatus.type) {
        case 'success':
          toast.success(userStatus.message);
          options?.onSuccess?.();
          if (options?.successRedirect) {
            router.push(options.successRedirect);
          }
          break;
        case 'error':
          toast.error(userStatus.message);
          options?.onError?.();
          break;
        default:
          toast(userStatus.message);
      }
      setLastStatus(userStatus);
    }
  }, [error, userStatus, lastStatus, options, router]);
};