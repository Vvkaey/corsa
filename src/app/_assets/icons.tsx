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

export const FillOptionCircle = ({
  className,
  style,
  width = 15.5,
  height = 15.5,
}: {
  className?: string;
  style?: Record<string, unknown>;
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 17"
    >
      <circle
        cx="7.89282"
        cy="8.1535"
        r="6.39385"
        fill="url(#paint0_linear_0_98)"
        stroke="url(#paint1_radial_0_98)"
        strokeWidth="2.69215"
      />
      <defs>
        <linearGradient
          id="paint0_linear_0_98"
          x1="-5.56792"
          y1="-6.3168"
          x2="25.7283"
          y2="30.7002"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF2626" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_0_98"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(7.89282 8.1535) rotate(90) scale(7.73993)"
        >
          <stop offset="0.905" stopColor="white" />
          <stop offset="0.9051" stopColor="#E3DCDC" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export const BlankOptionCircle = ({
  className,
  style,
  width = 15.5,
  height = 15.5,
}: {
  className?: string;
  style?: Record<string, unknown>;
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 17"
    >
      <circle
        cx="7.89282"
        cy="8.1535"
        r="6.39385"
        fill="#E3DCDC"
        stroke="url(#paint1_radial_0_98)"
        strokeWidth="2.69215"
      />
      <defs>
        <linearGradient
          id="paint0_linear_0_98"
          x1="-5.56792"
          y1="-6.3168"
          x2="25.7283"
          y2="30.7002"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E3DCDC" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_0_98"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(7.89282 8.1535) rotate(90) scale(7.73993)"
        >
          <stop offset="0.905" stopColor="white" />
          <stop offset="0.9051" stopColor="#E3DCDC" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export const Circled = ({
  className,
  style,
  width = 279,
  height = 119,
}: {
  className?: string;
  style?: Record<string, unknown>;
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      className={className}
      style={style}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 279 119"
    >
      <path
        d="M169.969 1.4312C118.344 8.26386 15.0953 16.2346 2.83753 68.4025C-10.2061 123.915 102.689 122.218 158.752 111.852C226.132 101.987 317.498 75.5255 258.596 40.6037C189.325 -0.466573 108.3 14.4708 46.603 15.0966"
        stroke="#FF3014"
        strokeWidth="2.27755"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const ArrowRightWhite = ({
  className,
  style,
  width = 25,
  height = 14,
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
      viewBox="0 0 25 14"
      fill="none"
    >
      <path
        d="M1.62109 6.19259C1.16061 6.19259 0.787312 6.56588 0.787312 7.02637C0.787312 7.48685 1.16061 7.86015 1.62109 7.86015V6.19259ZM23.889 7.61594C24.2146 7.29033 24.2146 6.76241 23.889 6.43679L18.5828 1.13064C18.2572 0.805028 17.7293 0.805028 17.4037 1.13064C17.0781 1.45625 17.0781 1.98417 17.4037 2.30979L22.1203 7.02637L17.4037 11.7429C17.0781 12.0686 17.0781 12.5965 17.4037 12.9221C17.7293 13.2477 18.2572 13.2477 18.5828 12.9221L23.889 7.61594ZM1.62109 7.86015H23.2994V6.19259H1.62109V7.86015Z"
        fill="white"
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
