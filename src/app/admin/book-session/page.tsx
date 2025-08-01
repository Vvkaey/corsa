"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/_contexts/AuthContext";
import { useAxios } from "@/app/_utils/hooks/useAxios";
import styled from "styled-components";
import { maxWidthContainer, responsivePadding } from "@/app/_components/new_mixins/mixins";


const AdminContainer = styled.div`
  ${maxWidthContainer}
  ${responsivePadding()}
  min-height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const BackButton = styled.button`
  position: absolute;
  top: 24px;
  left: 24px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 12px 16px;
  color: #ffffff;
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    border-color: rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 768px) {
    top: 16px;
    left: 16px;
    padding: 10px 12px;
    font-size: 1.2rem;
  }
`;

const AdminCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 48px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  @media (max-width: 768px) {
    padding: 32px 24px;
    margin: 16px;
  }
`;

const AdminHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const AdminTitle = styled.h1`
  font-size: 2.8rem;
  font-weight: 600;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #ffffff 0%, #cccccc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  
  @media (max-width: 768px) {
    font-size: 2.4rem;
  }
`;

const AdminSubtitle = styled.p`
  font-size: 1.6rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 1.4rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
`;

const Input = styled.input`
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  padding: 16px;
  font-size: 1.6rem;
  color: #ffffff;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.15);
  }
  
  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%);
  color: #000000;
  border: none;
  border-radius: 8px;
  padding: 16px 32px;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 16px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(255, 255, 255, 0.2);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusMessage = styled.div<{ isError?: boolean }>`
  padding: 16px;
  border-radius: 8px;
  font-size: 1.4rem;
  text-align: center;
  margin-top: 16px;
  background: ${({ isError }) => 
    isError 
      ? 'rgba(255, 59, 48, 0.2)' 
      : 'rgba(52, 199, 89, 0.2)'
  };
  border: 1px solid ${({ isError }) => 
    isError 
      ? 'rgba(255, 59, 48, 0.3)' 
      : 'rgba(52, 199, 89, 0.3)'
  };
  color: ${({ isError }) => 
    isError 
      ? '#ff3b30' 
      : '#34c759'
  };
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #ffffff;
  animation: spin 1s ease-in-out infinite;
  margin-right: 8px;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export default function AdminBookSession() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const axios = useAxios();
  
  const [formData, setFormData] = useState({
    mentorId: "",
    userId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);

  // Check if user is authorized (logged in and has the specific email)
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    // Allow access to both emails for testing
    const authorizedEmails = ["Vivek@stroda.club", "imu20122012@gmail.com"];
    if (!user?.email || !authorizedEmails.includes(user.email)) {
      router.push("/");
      return;
    }
  }, [isAuthenticated, user, router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.mentorId || !formData.userId) {
      setStatusMessage({
        message: "Please fill in all fields",
        isError: true
      });
      return;
    }

    setIsLoading(true);
    setStatusMessage(null);

    try {
      console.log('Submitting session booking with data:', formData);
      
      const response = await axios.post('https://backend.stroda.club/api/users/sessions/create', {
        userId: formData.userId,
        mentorId: formData.mentorId
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, // 10 second timeout
      });

      console.log('Session booking successful:', response.data);

      setStatusMessage({
        message: "Session booked successfully!",
        isError: false
      });

      // Clear form on success
      setFormData({
        mentorId: "",
        userId: "",
      });
    } catch (error: unknown) {
      console.error('Error booking session:', error);
      
      let errorMessage = "Failed to book session. Please try again.";
      
      if (error && typeof error === 'object') {
                 if ('response' in error) {
           const axiosError = error as { response?: { status?: number; data?: { message?: string } } };
           console.log('Response status:', axiosError.response?.status);
           console.log('Response data:', axiosError.response?.data);
          
                     const status = axiosError.response?.status;
           if (status === 401) {
             errorMessage = "Authentication failed. Please check your credentials.";
           } else if (status === 403) {
             errorMessage = "Access denied. You don't have permission to perform this action.";
           } else if (status === 404) {
             errorMessage = "API endpoint not found. Please check the URL.";
           } else if (status && status >= 500) {
             errorMessage = "Server error. Please try again later.";
           } else if (axiosError.response?.data?.message) {
             errorMessage = axiosError.response.data.message;
           }
        } else if ('request' in error) {
          errorMessage = "Network error. Please check your internet connection.";
        } else if ('message' in error) {
          errorMessage = (error as Error).message;
        }
      }
      
      setStatusMessage({
        message: errorMessage,
        isError: true
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToHome = () => {
    router.push("/");
  };

  // Show loading while checking authentication
  const authorizedEmails = ["Vivek@stroda.club", "imu20122012@gmail.com"];
  if (!isAuthenticated || !user?.email || !authorizedEmails.includes(user.email)) {
    return (
      <AdminContainer>
        <BackButton onClick={handleBackToHome}>
          ← Back to Home
        </BackButton>
        <AdminCard>
          <AdminHeader>
            <AdminTitle>Access Denied</AdminTitle>
            <AdminSubtitle>You don&apos;t have permission to access this page.</AdminSubtitle>
          </AdminHeader>
        </AdminCard>
      </AdminContainer>
    );
  }

  return (
    <AdminContainer>
      <BackButton onClick={handleBackToHome}>
        ← Back to Home
      </BackButton>
      <AdminCard>
        <AdminHeader>
          <AdminTitle>Admin Session Booking</AdminTitle>
          <AdminSubtitle>Book sessions for users with admin privileges</AdminSubtitle>
        </AdminHeader>

        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="mentorId">Mentor ID</Label>
            <Input
              type="text"
              id="mentorId"
              name="mentorId"
              value={formData.mentorId}
              onChange={handleInputChange}
              placeholder="Enter mentor ID"
              required
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="userId">User ID</Label>
            <Input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleInputChange}
              placeholder="Enter user ID"
              required
            />
          </FormGroup>

          <SubmitButton type="submit" disabled={isLoading}>
            {isLoading && <LoadingSpinner />}
            {isLoading ? "Booking Session..." : "Book Session"}
          </SubmitButton>
        </Form>

        {statusMessage && (
          <StatusMessage isError={statusMessage.isError}>
            {statusMessage.message}
          </StatusMessage>
        )}
      </AdminCard>
    </AdminContainer>
  );
} 