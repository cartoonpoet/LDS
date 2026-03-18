import type { IconComponentProps } from "./types";

export function InfoIcon({ title, ...props }: IconComponentProps) {
  return (
    <svg aria-hidden={title ? undefined : true} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      {title ? <title>{title}</title> : null}
      <path
        clipRule="evenodd"
        d="M1 12C1 5.9 5.9 1 12 1C18.1 1 23 5.9 23 12C23 18.1 18.1 23 12 23C5.9 23 1 18.1 1 12ZM3 12C3 17 7 21 12 21C17 21 21 17 21 12C21 7 17 3 12 3C7 3 3 7 3 12ZM13 12V16C13 16.6 12.6 17 12 17C11.4 17 11 16.6 11 16V12C11 11.4 11.4 11 12 11C12.6 11 13 11.4 13 12ZM13 8C13 7.7 12.9 7.5 12.7 7.3C12.5 7.1 12.1 7 11.8 7C11.7425 7.05751 11.7181 7.08194 11.6887 7.09233C11.6669 7.1 11.6425 7.1 11.6 7.1C11.55 7.1 11.525 7.125 11.5 7.15C11.475 7.175 11.45 7.2 11.4 7.2L11.3 7.3C11.1 7.5 11 7.7 11 8C11 8.3 11.1 8.5 11.3 8.7C11.3 8.7 11.3 8.8 11.4 8.8C11.45 8.8 11.475 8.825 11.5 8.85C11.525 8.875 11.55 8.9 11.6 8.9C11.6575 8.9575 11.6819 8.98194 11.7113 8.99233C11.7331 9 11.7575 9 11.8 9H12C12.3 9 12.5 8.9 12.7 8.7C12.9 8.5 13 8.3 13 8Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function ConfirmIcon({ title, ...props }: IconComponentProps) {
  return (
    <svg aria-hidden={title ? undefined : true} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      {title ? <title>{title}</title> : null}
      <path
        d="M12 1C5.9346 1 1 5.9346 1 12C1 18.0654 5.9346 23 12 23C18.0654 23 23 18.0654 23 12C23 5.9346 18.0654 1 12 1ZM11.4807 16.1747C11.1052 16.5502 10.4966 16.5505 10.1208 16.1755L7.495 13.5553C7.06517 13.1264 7.0643 12.4303 7.49306 12.0003C7.92208 11.5701 8.61871 11.5693 9.04872 11.9986L10.7989 13.7457L13.7106 10.834L15.8446 8.7C16.2741 8.27049 16.9705 8.27049 17.4 8.7C17.8295 9.12951 17.8295 9.82589 17.4 10.2554L11.4807 16.1747Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SaveTemporarilyIcon({ title, ...props }: IconComponentProps) {
  return (
    <svg aria-hidden={title ? undefined : true} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      {title ? <title>{title}</title> : null}
      <path
        clipRule="evenodd"
        d="M21.7 7.3L16.7 2.3C16.5 2.1 16.3 2 16 2H5C3.3 2 2 3.3 2 5V19C2 20.7 3.3 22 5 22H19C20.7 22 22 20.7 22 19V8C22 7.7 21.9 7.5 21.7 7.3ZM16 20H8V14H16V20ZM19 20C19.6 20 20 19.6 20 19V8.4L15.6 4H8V7H15C15.6 7 16 7.4 16 8C16 8.6 15.6 9 15 9H7C6.4 9 6 8.6 6 8V4H5C4.4 4 4 4.4 4 5V19C4 19.6 4.4 20 5 20H6V13C6 12.4 6.4 12 7 12H17C17.6 12 18 12.4 18 13V20H19Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function SecretIcon({ title, ...props }: IconComponentProps) {
  return (
    <svg aria-hidden={title ? undefined : true} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      {title ? <title>{title}</title> : null}
      <path
        clipRule="evenodd"
        d="M18 10H19C20.7 10 22 11.3 22 13V20C22 21.7 20.7 23 19 23H5C3.3 23 2 21.7 2 20V13C2 11.3 3.3 10 5 10H6V7C6 3.7 8.7 1 12 1C15.3 1 18 3.7 18 7V10ZM12 3C9.8 3 8 4.8 8 7V10H16V7C16 4.8 14.2 3 12 3Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
}

export function CloseIcon({ title, ...props }: IconComponentProps) {
  return (
    <svg aria-hidden={title ? undefined : true} fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      {title ? <title>{title}</title> : null}
      <path
        d="M18.7 17.3C19.1 17.7 19.1 18.3 18.7 18.7C18.5 18.9 18.3 19 18 19C17.7 19 17.5 18.9 17.3 18.7L12 13.4L6.7 18.7C6.5 18.9 6.3 19 6 19C5.7 19 5.5 18.9 5.3 18.7C4.9 18.3 4.9 17.7 5.3 17.3L10.6 12L5.3 6.7C4.9 6.3 4.9 5.7 5.3 5.3C5.7 4.9 6.3 4.9 6.7 5.3L12 10.6L17.3 5.3C17.7 4.9 18.3 4.9 18.7 5.3C19.1 5.7 19.1 6.3 18.7 6.7L13.4 12L18.7 17.3Z"
        fill="currentColor"
      />
    </svg>
  );
}
