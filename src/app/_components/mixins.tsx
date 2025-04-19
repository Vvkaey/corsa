import styled, { css, keyframes } from 'styled-components';
// ts=sty

export const GraphikFontMixin = css`
  @font-face {
    font-family: Graphik;
    font-weight: 300;
    src: url('/fonts/Graphik/Light.otf') format('opentype');
    font-display: swap;
  }

  @font-face {
    font-family: Graphik;
    font-weight: 400;
    src: url('/fonts/Graphik/Regular.otf') format('opentype');
    font-display: swap;
  }

  @font-face {
    font-family: Graphik;
    font-weight: 500;
    src: url('/fonts/Graphik/Medium.otf') format('opentype');
    font-display: swap;
  }

  @font-face {
    font-family: Graphik;
    font-weight: 600;
    src: url('/fonts/Graphik/Semibold.otf') format('opentype');
    font-display: swap;
  }

  @font-face {
    font-family: Graphik;
    font-weight: 700;
    src: url('/fonts/Graphik/Bold.otf') format('opentype');
    font-display: swap;
  }
  @font-face {
    font-family: Space Grotesk;
    font-weight: 400 500 700;
    src: url('/fonts/SpaceGrotesk/VariableFont.ttf') format('truetype');
    font-display: swap;
  }
`;

export const PlayfairFontMixin = css`
  @font-face {
    font-family: Playfair;
    font-weight: 300 400;
    src: url('/fonts/Playfair/Regular.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: Playfair;
    font-weight: 300 400;
    src: url('/fonts/Playfair/Italic.ttf') format('truetype');
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: Playfair;
    font-weight: 500 600 700;
    src: url('/fonts/Playfair/Medium.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: Playfair;
    font-weight: 500 600 700;
    src: url('/fonts/Playfair/MediumItalic.ttf') format('truetype');
    font-style: italic;
    font-display: swap;
  }
`;

export const HelveticaNeueFontMixin = css`
  @font-face {
    font-family: HelveticaNeue;
    font-weight: 300;
    src: url('/fonts/HelveticaNeue/Light.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: HelveticaNeue;
    font-weight: 300;
    src: url('/fonts/HelveticaNeue/LightItalic.ttf') format('truetype');
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: HelveticaNeue;
    font-weight: 400;
    src: url('/fonts/HelveticaNeue/Regular.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: HelveticaNeue;
    font-weight: 400;
    src: url('/fonts/HelveticaNeue/Italics.ttf') format('truetype');
    font-style: italic;
    font-display: swap;
  }

  @font-face {
    font-family: HelveticaNeue;
    font-weight: 500 600 700;
    src: url('/fonts/HelveticaNeue/Medium.ttf') format('truetype');
    font-display: swap;
  }

  @font-face {
    font-family: HelveticaNeue;
    font-weight: 500 600 700;
    src: url('/fonts/HelveticaNeue/MediumItalics.ttf') format('truetype');
    font-style: italic;
    font-display: swap;
  }
`;

export const backgroundImageMixin = ({
  webp,
  image,
}: {
  webp?: { src: string };
  image: { src: string };
}) => css`
  background-image: url('${image}');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  ${webp &&
  css`
    /* Chrome 66+, Edge 79+, Opera 53+, Android Browser 80+ */
    @media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
      @supports (background-image: -webkit-image-set(url('${webp.src}') 1x)) {
        background-image: ${() => `-webkit-image-set(url('${webp.src}') 1x)`};
      }
    }

    /* FF 66+ */
    @supports (flex-basis: max-content) and (-moz-appearance: meterbar) {
      background-image: url('${webp.src}');
    }
  `};
`;

export const maskImageMixin = ({
  webp,
  image,
}: {
  webp?: { src: string };
  image: { src: string };
}) => css`
  mask-image: url('${image}');
  mask-repeat: no-repeat;
  mask-position: center center;
  mask-size: cover;

  ${webp &&
  css`
    /* Chrome 66+, Edge 79+, Opera 53+, Android Browser 80+ */
    @media screen and (-webkit-min-device-pixel-ratio: 0) and (min-resolution: 0.001dpcm) {
      @supports (mask-image: -webkit-image-set(url('${webp}') 1x)) {
        mask-image: ${() => `-webkit-image-set(url('${webp}') 1x)`};
      }
    }

    /* FF 66+ */
    @supports (flex-basis: max-content) and (-moz-appearance: meterbar) {
      mask-image: url('${webp}');
    }
  `};
`;

