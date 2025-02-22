export const CaretUp = ({
    className,
    style,
    fill = 'black',
    width = 15,
    height = 11,
  }: {
    className?: string;
    style?: Record<string, unknown>;
    fill?: string;
    width?: number;
    height?: number;
  }) => {
    return (
      <svg
        className={className}
        style={style}
        width={width}
        height={height}
        viewBox="0 0 15 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14.6732 8.15665L12.6499 10.18L7.33659 4.85126L2.0233 10.18L-4.00543e-05 8.15665L7.33662 0.819993L14.6732 8.15665Z"
          fill={fill ?? 'black'}
        />
      </svg>
    );
  };