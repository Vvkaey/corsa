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

export const PricingTick = ({
  className,
  style,
  fill = "#FF2626",
  width = 28,
  height = 21,
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
      viewBox="0 0 28 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    
<path d="M2 11L9.99978 18.9998" stroke={fill} strokeWidth="3.6" strokeLinecap="round"/>
<path d="M26 2L10.0004 18.9995" stroke={fill} strokeWidth="3.6" strokeLinecap="round"/>
</svg>
  );
};

export const PricingCross = ({
  className,
  style,
  fill = "#FF2626",
  width = 23,
  height = 23,
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
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
    
  <path d="M19.3164 2L1.99876 20.4" stroke={fill} strokeWidth="3.6" strokeLinecap="round"/>
  <path d="M20.2188 20.0391L2.35173 2.17204" stroke={fill} strokeWidth="3.6" strokeLinecap="round"/>
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
  fill = "white",
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
        fill={fill}
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

export const Tick = ({
  className,
  style,
  width = 33,
  height = 21,
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
      viewBox={`0 0 33 21`}
      fill="none"
    >
      <path
        d="M1.91016 10.9609L11.6458 19.0289"
        stroke="#34A853"
        strokeWidth="3.18824"
        strokeLinecap="round"
      />
      <path
        d="M31.1172 1.88281L11.646 19.0273"
        stroke="#34A853"
        strokeWidth="3.18824"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const GoogleIcon = ({
  className,
  style,
  width = 29,
  height = 30,
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
      viewBox="0 0 29 30"
      fill="none"
    >
      <path
        d="M28.1602 15.1433C28.1602 14.1349 28.0697 13.1652 27.9016 12.2344H14.5078V17.7419H22.1614C21.8253 19.5131 20.8169 21.0128 19.3043 22.0212V25.6024H23.9197C26.6088 23.1201 28.1602 19.4743 28.1602 15.1433Z"
        fill="#4285F4"
      />
      <path
        d="M14.5082 29.0414C18.3479 29.0414 21.5671 27.7745 23.9201 25.6025L19.3046 22.0213C18.0377 22.8746 16.4216 23.3917 14.5082 23.3917C10.8107 23.3917 7.66907 20.8965 6.5443 17.5352H1.8125V21.2068C4.15254 25.8481 8.94898 29.0414 14.5082 29.0414Z"
        fill="#34A853"
      />
      <path
        d="M6.54641 17.5211C6.26199 16.6678 6.09392 15.7628 6.09392 14.819C6.09392 13.8752 6.26199 12.9703 6.54641 12.117V8.44531H1.81462C0.844984 10.3587 0.289062 12.5178 0.289062 14.819C0.289062 17.1203 0.844984 19.2793 1.81462 21.1927L5.49921 18.3226L6.54641 17.5211Z"
        fill="#FBBC05"
      />
      <path
        d="M14.5082 6.2603C16.6026 6.2603 18.4643 6.98429 19.9511 8.38056L24.0235 4.30811C21.5542 2.00685 18.3479 0.597656 14.5082 0.597656C8.94898 0.597656 4.15254 3.79097 1.8125 8.4452L6.5443 12.1169C7.66907 8.75548 10.8107 6.2603 14.5082 6.2603Z"
        fill="#EA4335"
      />
    </svg>
  );
};
