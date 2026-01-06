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
  return { errors };
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
  // const [shop, setShop] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [supabaseError, setSupabaseError] = useState<string | null>(null);
  const [supabaseSuccess, setSupabaseSuccess] = useState(false);
  
  const { errors } = actionData || loaderData || { errors: {} };
  console.log(errors);

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

    return () => subscription.unsubscribe();
  }, [navigate]);

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

  const handleGoogleLogin = async () => {
    if (!supabase) return;
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/app`,
      },
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
          {/* <Card>
            <BlockStack gap="400">
               <Text as="h2" variant="headingMd">
                  Shopify Log in
               </Text>
               <Form method="post">
                <FormLayout>
                  <TextField
                    label="Shop domain"
                    name="shop"
                    placeholder="example.myshopify.com"
                    value={shop}
                    onChange={setShop}
                    autoComplete="on"
                    error={errors.shop}
                  />
                  <Button submit variant="primary">Log in with Shop</Button>
                </FormLayout>
               </Form>
            </BlockStack>
          </Card> */}

          <div style={{ textAlign: "center" }}>
            <Text as="p" variant="bodyMd" tone="subdued">OR</Text>
          </div>

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
                
                <Button fullWidth onClick={handleGoogleLogin} loading={loading}>Log in with Google</Button>
             </BlockStack>
          </Card>
        </BlockStack>
      </Page>
    </AppProvider>
  );
}
