import { ActionCreator, Action, AnyAction, AsyncActionCreators } from 'typescript-fsa';
import { OperatorFunction, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { RootState } from '~/redux';

type AnyAsyncActionCreators = AsyncActionCreators<any, any, any>;

export const ofAction = <P>(
  actionCreator: ActionCreator<P>
): OperatorFunction<Action<unknown>, Action<P>> => {
  return (actions$): Observable<Action<P>> => actions$.pipe(filter(actionCreator.match));
};

/**
 * Determine whether a series of async actions complete of not.
 *
 * When the component render first time, The initial value for
 * loading is true, this is useful for rendering loading effect.
 *
 * @export
 * @param {AnyAsyncActionCreators[]} actions
 * @returns {(state: RootState) => boolean}
 */
export function createLoadingSelector(
  actions: AnyAsyncActionCreators[]
): (state: RootState) => boolean {
  return ({ loading }) =>
    actions.some(
      (action) => (typeof loading[action.type] === 'undefined' ? true : loading[action.type])
    );
}

export function createErrorMessageSelector(actions: AnyAsyncActionCreators[]) {
  return (state: RootState): string => {
    const errors = actions.map((action) => state.error[action.type]);
    if (errors && errors[0]) return errors[0];
    return '';
  };
}

export function isApiAction(action: AnyAction) {
  const matches = /(.*)_(STARTED|DONE|FAILED)/.exec(action.type);
  if (!matches) return null;
  return {
    name: matches[1],
    state: matches[2]
  };
}
