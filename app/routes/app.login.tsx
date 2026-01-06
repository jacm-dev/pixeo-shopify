import { AppProvider } from "@shopify/shopify-app-react-router/react";
import { useState, useEffect } from "react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { useActionData, useLoaderData, useNavigate } from "react-router";
import {
  Page,
  Card,
  FormLayout,
  TextField,
  Button,
  Text,
  BlockStack,
  Divider,
} from "@shopify/polaris";

import { login } from "../shopify.server";
import { loginErrorMessage } from "./auth.login/error.server";
import { supabase } from "../supabase.client";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const errors = loginErrorMessage(await login(request));
  return { 
    errors,
    shopifyAppUrl: process.env.SHOPIFY_APP_URL,
    googleClientId: process.env.GOOGLE_CLIENT_ID
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const errors = loginErrorMessage(await login(request));
  return {
    errors,
  };
};

export default function Auth() {
  const loaderData = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);
  const [supabaseSuccess, setSupabaseSuccess] = useState(false);
  
  const { errors } = actionData || loaderData || { errors: {} };
  console.log(errors);

  // Helper for generating nonce
  const generateNonce = async (): Promise<[string, string]> => {
    const nonce = btoa(String.fromCharCode(...crypto.getRandomValues(new Uint8Array(32))));
    const encoder = new TextEncoder();
    const encodedNonce = encoder.encode(nonce);
    const hash = await crypto.subtle.digest("SHA-256", encodedNonce);
    const hashedNonce = Array.from(new Uint8Array(hash))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return [nonce, hashedNonce];
  };

  useEffect(() => {
    if (!supabase) return;

    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/app");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        navigate("/app");
      }
    });

    // Load Google Script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.onload = async () => {
      if (!loaderData?.googleClientId) return;
      
      const [nonce, hashedNonce] = await generateNonce();
      
      // @ts-expect-error - google is global
      google.accounts.id.initialize({
        client_id: loaderData.googleClientId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        callback: async (response: any) => {
          setLoading(true);
          const { error } = await supabase!.auth.signInWithIdToken({
            provider: 'google',
            token: response.credential,
            nonce: nonce,
          });

          if (error) {
            setSupabaseError(error.message);
            setLoading(false);
          } else {
            setSupabaseSuccess(true);
            // Auth state change listener will handle redirect
          }
        },
        nonce: hashedNonce,
        use_fedcm_for_prompt: true,
      });

      // Render the Google button
      // @ts-expect-error - google is global
      google.accounts.id.renderButton(
        document.getElementById("google-button-container"),
        { theme: "outline", size: "large", width: "100%" } 
      );

      // Optional: Display One Tap
      // @ts-expect-error - google is global
      google.accounts.id.prompt();
    };
    document.body.appendChild(script);

    return () => {
      subscription.unsubscribe();
      if(document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [navigate, loaderData?.googleClientId]);

  const handleEmailLogin = async () => {
    if (!supabase) return;
    setLoading(true);
    setSupabaseError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setSupabaseError(error.message);
      setLoading(false);
    } else {
      setSupabaseSuccess(true);
      // Auth state change listener will handle redirect
    }
  };

  return (
    <AppProvider embedded={false}>
      <Page>
        <BlockStack gap="500">
          <Card>
             <BlockStack gap="400">
                <Text as="h2" variant="headingMd">
                  Pixeo Log in
                </Text>
                
                {supabaseSuccess && (
                  <div style={{background: '#e3f1df', padding: '1rem', borderRadius: '4px'}}>
                     <Text as="p" tone="success">Logged in to Pixeo successfully!</Text>
                  </div>
                )}
                
                {supabaseError && (
                  <div style={{background: '#fbeae5', padding: '1rem', borderRadius: '4px'}}>
                     <Text as="p" tone="critical">{supabaseError}</Text>
                  </div>
                )}

                {/* Client-side form - preventing default submission */}
                <FormLayout>
                  <TextField
                    label="Email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={setEmail}
                  />
                  <TextField
                    label="Password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={setPassword}
                  />
                  <Button onClick={handleEmailLogin} loading={loading}>Log in with Email</Button>
                </FormLayout>

                <Divider />
                
                <div id="google-button-container" style={{ width: '100%' }}></div>
             </BlockStack>
          </Card>
        </BlockStack>
      </Page>
    </AppProvider>
  );
}
