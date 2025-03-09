"use client";

import { NO_HEADER_FOOTER_PAGES } from "@/app/_utils/constants";
import { GlobalUIContext } from "@/app/_utils/hooks/globalUI";
import { useWindowSize } from "@/app/_utils/hooks/useWindowSize";
import { usePathname } from "next/navigation";
import { useContext } from "react";
//  import Cookie from "js-cookie";
import styled from "styled-components";
// import { useGoogleLogin } from "@react-oauth/google";
// import axios from "axios";

// const GoogleLoginButton = () => {
//   const handleLogin = () => {
//     // Trigger the redirect to your backend Google OAuth endpoint
//     window.location.href = "https://corsa-backend.vercel.app/api/auth/google";
//   };

//   return <button onClick={handleLogin}>Sign in with Google</button>;
// };

// export default GoogleLoginButton;

// export default function LoginByGoogleComponent() {
//   const handleLogin = (credentialResponse) => {
//     // this contains the response from google you can get the token from here
//     console.log(credentialResponse);
//   };

//   const handleLoginError = (err) => {
//     console.log("Login Failed");
//   };

//   return (
//     <GoogleOAuthProvider clientId="<your_client_id>">
//       <GoogleLogin onSuccess={handleLogin} onError={handleLoginError} />
//     </GoogleOAuthProvider>
//   );
// }
// type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export const Header = styled(({ className }: { className?: string }) => {
  const GlobalUI = useContext(GlobalUIContext);
  const pathname = usePathname();

  const { width } = useWindowSize();

  //  const router = useRouter();

  // Define the types for parameters

  // const axiosApiCall = (
  //   url: string,
  //   method: HttpMethod,
  //   body: Record<string, unknown> = {}
  // ) =>
  //   axios({
  //     method,
  //     url: `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
  //     data: body,
  //   });

  // const handleLogin = (credentialResponse: CredentialResponse) => {
  //   // this contains the response from google you can get the token from here
  //   // const dummyResponse = {
  //   //   clientId:
  //   //     "880077192347-kupu2lb9s20k3t0rl9rno3e96b95uqgn.apps.googleusercontent.com",
  //   //   credential:
  //   //     "eyJhbGciOiJSUzI1NiIsImtpZCI6IjI1ZjgyMTE3MTM3ODhiNjE0NTQ3NGI1MDI5YjAxNDFiZDViM2RlOWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiI4ODAwNzcxOTIzNDcta3VwdTJsYjlzMjBrM3Qwcmw5cm5vM2U5NmI5NXVxZ24uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiI4ODAwNzcxOTIzNDcta3VwdTJsYjlzMjBrM3Qwcmw5cm5vM2U5NmI5NXVxZ24uYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTc0Nzk3NDM5NDAzMjEyNDMxMjMiLCJlbWFpbCI6ImF5dXNoYjE0N0BnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzQxMzc0MTI0LCJuYW1lIjoiQXl1c2ggUGFud2FyIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pnQl9YRkwyT0kxeUZLN1BGTldYS1VSOGxyV1N3eHREQTJkRDc4UDBpV2hvQ0NRQT1zOTYtYyIsImdpdmVuX25hbWUiOiJBeXVzaCIsImZhbWlseV9uYW1lIjoiUGFud2FyIiwiaWF0IjoxNzQxMzc0NDI0LCJleHAiOjE3NDEzNzgwMjQsImp0aSI6IjhiOGY0NjMwYjM4OWZhY2FmODE5NWIwYjQ3N2RiZTc5YzU3MzUyNTIifQ.FtJ666S34UJK7HmL-PpXzor7Ru5_SjvAElFUW3pHDb57n35eAvRuO_8wCsQ4DKfDXaOD-SWyPAmDqxThyFY8sub2JIu-q3N9gh_hGRhOcpV7XLipqF64fAhFcc-ONNrCHdUajrUlDkdZ0Vh2WwVVukb83Ix0D61QB6BXTM6scMyFFNaQQnd7AELsuFRnULjJiPtLWw8BDnTUBMAf9x9VmKEnr7-JV5FxlKUIPbDHDl2WEACMPuE_N5Z2fduYFSOwbwju0ibnLRzaPs8efqAsaLfRLm1zIEppMr0BSVEbTandjuLFhZR3x0QD2If5v0VibCKXdRg2kgzC4bYdiDujBA",
  //   //   select_by: "btn",
  //   // };

  //   const access_token = credentialResponse?.credential;
  //   // axiosApiCall("api/auth/google", "POST", { access_token }).then((res) => {
  //   //   console.log(res);
  //   //   const { user, token } = res.data;
  //   //   Cookie.set("token", token);
  //   //   router.push('/');
  //   // });

  //   window.location.href = `/api/auth/google?credential=${access_token}`;
  //   console.log(credentialResponse);
  // };

  // const handleGoogleLogin = useGoogleLogin({
  //   onSuccess: async (response) => {
  //     setIsLoading(true);
  //     setError(null);
  //     console.log('response : ', response)

  //     try {
  //       // Redirect to backend Google auth endpoint
  //       window.location.href = `${process.env.NEXT_PUBLIC_BASE_URL}api/auth/google`;
  //     } catch (err) {
  //       setError('Failed to authenticate with Google');
  //       console.error('Google authentication error:', err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   onError: () => {
  //     setError('Google authentication failed');
  //   },
  // });

  // const handleGoogleLogin = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     setIsLoading(true);
  //     setError(null);

  //     try {
  //       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           access_token: tokenResponse.access_token
  //         }),
  //         credentials: 'include' // This is important for cookies
  //       });

  //       if (!response.ok) {
  //         throw new Error('Authentication failed');
  //       }

  //       const data = await response.json();

  //       // Store any necessary data in cookies
  //       if (data.token) {
  //         Cookie.set('auth_token', data.token, { secure: true });
  //       }

  //       // Redirect to dashboard or home page after successful login
  //       window.location.href = '/';
  //     } catch (err) {
  //       setError('Failed to authenticate with the server');
  //       console.error('Authentication error:', err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   onError: () => {
  //     setError('Google authentication failed');
  //   },
  //   flow: 'implicit' // Use implicit flow to get access token directly
  // });

  // const handleGoogleLogin = useGoogleLogin({
  //   onSuccess: async () => {
  //     setIsLoading(true);
  //     setError(null);

  //     try {
  //       // Redirect to backend Google auth endpoint
  //       // window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
  //     } catch (err) {
  //       setError('Failed to authenticate with Google');
  //       console.error('Google authentication error:', err);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   },
  //   onError: () => {
  //     setError('Google authentication failed');
  //   }
  // });

  // const handleLoginError = () => {
  //   console.log("Login Failed");
  // };

  const isLoginPage = pathname === "/login";

  if (isLoginPage) return null;

  if (GlobalUI.liteUI || NO_HEADER_FOOTER_PAGES.includes(pathname)) return null;
  return (
    <header className={className}>
      <div className="nav-container">
        <div className="left-pan">CORSA CLUB</div>
        {/* <GoogleLogin
          onSuccess={handleLogin}
          onError={handleLoginError}
          auto_select
        /> */}

        {/* {error && (
            <div className="text-red-600 text-center text-sm mt-2">
              {error}
            </div>
          )} */}
        {/* For Desktop navigation */}
        <div className="right-pan">
          <div className="nav-items">
            <div className="nav-item">Newsletter</div>
            <div className="nav-item">Apply as mentor</div>
            <div className="nav-item">Q & A</div>
          </div>
          {/* <div className="highlighted-nav">Contact us</div> */}
        </div>
        {/* For mobile navigation */}
        {width && width < 992 ? (
          <button className="hamburger" onClick={() => alert("ham clicked!!")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="26"
              height="16"
              viewBox="0 0 26 16"
              fill="none"
            >
              <path
                d="M1 1H25"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M1 8H25"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M1 15H25"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        ) : null}
      </div>
    </header>
  );
})`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  background: rgb(0, 0, 0);
  backdrop-filter: blur(10px);
  font-family: var(--font-geist-sans);
  z-index: 10;

  @media (min-width: 992px) {
    background: rgb(0, 0, 0);
  }

  .nav-container {
    margin: 15px 24px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;

    @media (min-width: 992px) {
      margin: 8px 40px;
      border: none;
    }

    .left-pan {
      width: fit-content;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 5px;
      color: white;

      @media (min-width: 992px) {
        font-size: 28px;
      }
    }

    .right-pan {
      color: rgb(255, 255, 255);
      display: none;
      flex-direction: row;
      gap: 43px;
      font-size: 20px;

      @media (min-width: 992px) {
        display: flex;
      }

      .nav-items {
        margin: auto;
        display: flex;
        flex-direction: row;
        gap: 18px;
        font-family: var(--font-fustat);
      }

      .highlighted-nav {
        margin: auto;
        color: rgba(255, 0, 0, 0.65);
        white-space: nowrap;
      }
    }

    .hamburger {
      position: relative;
      background: transparent;
      border: none;
    }
  }
`;
