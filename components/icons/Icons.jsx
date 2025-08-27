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

/** Proper 6-tooth cog (outline) */
export const IconSettings = (props) => (
  <IconBase {...props}>
    {/* outer cog with teeth */}
    <path d="
      M11.25 1.5h1.5l.38 2.33c.79.2 1.55.49 2.28.86l2.04-1.18 1.06 1.06-1.18 2.04c.37.73.66 1.49.86 2.28l2.33.38v1.5l-2.33.38c-.2.79-.49 1.55-.86 2.28l1.18 2.04-1.06 1.06-2.04-1.18c-.73.37-1.49.66-2.28.86l-.38 2.33h-1.5l-.38-2.33a9.9 9.9 0 0 1-2.28-.86l-2.04 1.18-1.06-1.06 1.18-2.04a9.9 9.9 0 0 1-.86-2.28l-2.33-.38v-1.5l2.33-.38c.2-.79.49-1.55.86-2.28L5.49 4.57 6.55 3.5l2.04 1.18c.73-.37 1.49-.66 2.28-.86l.38-2.33Z" />
    {/* inner hub */}
    <circle cx="12" cy="12" r="3" />
  </IconBase>
);
