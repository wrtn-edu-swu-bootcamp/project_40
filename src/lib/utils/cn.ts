import { clsx, type ClassValue } from 'clsx';

// className 유틸리티 함수
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
