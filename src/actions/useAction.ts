import { useActionState, useOptimistic, useState, useCallback, useTransition } from 'react';
import { useFormStatus } from 'react-dom';
import { ActionFn, UseActionOptions, UseActionResult } from './types';

/**
 * Supercharged React 19 Action hook.
 * Built directly on top of React 19's `useActionState` and `useOptimistic`.
 * 
 * Automatically handles:
 * - Direct typed payloads or FormDatas
 * - React 19 concurrent transition pending states
 * - Instant optimistic updates via `useOptimistic`
 */
export function useAction<TInput, TOutput>(
  actionFn: ActionFn<TInput, TOutput>,
  initialState: TOutput,
  options: UseActionOptions<TInput, TOutput> = {}
): UseActionResult<TInput, TOutput> {
  const { onSuccess, onError, optimisticUpdate } = options;
  const [error, setError] = useState<Error | null>(null);

  // Wrap action handler with error capture
  const wrappedAction = async (prevState: Awaited<TOutput>, payload: TInput | FormData): Promise<Awaited<TOutput>> => {
    setError(null);
    try {
      let actualInput: TInput;
      if (payload instanceof FormData) {
        const obj: any = {};
        payload.forEach((val, key) => {
          obj[key] = val;
        });
        actualInput = obj as TInput;
      } else {
        actualInput = payload as TInput;
      }

      const result = await actionFn(prevState as TOutput, actualInput);
      onSuccess?.(result);
      return result as Awaited<TOutput>;
    } catch (err: any) {
      const formattedErr = err instanceof Error ? err : new Error(String(err));
      setError(formattedErr);
      onError?.(formattedErr);
      return prevState;
    }
  };

  // React 19 native useActionState
  const [state, formAction, isPending]: [TOutput, (payload: any) => void, boolean] = (useActionState as any)(
    wrappedAction,
    initialState
  );

  // React 19 native useOptimistic
  const [optimisticState, setOptimistic] = useOptimistic<TOutput, TInput>(
    state,
    (current: TOutput, input: TInput) => {
      if (optimisticUpdate) {
        return optimisticUpdate(current, input);
      }
      return current;
    }
  );

  const [isManualPending, startTransition] = useTransition();

  const run = useCallback(
    (input: TInput) => {
      startTransition(() => {
        if (optimisticUpdate) {
          setOptimistic(input);
        }
        formAction(input);
      });
    },
    [formAction, optimisticUpdate, setOptimistic]
  );

  const reset = useCallback(() => {
    setError(null);
  }, []);

  return {
    data: optimisticState,
    isPending: isPending || isManualPending,
    error,
    run,
    formAction: formAction as any,
    reset
  };
}

/**
 * Access pending status from any nested component inside a React 19 form action.
 */
export function useActionStatus() {
  return useFormStatus();
}