export const gridMixin = css`
  display: grid;
  width: 100%;
  grid-template-columns:
    var(--grid-column-spacing) repeat(8, var(--grid-column-width))
    var(--grid-column-spacing);
  column-gap: var(--grid-column-gap);
  row-gap: 0;
`;

const shimmerGradientSize = '700%';

export const shimmerAnimation = keyframes`
  0% {
    background-position: -${shimmerGradientSize} 0;
  }
  100% {
    background-position: ${shimmerGradientSize} 0;
  }
`;

export const shimmerAnimate = css`
  animation: ${shimmerAnimation} 15s infinite linear;
  background-color: black;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(65, 65, 65, 0.3) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  background-size: ${shimmerGradientSize} 100%;
`;

export const shimmerAnimateBlue = css`
  animation: ${shimmerAnimation} 15s infinite linear;
  background-color: black;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    135deg,
    rgba(0, 0, 0, 0) 0%,
    rgba(2, 121, 232, 0.7) 50%,
    rgba(0, 0, 0, 0) 100%
  );
  background-size: ${shimmerGradientSize} 100%;
`;

export const BlueButtonCss = css`
  display: block;
  width: 100%;
  text-align: center;
  font-size: 1.6rem;
  padding: 1.2rem;
  border-radius: 0.8rem;
  cursor: pointer;
  border: none;
  color: #ffffff;
  -webkit-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  background-color: rgb(2, 121, 232);
`;

