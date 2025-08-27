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
      stroke="currentColor"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
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

/** Proper cog (gear) with teeth — matches your mock */
export const IconSettings = (props) => (
  <IconBase {...props}>
    {/* outer cog with teeth */}
    <path d="M9.594 3.94c.09-.54.56-.94 1.11-.94h2.592c.55 0 1.02.4 1.11.94l.334 2.014c.78.3 1.5.72 2.166 1.25l1.806-.602a1.12 1.12 0 0 1 1.37.52l1.296 2.247c.25.433.17.98-.206 1.33l-1.537 1.4c.05.43.08.87.08 1.32s-.03.89-.08 1.32l1.537 1.4c.376.35.456.897.206 1.33l-1.296 2.247a1.12 1.12 0 0 1-1.37.52l-1.806-.602a8.13 8.13 0 0 1-2.166 1.25l-.334 2.014c-.09.54-.56.94-1.11.94H10.704c-.55 0-1.02-.4-1.11-.94l-.334-2.014a8.13 8.13 0 0 1-2.166-1.25l-1.806.602a1.12 1.12 0 0 1-1.37-.52L2.622 17.9a1.12 1.12 0 0 1 .206-1.33l1.537-1.4A8.85 8.85 0 0 1 3.5 12c0-.45.03-.89.08-1.32l-1.537-1.4a1.12 1.12 0 0 1-.206-1.33L3.133 5.68a1.12 1.12 0 0 1 1.37-.52l1.806.602a8.13 8.13 0 0 1 2.166-1.25l.334-2.014Z" />
    {/* inner hub */}
    <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
  </IconBase>
);
