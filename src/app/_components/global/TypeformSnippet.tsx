import { useEffect } from 'react';
import { Widget } from '@typeform/embed-react';
import { CSSProperties } from 'react';


export const useScript = (
  attributes: ({ src: string } | { body: string }) & {
    options?: { [key: string]: string };
    head?: boolean;
    onload?: () => void;
  },
) => {
  useEffect(() => {
    const script = document.createElement('script');
    if (attributes.onload)
      script.onload = attributes.onload as (
        this: GlobalEventHandlers,
        ev: Event,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) => any;
    script.type = 'text/javascript';
    if ('src' in attributes) {
      script.src = attributes.src;
    } else {
      script.innerHTML = attributes.body;
    }
    if (attributes.options) {
      Object.entries(attributes.options).forEach(([key, value]) => {
        script.setAttribute(key, value as string);
      });
    }

    if (attributes.head) document.body.appendChild(script);
    else document.body.appendChild(script);

    return () => {
      if (attributes.head) document.body.removeChild(script);
      else document.body.removeChild(script);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};


export const TypeformSnippet = ({
  typeformId,
  className,
  style,
  frameTitle,
  trackingParams,
}: {
  typeformId: string;
  className?: string;
  style?: CSSProperties;
  frameTitle?: string;
  trackingParams?: {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
  };
}) => {
  useScript({
    src: 'https://embed.typeform.com/next/embed.js',
    options: { async: 'true' },
  });

  return (
    <Widget
      id={typeformId}
      inlineOnMobile={true}
      disableScroll={true}
      data-tf-iframe-props={`title=${frameTitle}`}
      data-tf-medium="snippet"
      data-tf-inline-on-mobile
      data-tf-background-color="#ffffff"
      data-tf-text-color="#000000"
      data-tf-button-color="#000000"
      data-tf-hide-headers="true"
      data-tf-hide-footer="true"
      data-tf-progress-bar-color="#FF2626"
      data-tf-progress-bar-height="2"
      data-tf-progress-bar-position="top"
      style={{ 
        minWidth: '200px', 
        minHeight: '200px',
        backgroundColor: '#ffffff',
        color: '#000000',
        ...style 
      }}
      className={`${className} typeformSnippet`}
      tracking={trackingParams ?? {}}
    ></Widget>
  );
};