export const hideScrollbar = css`
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

export const NoiseBg = css`
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAB4GSURBVHgBXdzXziNFE4BhL2bJS845wxAWiQMu5L9sBEgcIJLIOefMwj9v6XusFiNZtmc6VFdXruo598wzz/zvtttuO/z555+nz6VLlw5XX3314fvvvz/ceOONh65+//DDD4crrrhinj3yyCNzr//d716/f/vtt8Mtt9xy+PLLL6df4918882H22+//fDKK6/MeL/++uu0q0/fDz/88OGzzz473HXXXYevvvrqcN111w0M9f3jjz/m+5prrpn7P//88+HOO++cOb/55pu5H/yvvfbazNHY995777SrfePX7ng8zvPuN3ZjmKvnXbUNPuu2vtbTVbv6dnX/wQcfPBwvXry4NWmfHvbg/Pnz0zng+v/vv//Ovauuuurw+++/z+/vvvvu8M8//5wGbZFffPHFLOzHH3+cZ/ULAXfcccfh448/nn71v3DhwjwPyOaoz6233nr4+++/Z47GaaG1v+yyy6ZPG9Z389WvPjfddNPMXdsrr7zy1LbxP/roo2nXxjRmsPj+6aefBq5+//LLLwPD119/PYhqM86dOzfra4Pvueeegac2iKtxG6s1Hffd3959993ZoQC5/vrrZ7CAr1OL6jfE/vXXXwNsnxB1//33z859++23M+G11157opIAbcK+A7bFNU7f3f/8889njp4FXOM05mOPPTYLaY42tu/aBlsfCwkJIS246te9G264YcaJ2iC0e5AXfK0pymvNUSGEBH9jNF6f2ofINqt+NjTYwlGUftypcUMJUUoA1zAkvPDCC7OTLTpgQ0QDtIi++7QLTdS9FtpEIbmdbaIWELD9DpAW39WcUUp9oyRjoYD69f/uu++eNiGl+y26MRq/qzFbvAXipMYP3p4Fe+NF9SEz7grhzd+6e46aQ0ywNEdjBU/rqX/3u9eY9R3R8Oijj241RmV2px188cUXB1AAQ2wD2PEADXmolyyJHRqr36im3a5vSGgxAfPQQw8NdTV3CGqO2C6EhLjmaQ6c0BUstW9h9W+OntmckFRfIoE81r97iYyQ1RjBEqU1ZzB0v982rd+tIXiDvfshveu4C/gt0m23GowiaZCnn356OoSoAAqpYb4FBiR5U/92J4C7GqdP99phQjkKDaAW0Jj1DfCVDaOE+jYWdgyWrvq02J6j3vrXD/X3OziTW43ZveZDvbUPGWQ7MdVzSLr88stPrIy1axNemieqB8NlUVsNGqgJ+t13GrGFt4A69p9WpWUboN/JvyamrZukyy4REbRd37RrgKal+94tghNV97x2LQZ8zTe7vsNHrLAStH/ggQdmgRRgsLURYAve2r300kszbuuoXfPWL0IKruZtHf2vXURT3+Re3wjruN/Y3njjjQEkZIbpKIKWbSd71k42WOzT/do0QYM3IfnQd+xMqdSmnQ6g+mLvvkNIFNNiA7DfWK/dx/59N2cflBNcIT4KaQ5ihYUQTLR7SrLnqyhqrY0BGa3v008/HUQHV0in4fuPqxqzNeK8407uG+ojoAOE1k2xBDBTpSuA69NALa6rPgEVoLFhCOt595uUmYDV2GMQ3LPYqN9RSgvtXovE8s3ZJsaijWsjuurXWLXDfiubthGNGYx9t9lZELUNztph8wimzWlTiQ0auHnDCTNob3/c0nQ1tONhmsypw3333XcS1C085HQR9JRFbWP1Dz74YBaZjOxZhnJ9+h8yAxQ1BbBxm8/8ZFzfqKvftU07rxTXwhjl/bfZsVvwfPLJJ4M02jjkRJkhqD40cHCFi2C0gcFJAdWX0xGVB89x77CFiMwVCMRCqw2W1R0gq83V4E1U/75bBBuQLKO1G7PfAdDVPMmiAIndk10UWIvufkjHyhYRBaZ5bZr5afeuxutZG//mm2/O/SeffPJEFG1QY/dpvhATPLFtfdmsTLUQTyElM+sTJQ8F7ovdGrjFhfHYpwlavM4hkWdg0iZr59q1FtGu1p4mD+HvvffeSa6ikADrqm3z1Q4FkEXJrNrXlqZvgcSETex37AmxNCiE4BYynUfFmGa21KZ1xjmoPOJoHJ4K2U8MYOcxY3rQIFHYE088MYNHHTVqkgYiq1BCz5JP9QsBbEkWfIAFTIKZVu5Z99hX/Y+6Az7A4oIW3eb0CcC+gyd2D85YD+UFQ98hn3Igr8nBFkuzhghmTHO1tpDefVaEDWBedbXJrcNGd9Unaj0+++yzW5MG+PPPPz9A212GLD+0RbD3AI89IZHQT75wowI0ymbsNleCuH4Z15Aa69eX8c5u66pt49UvGdVCQibZ1hjGDOYoGKu2WBYDBZasq1/zheA4rn79bxxUTixxBYMnOPuuz3Ff4AQTApirRn71O0rpE/IS3t1rYYAOyFjRGAGLjUNeY0JqCAjRfUIwxdH/lE5AMWijzO41Xu363QLIYQpj2OhMEYW8ZNT6v3kbtzlaQ7CwJMjy5HJra47WxeUMfragzWiMNq22wXDcJ9r6k+BuQiRNFjVBC68x2y9516J4FyEDSwYwTdo4fWrnP1sPmxHs3evT/PxkdmcLaQ5uWvO0aT1vzFiMbMaiEM6zEYURcCAvG6u1N16bJvBQv/DBOmFq4QjhtdHCPcxO48RzpfodIiPjFlW7tGUTMTO62tXIHttSJlhTBKb/DOp+t8iAFaAQGus51gspyb6oqj5kLQ3JOGY8x15ga+5kV2Oz90JMmx+lNUf9mrc18s/JaNTWPUqQ18KcOu7G5Maew3oCAi2OtS/q8fbbb58iGA3GJAnQdijghLwsKuTVnkch4kMrB9D7779/Mn9ozTYlGRmixeh6nvCm4PoOjuaz+dw4DsHKfn2YK41JsYSokJtctWE8qNb1+OOPT78Ire+or3Ufd4raOMq0DuEqTvb666/PfQGGJgzY7LGAizWyufjH4nYCELVho4m6xDbkKC2L7WLJriia2GhxNC1KonXZZuPcn3lHIY9bxgxJfpLXwUB+CyTXJ1haJ/NHoKTxP/zww2kX8oI9+I67A79FNeJoadwQkhUfabOXBFGxhpB47NvgtWvnQgKzocn6ze4TmWG71UbU2jcB39yEOK0vBN/GhYwW2WIbp40mNtqsnonOtNkCGs1PnLDtosa8pcY3FtuQJ8J0Yl+KcB/3hlsDclvW6EW/A0LkIWADgglAwHdhfwZ3z9plmpDCiC0tIuQkR1oM6hFcFXvjFcitiOKwMdmXOKcxm1uUu/FCXm25oEw0sjikJELyjVkSPfc/Sgs3wloCKMNZTz311BjSlEZAhrRkXoCtYfMQ0SdE9gkpdroPABsnZUNAh9Se16ffUWbfUVLjByi/NKQ3d0jmntHwISNYCXEiR+CAL20T6rvmRFqbKJPgA3HFh15dWJxJdto87D226r4Dm8kCPOpq0SzzBm2CWDoSr02AiJeF+HaRCAi4kBcCmqDdj+rIoz6Nw51qF2vbgmT2BA4sTHwy15Cl0Ng2jiKpT3Pn/yIAyANP1MWG7EpprGYV7S5lgBqDzXjNKXp/3J3srV1JdjUpFog1QwYS71mA81FZ7e12QjzEB2SIZWg3Dgu/Pj0jEwOMDx5LsbtsXP1iqxDcwmJB2j9xQ2s2V/1r2wJDcgs2poiNcJm10aL1Y1TT4ODDMZAIxtZrrIkH1plP2QMarIlFYxvIglGmMFe7SMaIK7IRu8c9Y1i3Me7Vtv4hjhgJSe1yi7ao1R7kIqbA6iPFQF4WeclWpXzAK00p4tJm4h4575BKmbEFQ7D8N1anxY87oJOVQ74teE80nTRN90R9My+i1hZRmyiu5+RcfUMqQxwlrNHn5B0zAXUR6GKIAcuvTlxIi7bQ/vPRY2seQouWR8nckG4NVt5NV/DT+s0TNa0RchvUeutT+9bPC+p/lkrXyMA8EdqLYG5HowoJZbsVolpAE4SoLnkLwQRRHDZf/wMgCpWMEdgMYQKVq5HKTGrckMJCkOkT9eGjGpP8Ijdl40JMFF24StS69bXpwb2KlJCtPTHU+FICwnEhciL5O4VMSD/EWCzXDEAB0sDYxGBNlCPOKY81GKoBGAKFhaIWiiqqREkiLy2m57J5LUyORXKeG8ce443QnthKyEu8UlyT9gyWYOXZ2IzWLAZpnQzz4G69eSR5Y1kQbci4cgEe0gQK5RKiCDlYOQmBxIAp2OASkSbr6hMCYvv6Nj4WUcNC8wWgpFWsR3Nis+63gDYwGdbzNpsxzjVs4VEumUe7hmxaNLETNbc2IqA2vJ/s0u43ZkgPyUw7wVgKdGRgCKyh5DdjUXQ47RqyJJi73+4JZTFzyMvaJcC7AlQsDSUwxmnsEN58AdnYcsu1I4sEfAnz+jaujFkboJyDd7PO07zqYWwuZUG22ojkntBelMzWRUQqF5heo0RWt0etSI2FhpRIQKxsvpzHWk+CrWqvDCJAIUyVgTxx7Vs4B5/5ABECAXxWyMaqFkIsrIiXXK9dz3k3yXi5lFU0RTzMqPoLdrRJzTMR6L2/zGJzHXfARgYKNEKC8HtAxesyddhYwrtv1KefOFqXDVCTkkEuqo09AjolQ0PXlmbEmrGwhL7N5CZKOyiIEhVqLiG5YJBPEe/sN/9etVWEwQFAmVzR+rNrEyWzZskc1j67qEUEbBPLmFHdroAUua1/COqSzQ8BtWlcFQAhXL6VbdaC+lbv5wqW2oQQ/mfPG685Jhpy5qfXJiQ3XxvexiSja28eMARX/bE+W9faeCsMetq8duFCfjqEXr4WHQZMDwDVM6bKxP/PbCo2E5nRwIKdGbGQU3usySB99dVXTy7bmvBBsc0ltxxS1kXxYtooYSqbyrXCpsYzv9xG44Kl+fstC2guscue2VywIbY26+TKEcb4O7ZTDepeg6S+V6phYAZA2q8QU2wgrSgqUqgodk0MqHhAuRLYsZTkT2P1iZ1USyXHsj2DKXZvDhUVREafkM8uZIaQkc3L/OlZblz/iQlwqMYS7BU46Hn31VO2kef2xf0vJERtyniTHUi43++8885pR1Fs92uPOiG2/lFBkwW0cJCyMDvdOPpgXdSNgrhPjdMm0O6MdNpSDFJFAmLQxjfK7RslCUKAy4c7J9EfjOBHvTPGvrMbIUpeKJtoJ/F/jZMrosctLCqJKvm7ki9ShVS+GhjamSKSq+BxkKkZ521K1Bdy5ICVpcmBiGxz02hutSwrwvqfScY1a7yM4ai5/oLHxI4yZNGfEMY/Vy4ytTQ7W2wMWwU7Juh/SOPMh1DVUuyqBplS133iEJY1r24kxKTdQ3QaljOubFbMjcFMY0p7dqneokmjABFj7CmYy96kKfnRKlBxhgqLVaM3Vkhaw/VSnswZ1oqo+sj5fRe2Gisq5GEkc9oxgwckE0TIXNQ325GVHnI43f0XAO0KYK6a9iFuLbiU9gwJ3LPmVbwufFZ7scA2tTXk5AuWKgSl4KKaYA5W9mmwpGDEAbqn1lFJn+AqLiJiIojJSVcfyJ+0S02EMgj5BrbQBrFTteUqSUw1ASWjVAKl1C+2kZVrTvJLiF3Fl2CEKlRFkHK55Jp6RWE4eZu4Qbked5JGFwiur0oDMIosSZlSiIIkXQzuuZNqV+FJ4DonoaRVVo2QTdtqH1I8Y0Z0PwqoTWOou8Mmqg6SoV3GwLr1Y1a0gfWlrBjZlA85Lc1am+6pOA3ZbTB5acMUeyqsUqWvanetgKXwRNUl6I97g00n1QeEvOQRTWVBaxREBk0yHAUpp+W6iRtSMpIzKp7sPNcLRSaD+q3OOqSQw0rV+OB85WAO9mRy2puoaf6oMES2eMFh/jIqTGREIBRWc9Sne8JfbNfj/mCjNSVMGLAqDbBUbeQrkLcUQJNx4MnSFiJywQjGsjR3SCESsHjz5SqBKRi2bTvJzBZOqOujHNfCuFshvPGFrmLXuES6INtyEuRn9q7kf5soQ8nLCV514+T1KBHxfgFLk63ad7W9aFSCv8mc7JGsiXKwAbdOsRHHXxyuRdS/cdbMnzlid/G7FiBxL5EvmYUjKAR24lpWwsivfTCGTFbBGmEScZLYinKdpqoYPmXU/6FALNGuoAoh+f4rJBKtlSpchW3PYxsBAL6mQzcMUskYuQ+ldexIfqnQfn3s/JotU+3Apex71ZyNox5aMiqKQQAhRGUtj0sSrLGi3v63jjYl4qqmkNwOrtENhbOwYkCp5QsxAaK0jIUvKqwswoGU7mdcdjFxlIpxt5gYARErURRC8C1aVEaFaAgn71ASTc+8CDEiPAKxQvw2a/XtHXUIXlWucWDtHLJJ3kmCiVBh46jTsY/jLls2CeaAkzBX69ykECDyy7RRgc/wFlOkhOQS2tUiviEDkuw+2Ym1iIzYaz2ihQv6T/irfG1BISDEhRh1OYqDarcGb1uHEjg2JI+pq/nqsx4JC6HB3hqYa+FnKFD9Hx/XESpaS+UTUheX675EfIA4HooCArrnApsB6kwdG1MZGxsvIBnhNkXYXT0LI1t+ujEFNuReUGVXbCi+6ezIeqbEuEww0Rf1jzy0NipCCFeVQo+Pv+/cJozuEF0dpC+FwKX5uFQBEZIYxSsQinkYnNiL5maUKoMT7VBuEVJtqMJwyEx4C/HH6ozfdRyHfZQgd08pW8Z1G5qMU05CWTpBUP/VhVvv18cRtZHLa9SCwUjjRuKOZ7mYAjRsk4jeGMshZjYZA7WMljjhmqu188SFI108DXFKrMsgJ0NDam36L18imiOmpyRX7iSWFHHKIuDPr2KhsfTrd+0Y3I3beo47+c8xB6F4cbqASOsUIFWN347yVbtQbvdjHZkupbMtmpvkMA3rHwur8xMQqG+eEblKaaxIbQxxy2BUoqz0LGqL0tbTlqpSmzPuKTTW/USVIiL1M8QDFqeE1POgzBFp+0SbjH+TNjCNy9tocUyA7rf7yRJeSoOKzDQoR9tRU0qpXRZkVenExFlPysuAKd8IMeSo47VcSka/OYJZhQPrwMkjVB6lJsv40KIrCurXLCJfmTZ26DB4hmo7aCN+pvKgXelei7x0VrEfpbDxZNr8Vw7837ypgzvMixYjCBGSxPzU1JDDzS2EpUZb4CGZSwYyZxyHEBBpnoLArYUB32J7VrWtU/lO2su11CZYyWhsK3AQlTeHwO9QYEf+G5j/yF8NUCW3SiiweQtwvED01mJl7NlvKLXJ+ZWS42eH9U52oMOK2JVNJlzv3IaIc//JO65g88r/0p4hRkERGcd+5W1AShvbGqI0qQcWALkpqDGbV2mHxcdufasiyDOhgcXw2FfYwRF/6UWRDQdelJEJKQneivwS4iGL0mEnSi/QtLyVhDdXrvHZbCwINdVqX7wDwml85SuQIX0pn0x2sg3lqhsjmGn5Oe66U8PWg4AJKOaLoIIgqXJZrB4VNTEtLU9Me6UZSwGuWlyJWmOEJLLP4Rl5B35yn1gueJq7cRUfReWCE+s5X8Y0+1IFfmuLgtaT9HEcM2s9Gyi2KNGljbpCZ0nGEwmB6vLU7smFyo0otgzrnHYWvYT66ngHvMCAk46e9S1Dln2ldI0mhjhFmoKZ4BP4SNkZR5K8/+COem2apJCI+npCvb4O8jjfJ2+ziglFRn1aezJ2RMk+0OYIgZK21TvA72qgCVZa02EVp9tpuZBB3a9v1FC0WVvKRGFkgLXYnHWyR+W/o2BFbtaXRQiQshQoptbUAuMIGnp9O0hjycPUnpxT68gMk3922knUxrrnrR0OEa5pPfYd/7WdXRGNbZgbsYPTRqhISazIBWpVsBmAMnWCDs3XlYhIDDgg6AhaxZOOqa4LFRBwFEuYSxkyCkaZUqfkIDNJ8HStQ+QDK3EmHyeOuPt0W8iRj5BbVfTTs3bcQhzLpzDkZJWrRaGquGxE7WKR9fxZ3+0iwxzF95u8unjx4vRVghwc+aAORcptqL/hCFACQlGNFXtnnypggljtCtgmi/vd/QghQmn97EWHflT8jxkTC/P9JLyZCzRQ90RlyYW1Xk6ML4Q4a7IWGfVJoQjTszHX16Dwd1V6UQBtjHdlhQQFm+uLcKRZQ6T6Hr4zxSMg0SZg++SoiLiUaXLSWFK9ZCgPq3EiiClCRSleNtYbPCRnnCtrgnaxSyFRAzgCyzr3DoSQ1eRzGO8sFMaGcpZEjqJ2CoUknJRNCNVL6JS2FEB18IbvTC7XdvWJvT6qDXOkNSQFR99r1EUW0DpkGrF7x9y8FqbXUw0F7i7NRniq/XBQMBK2cKZElCCfsRrDUYRTnFKJFaKfPzvTG4XXtvEALO/rnTAMWshr0d4D0/OUy3/PhlB6Ag0qHMh1kWyhLW2japrXGzpo+XDResQyrS+/W1CY3z/BBBl4BY9RBO0oHKSSySUQIA9B+BPWKgQEQrtEN5zEdByC+8Reo9VVD6yvpFvLj53fUyBE0POFIwDvf6iPE+0K17mXRI1C0/pEafx/Gr8+baiTnuOCPvfcc5sTl0JMTSQG1qVOBkt0OQcnMCB6IczU78ahwWtL9kCaoCxzgZ3VqwdEa0Jym5pWFkBtIWno9aU5Ynt886iKQsElXiLUxkdNiSOwOxbL21GTw09uvW2izKPI1HEHfoIJLdwbK2IZzjkPBIKEsrhMDdSOxK6OcHGjuhyGSXvKmTSm2ueAbrFOljsKBnAKZw02rGE0hxfXhBW4ldMpVupZG8EwBosMm0CuIKt0AL+3tsJfRXMGrt2v3BiYIScXCcupVZZvdcRKSpBmK3ktOsGnDNmoRDwNwhLebDSuHe0qeMAFCxZFSo6b9VFi+/LLL588npCwxhCxrqiNo7ny0grM2Z+OeagJlGwnJsQH2MaDwB0RG7YSDhLNJft2Nj/lM9heyjjWHAgK6pu/6K0aXU6FKhL6rwspqqwoCRuK/7FTu0K610mJ9oQgCOY51M77YCSulLFxHtoYcT/whSTvUchJ6GJF8KcH+bs63tYcgBPbXlboPQZKMFjuChtpWb6luFqLgVBnbSXhVYJl2FYJ1qLkWNhZAgMqJHg9awpCPrs50+7BzmaUwfMWEOVuIbPEeCc6+flgFERgqrTeuCsYyX6mjVOr44moAGDzMBNqkO9JpfNQ1hOQ3oUVskSiuTqOU4lqyzVjYUjnRzOilediP5tpg+St+ewtNLuMyyeyXR8wgDVkpbysTzxyPabhjFzIchbPoUaFS23U2MQ7ABvbyQkkR7aE451YwgZRa30CEiUJ6xPyARdSHKV1XHUtIYNkWTzn01IMUTi3kMnDL+2/GKWEt/F4R7WJ2viscyzrrDi8uZRpMLjb1OamZFaTJzw44+K7jRorofrAJuG49zuZ520ZbCRHFXoeVaqNVotX30jdUQYmCqRFlWkwh/VWrdrFl2ZisPHUtgilr/OJsohmd8+ZFnUwKCvEMOKjHKJDOsKhIuJIIoxjsaZenTme8pJC+gHp9E/fUaBKd2FwEV9aGZvLH5BJklGCAirsAeoNG0JPqgSYG80tCtSn/068q7VRlxPiGNFeEeBljM2zHhoSpXFsi2xczwKu5wCVkqwlyBFTlLoekZ3KBAWQa0kDn1NQQPJ6fXEOrQR4QUbCX7mv3MMaYPBy6zZpPdhHNjqAWJQk/5xcZW6tr2oRRVcZxjdPe3prkmg4G3VNjHkxBXm9htysl6elClb4f7JyMviEMFJuUvdUuzsbbELHuAJGMSTWQbEoWc4V4pVfKClrgc5xsL2K/4UMx8sunL0SylkVLtiawyBLvbzWydGed4+tl+xWHC+oil3J8USVMjgZR9p+amoUFYUc2kUJrAoAgIpSdCVPal+CR7DTa+sUK8kfOEPsxWAqm7x0B9XVTyQ6BIkArRGSLvUvIi8UANmqMJxV4cgaH1ilw1tvvXX63xXCpAWC21ua5IjWcmGKZ6IxjEssLFpRBwklYWzGKVeLZ+JogmBku5gRyuPw2jgmEHOJeGAcCwI0d4trTkFbNdtr1Hw9Wc84FqtUVuyMh8QUls70UaRJrjpPotieKaVWUBSq5/PSi9KadVxtwS7Ct8YNSBtyeboEHx27d2BGOUUIUBHVJrXDa3FQ4yhL8wYOSXkZOmwpPCVrth5rVVnA5GAU834cz1fMScMHZ1QmXcnKULyuFM/bi6I+MLFX57irgym0DfaSs2jgtCHD0xsuHH1giihL62rXGbMAQimMcol7ofwQwKCOWoW4KIm+M0fq26bK7zItyGWLVz6yFoEqPXa2T26adQG50g44DQt3n7wckRELN4FqgLDLAncyCVWt5RQthEngAE0Ux2eWkQvI9fV3QmaKHVG2CghBTCcDVM6iKIEPZozgrgJ01baoGXF4owdjP7gcLhdUUPEAoSwI+XHBEFGZnv0fygfMwrlTq9QAAAAASUVORK5CYII=')
    repeat;
  mix-blend-mode: darken;
