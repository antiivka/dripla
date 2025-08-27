// components/icons/Icons.jsx
function IconBase({
  children,
  size = 22,
  stroke = 1.8,
  className = "",
  style,
  ...rest
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"      // follows the element's CSS "color"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}              // <-- allow color via style={{ color: ... }}
      aria-hidden="true"
      focusable="false"
      {...rest}
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

/** Clean home: roof + walls + centered door */
export const IconHome = (props) => (
  <IconBase {...props}>
    <path d="M3 10.5L12 3l9 7.5" />
    <path d="M5 10.5V21h5v-6h4v6h5V10.5" />
  </IconBase>
);

export const IconMessage = (props) => (
  <IconBase {...props}>
    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
  </IconBase>
);

/** New, tidy gear icon (outline) */
export const IconSettings = (props) => (
  <IconBase {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 2v3" />
    <path d="M12 19v3" />
    <path d="M2 12h3" />
    <path d="M19 12h3" />
    <path d="M4.22 4.22l2.12 2.12" />
    <path d="M17.66 17.66l2.12 2.12" />
    <path d="M4.22 19.78l2.12-2.12" />
    <path d="M17.66 6.34l2.12-2.12" />
  </IconBase>
);
