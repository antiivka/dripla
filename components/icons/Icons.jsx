// components/icons/Icons.jsx
function IconBase({ children, size = 22, stroke = 1.8, className = "" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const IconSearch = (props) => (
  <IconBase {...props}>
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-4-4" />
  </IconBase>
);

export const IconUser = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 4-7 8-7s8 3 8 7" />
  </IconBase>
);

export const IconHeart = (props) => (
  <IconBase {...props}>
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
  </IconBase>
);

export const IconHome = (props) => (
  <IconBase {...props}>
    <path d="M3 11l9-7 9 7" />
    <path d="M9 22V12h6v10" />
  </IconBase>
);

export const IconMessage = (props) => (
  <IconBase {...props}>
    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
  </IconBase>
);
