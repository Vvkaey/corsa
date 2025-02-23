export const CaretUp = ({
  className,
  style,
  fill = "black",
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
        fill={fill ?? "black"}
      />
    </svg>
  );
};

export const BrownBgTick = ({
  className,
  style,
  width = 24,
  height = 24,
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
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
    >
      <g clipPath="url(#clip0_0_20)">
        <path
          d="M25.8248 6.85715C25.8168 2.85233 22.9981 0.0266128 18.9888 0.00473482C17.1109 -0.00562844 15.2318 0.00243187 13.3538 0.00358334C11.4563 0.00358334 9.55872 -0.00562844 7.66117 0.00588629C3.6669 0.0289158 0.833253 2.8696 0.82289 6.86406C0.813679 10.6017 0.81483 14.3394 0.82289 18.0783C0.83095 22.1614 3.68993 25.0078 7.77632 25.0113C11.4758 25.0147 15.1753 25.0136 18.8749 25.0113C22.9543 25.0078 25.8191 22.1499 25.8248 18.0714C25.8306 14.3337 25.8317 10.596 25.8248 6.85715ZM20.3314 9.82795C17.6014 12.5696 14.8668 15.3055 12.1275 18.038C11.6739 18.4905 11.2858 18.4893 10.8299 18.038C9.31922 16.5422 7.81662 15.0384 6.31862 13.5299C5.87417 13.082 5.86957 12.6755 6.29674 12.2311C6.80106 11.7072 7.32381 11.1994 7.83619 10.6823C8.01927 10.4981 8.22307 10.3703 8.48789 10.3979C8.76884 10.3841 8.95998 10.5327 9.1419 10.7146C9.77633 11.3525 10.4407 11.9639 11.044 12.6306C11.4056 13.0314 11.6221 12.9531 11.9606 12.6088C13.7741 10.7664 15.6094 8.94477 17.4379 7.11623C18.0424 6.51171 18.382 6.5071 18.9831 7.09896C19.4333 7.54228 19.8858 7.98444 20.3233 8.43928C20.8138 8.94938 20.8242 9.33167 20.3314 9.8268V9.82795Z"
          fill="#A88146"
        />
      </g>
      <defs>
        <clipPath id="clip0_0_20">
          <rect
            width="25.0135"
            height="25.0135"
            fill="white"
            transform="translate(0.816406)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