`;
export const GoldGradient = css`
  // background: #f2d36f;
  background: linear-gradient(
    70deg,
    #915e08 0%,
    #915e08 8%,
    #b1852a 14%,
    #f2d36f 22%,
    #f2d36f 29%,
    #fdf4d0 32%,
    #ab7309 53%,
    #b17b13 69%,
    #dfc063 77%,
    #fbf1bb 90%,
    #905d07 100%
  );
`;

export const Sup = styled.sup`
  font-size: 0.35em;
  padding: 0 2px 0 1px;
`;

export const ReactSlickDefaultStyls = css`
  .slick-list,
  .slick-slider,
  .slick-track {
    position: relative;
    display: block;
  }
  .slick-loading .slick-slide,
  .slick-loading .slick-track {
    visibility: hidden;
  }
  .slick-slider {
    box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
    -khtml-user-select: none;
    -ms-touch-action: pan-y;
    touch-action: pan-y;
  }
  .slick-list {
    overflow: hidden;
    margin: 0;
    padding: 0;
  }
  .slick-list:focus {
    outline: 0;
  }
  .slick-list.dragging {
    cursor: pointer;
    cursor: hand;
  }
  .slick-slider .slick-list,
  .slick-slider .slick-track {
    -webkit-transform: translate3d(0, 0, 0);
    -moz-transform: translate3d(0, 0, 0);
    -ms-transform: translate3d(0, 0, 0);
    -o-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
  .slick-track {
    top: 0;
    left: 0;
  }
  .slick-track:after,
  .slick-track:before {
    display: table;
    content: '';
  }
  .slick-track:after {
    clear: both;
  }
  .slick-slide {
    display: none;
    float: left;
    height: 100%;
    min-height: 1px;
  }
  [dir='rtl'] .slick-slide {
    float: right;
  }
  .slick-slide img {
    display: block;
  }
  .slick-slide.slick-loading img {
    display: none;
  }
  .slick-slide.dragging img {
    pointer-events: none;
  }
  .slick-initialized .slick-slide {
    display: block;
  }
  .slick-vertical .slick-slide {
    display: block;
    height: auto;
    border: 1px solid transparent;
  }
  .slick-arrow.slick-hidden {
    display: none;
  }
`;



