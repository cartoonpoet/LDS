import type { ReactElement, SVGProps } from "react";

export type IconComponentProps = SVGProps<SVGSVGElement> & {
  title?: string;
};

function createIcon(path: ReactElement) {
  return function IconSvg({ title, ...props }: IconComponentProps) {
    return (
      <svg aria-hidden={title ? undefined : true} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
        {title ? <title>{title}</title> : null}
        {path}
      </svg>
    );
  };
}

export const iconRegistry = {
  info: createIcon(
    <path
      clipRule="evenodd"
      d="M1 12C1 5.9 5.9 1 12 1C18.1 1 23 5.9 23 12C23 18.1 18.1 23 12 23C5.9 23 1 18.1 1 12ZM3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3C7 3 3 7 3 12ZM13 12V16C13 16.6 12.6 17 12 17C11.4 17 11 16.6 11 16V12C11 11.4 11.4 11 12 11C12.6 11 13 11.4 13 12ZM13 8C13 7.7 12.9 7.5 12.7 7.3C12.5 7.1 12.1 7 11.8 7C11.7425 7.05751 11.7181 7.08194 11.6887 7.09233C11.6669 7.1 11.6425 7.1 11.6 7.1C11.55 7.1 11.525 7.125 11.5 7.15C11.475 7.175 11.45 7.2 11.4 7.2L11.3 7.3C11.1 7.5 11 7.7 11 8C11 8.3 11.1 8.5 11.3 8.7C11.3 8.7 11.3 8.8 11.4 8.8C11.45 8.8 11.475 8.825 11.5 8.85C11.525 8.875 11.55 8.9 11.6 8.9C11.6575 8.9575 11.6819 8.98194 11.7113 8.99233C11.7331 9 11.7575 9 11.8 9H12C12.3 9 12.5 8.9 12.7 8.7C12.9 8.5 13 8.3 13 8Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  ),
  confirm: createIcon(
    <path
      d="M12 1C5.9346 1 1 5.9346 1 12C1 18.0654 5.9346 23 12 23C18.0654 23 23 18.0654 23 12C23 5.9346 18.0654 1 12 1ZM11.4807 16.1747C11.1052 16.5502 10.4966 16.5505 10.1208 16.1755L7.495 13.5553C7.06517 13.1264 7.0643 12.4303 7.49306 12.0003C7.92208 11.5701 8.61871 11.5693 9.04872 11.9986L10.7989 13.7457L13.7106 10.834L15.8446 8.7C16.2741 8.27049 16.9705 8.27049 17.4 8.7C17.8295 9.12951 17.8295 9.82589 17.4 10.2554L11.4807 16.1747Z"
      fill="currentColor"
    />
  ),
  saveTemporarily: createIcon(
    <path
      clipRule="evenodd"
      d="M21.7 7.3L16.7 2.3C16.5 2.1 16.3 2 16 2H5C3.3 2 2 3.3 2 5V19C2 20.7 3.3 22 5 22H19C20.7 22 22 20.7 22 19V8C22 7.7 21.9 7.5 21.7 7.3ZM16 20H8V14H16V20ZM19 20C19.6 20 20 19.6 20 19V8.4L15.6 4H8V7H15C15.6 7 16 7.4 16 8C16 8.6 15.6 9 15 9H7C6.4 9 6 8.6 6 8V4H5C4.4 4 4 4.4 4 5V19C4 19.6 4.4 20 5 20H6V13C6 12.4 6.4 12 7 12H17C17.6 12 18 12.4 18 13V20H19Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  ),
  secret: createIcon(
    <path
      clipRule="evenodd"
      d="M18 10H19C20.7 10 22 11.3 22 13V20C22 21.7 20.7 23 19 23H5C3.3 23 2 21.7 2 20V13C2 11.3 3.3 10 5 10H6V7C6 3.7 8.7 1 12 1C15.3 1 18 3.7 18 7V10ZM12 3C9.8 3 8 4.8 8 7V10H16V7C16 4.8 14.2 3 12 3Z"
      fill="currentColor"
      fillRule="evenodd"
    />
  ),
  close: createIcon(
    <path
      d="M18.7 17.3C19.1 17.7 19.1 18.3 18.7 18.7C18.5 18.9 18.3 19 18 19C17.7 19 17.5 18.9 17.3 18.7L12 13.4L6.7 18.7C6.5 18.9 6.3 19 6 19C5.7 19 5.5 18.9 5.3 18.7C4.9 18.3 4.9 17.7 5.3 17.3L10.6 12L5.3 6.7C4.9 6.3 4.9 5.7 5.3 5.3C5.7 4.9 6.3 4.9 6.7 5.3L12 10.6L17.3 5.3C17.7 4.9 18.3 4.9 18.7 5.3C19.1 5.7 19.1 6.3 18.7 6.7L13.4 12L18.7 17.3Z"
      fill="currentColor"
    />
  ),
  filePlus: createIcon(
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="18" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="9" y1="15" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  inProgress: createIcon(
    <>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="10 8 16 12 10 16 10 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  terminate: createIcon(
    <>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  save: createIcon(
    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  checkCircle: createIcon(
    <>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  feather: createIcon(
    <>
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="16" y1="8" x2="2" y2="22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="17.5" y1="15" x2="9" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  userPlus: createIcon(
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="20" y1="8" x2="20" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="23" y1="11" x2="17" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  userCheck: createIcon(
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="17 11 19 13 23 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  users: createIcon(
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  fileCheck: createIcon(
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="9 15 11 17 15 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  submit: createIcon(
    <>
      <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  pay: createIcon(
    <>
      <rect x="1" y="4" width="22" height="16" rx="2" ry="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="1" y1="10" x2="23" y2="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  seal: createIcon(
    <>
      <circle cx="12" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  refreshCw: createIcon(
    <>
      <polyline points="23 4 23 10 17 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="1 20 1 14 7 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  userX: createIcon(
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8.5" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="18" y1="8" x2="23" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="23" y1="8" x2="18" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  moreHorizontal: createIcon(
    <>
      <circle cx="12" cy="12" r="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19" cy="12" r="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="5" cy="12" r="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  autoSign: createIcon(
    <>
      <path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
} as const;
