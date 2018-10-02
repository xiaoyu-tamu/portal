export interface BaseProps {
  className?: string;
  style?: React.CSSProperties;
}

export type Dictionary<T = any> = { [index: string]: T };

export type NumberDictionary<T> = { [index: number]: T };
